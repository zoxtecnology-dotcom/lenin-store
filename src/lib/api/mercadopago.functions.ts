import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";

// ═══════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════

const CartItemSchema = z.object({
  slug: z.string(),
  name: z.string(),
  price: z.number(),
  qty: z.number(),
  image: z.string().optional(),
  size: z.string().optional(),
  color: z.string().optional(),
});

const AddressSchema = z.object({
  full_name: z.string(),
  phone: z.string(),
  address: z.string(),
  city: z.string(),
  department: z.string(),
  postal_code: z.string().optional(),
});

const CreatePreferenceInput = z.object({
  items: z.array(CartItemSchema),
  address: AddressSchema,
  email: z.string().email(),
  accessToken: z.string().optional(), // JWT del usuario autenticado (opcional)
});

// ═══════════════════════════════════════════════════════════════
// MERCADOPAGO API HELPERS (usando fetch directo)
// ═══════════════════════════════════════════════════════════════

async function createMPPreferenceAPI(accessToken: string, body: object) {
  const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`MercadoPago API error: ${response.status} - ${error}`);
  }

  return response.json();
}

async function getMPPaymentAPI(accessToken: string, paymentId: string) {
  const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`MercadoPago API error: ${response.status} - ${error}`);
  }

  return response.json();
}

// ═══════════════════════════════════════════════════════════════
// CREATE PREFERENCE (Checkout Pro)
// ═══════════════════════════════════════════════════════════════

export const createMPPreference = createServerFn({ method: "POST" })
  .inputValidator(CreatePreferenceInput)
  .handler(async ({ data }) => {
    const mpAccessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
    if (!mpAccessToken) {
      throw new Error("MERCADOPAGO_ACCESS_TOKEN no configurado");
    }

    // Supabase admin client para crear la orden
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
    
    const supabase = data.accessToken
      ? createClient(supabaseUrl, supabaseKey, {
          global: { headers: { Authorization: `Bearer ${data.accessToken}` } },
        })
      : createClient(supabaseUrl, supabaseKey);

    // Obtener user_id si hay sesión
    let userId: string | null = null;
    if (data.accessToken) {
      const { data: userData } = await supabase.auth.getUser(data.accessToken);
      userId = userData.user?.id ?? null;
    }

    // Calcular totales
    const subtotal = data.items.reduce((sum, item) => sum + item.price * item.qty, 0);
    const shippingCost = 0; // TODO: calcular según dirección
    const total = subtotal + shippingCost;

    // 1. Crear la orden en Supabase (status: pending)
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: userId,
        email: data.email,
        status: "pending",
        subtotal,
        shipping_cost: shippingCost,
        total,
        address_snap: data.address,
        payment_method: "mercadopago",
        items: data.items,
      })
      .select()
      .single();

    if (orderError || !order) {
      console.error("Error creando orden:", orderError);
      throw new Error("No se pudo crear la orden");
    }

    // Obtener la URL base del sitio
    const siteUrl = process.env.SITE_URL || "https://aiahn.store";

    // 2. Crear preferencia de pago en MercadoPago
    const mpItems = data.items.map((item) => ({
      id: item.slug,
      title: `${item.name}${item.size ? ` - Talla ${item.size}` : ""}${item.color ? ` - ${item.color}` : ""}`,
      quantity: item.qty,
      unit_price: item.price,
      currency_id: "COP",
      picture_url: item.image,
    }));

    const preferenceBody = {
      items: mpItems,
      payer: {
        email: data.email,
        name: data.address.full_name,
        phone: { number: data.address.phone },
        address: {
          street_name: data.address.address,
          zip_code: data.address.postal_code || "",
        },
      },
      back_urls: {
        success: `${siteUrl}/checkout/resultado?status=success&order=${order.id}`,
        failure: `${siteUrl}/checkout/resultado?status=failure&order=${order.id}`,
        pending: `${siteUrl}/checkout/resultado?status=pending&order=${order.id}`,
      },
      auto_return: "approved",
      external_reference: order.id,
      notification_url: `${siteUrl}/api/mp/webhook`,
      statement_descriptor: "AIAHN STORE",
    };

    const preferenceData = await createMPPreferenceAPI(mpAccessToken, preferenceBody);

    // 3. Guardar preference_id en la orden
    await supabase
      .from("orders")
      .update({ mp_preference_id: preferenceData.id })
      .eq("id", order.id);

    return {
      preferenceId: preferenceData.id,
      initPoint: preferenceData.init_point,
      sandboxInitPoint: preferenceData.sandbox_init_point,
      orderId: order.id,
    };
  });

// ═══════════════════════════════════════════════════════════════
// GET ORDER STATUS (para polling desde el frontend)
// ═══════════════════════════════════════════════════════════════

export const getOrderStatus = createServerFn({ method: "POST" })
  .inputValidator(z.object({ orderId: z.string() }))
  .handler(async ({ data }) => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: order, error } = await supabase
      .from("orders")
      .select("id, status, payment_ref, total, email, items")
      .eq("id", data.orderId)
      .single();

    if (error || !order) {
      throw new Error("Orden no encontrada");
    }

    return order;
  });

