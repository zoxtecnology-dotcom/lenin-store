import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";

// Estados en los que el cliente AÚN puede cambiar la dirección (antes del envío)
export const EDITABLE_ADDRESS_STATUSES = ["pending", "paid", "confirmed", "preparing"];

const AddressSchema = z.object({
  full_name: z.string().min(1),
  phone: z.string().min(1),
  address: z.string().min(1),
  city: z.string().min(1),
  department: z.string().min(1),
  postal_code: z.string().optional(),
});

// ═══════════════════════════════════════════════════════════════
// ACTUALIZAR DIRECCIÓN DE ENVÍO (solo el dueño, solo si no se ha enviado)
// ═══════════════════════════════════════════════════════════════

export const updateOrderAddress = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      orderId: z.string(),
      address: AddressSchema,
      accessToken: z.string(),
    })
  )
  .handler(async ({ data }) => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;
    const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
    if (!serviceRoleKey) throw new Error("SUPABASE_SERVICE_ROLE_KEY no configurado");

    // 1. Identificar al usuario a partir de su JWT
    const supabaseAuth = createClient(supabaseUrl, anonKey);
    const { data: userData } = await supabaseAuth.auth.getUser(data.accessToken);
    const userId = userData.user?.id;
    if (!userId) throw new Error("Sesión no válida. Inicia sesión de nuevo.");

    // 2. Verificar que el pedido sea suyo y que aún se pueda editar
    const supabase = createClient(supabaseUrl, serviceRoleKey);
    const { data: order, error } = await supabase
      .from("orders")
      .select("id, user_id, status")
      .eq("id", data.orderId)
      .single();

    if (error || !order) throw new Error("Pedido no encontrado");
    if (order.user_id !== userId) throw new Error("No autorizado");
    if (!EDITABLE_ADDRESS_STATUSES.includes(order.status as string)) {
      throw new Error("El pedido ya está en camino; no se puede cambiar la dirección.");
    }

    // 3. Actualizar solo la dirección
    const { error: updErr } = await supabase
      .from("orders")
      .update({ address_snap: data.address })
      .eq("id", data.orderId);

    if (updErr) throw new Error("No se pudo actualizar la dirección");

    return { ok: true };
  });
