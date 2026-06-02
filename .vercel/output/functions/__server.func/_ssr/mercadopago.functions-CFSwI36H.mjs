import { c as createServerRpc } from "./createServerRpc-wV0Vk4NU.mjs";
import { l as createServerFn } from "./index.mjs";
import { c as createClient } from "./index-0g9BxVXQ.mjs";
import { o as objectType, s as stringType, n as numberType, a as arrayType } from "./types-D0vF8QzC.mjs";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
const CartItemSchema = objectType({
  slug: stringType(),
  name: stringType(),
  price: numberType(),
  qty: numberType(),
  image: stringType().optional(),
  size: stringType().optional(),
  color: stringType().optional()
});
const AddressSchema = objectType({
  full_name: stringType(),
  phone: stringType(),
  address: stringType(),
  city: stringType(),
  department: stringType(),
  postal_code: stringType().optional()
});
const CreatePreferenceInput = objectType({
  items: arrayType(CartItemSchema),
  address: AddressSchema,
  email: stringType().email(),
  accessToken: stringType().optional()
  // JWT del usuario autenticado (opcional)
});
async function createMPPreferenceAPI(accessToken, body) {
  const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify(body)
  });
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`MercadoPago API error: ${response.status} - ${error}`);
  }
  return response.json();
}
const createMPPreference_createServerFn_handler = createServerRpc({
  id: "48abe60d10af1c4b63432e6b3c1444fc22bb23a2122340216f236e7cb93baf74",
  name: "createMPPreference",
  filename: "src/lib/api/mercadopago.functions.ts"
}, (opts) => createMPPreference.__executeServer(opts));
const createMPPreference = createServerFn({
  method: "POST"
}).inputValidator(CreatePreferenceInput).handler(createMPPreference_createServerFn_handler, async ({
  data
}) => {
  const mpAccessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
  if (!mpAccessToken) {
    throw new Error("MERCADOPAGO_ACCESS_TOKEN no configurado");
  }
  const supabaseUrl = "https://fqsprmctzfukebplodlb.supabase.co";
  const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxc3BybWN0emZ1a2VicGxvZGxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwODQwNjcsImV4cCI6MjA5NTY2MDA2N30.PS9ny7ihTX0PqXM4p7H92vFeUU_TBEsmalHGMcKrOuw";
  const supabase = data.accessToken ? createClient(supabaseUrl, supabaseKey, {
    global: {
      headers: {
        Authorization: `Bearer ${data.accessToken}`
      }
    }
  }) : createClient(supabaseUrl, supabaseKey);
  let userId = null;
  if (data.accessToken) {
    const {
      data: userData
    } = await supabase.auth.getUser(data.accessToken);
    userId = userData.user?.id ?? null;
  }
  const subtotal = data.items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shippingCost = 0;
  const total = subtotal + shippingCost;
  const {
    data: order,
    error: orderError
  } = await supabase.from("orders").insert({
    user_id: userId,
    email: data.email,
    status: "pending",
    subtotal,
    shipping_cost: shippingCost,
    total,
    address_snap: data.address,
    payment_method: "mercadopago",
    items: data.items
  }).select().single();
  if (orderError || !order) {
    console.error("Error creando orden:", orderError);
    throw new Error("No se pudo crear la orden");
  }
  const siteUrl = process.env.SITE_URL || "https://aiahn.store";
  const mpItems = data.items.map((item) => ({
    id: item.slug,
    title: `${item.name}${item.size ? ` - Talla ${item.size}` : ""}${item.color ? ` - ${item.color}` : ""}`,
    quantity: item.qty,
    unit_price: item.price,
    currency_id: "COP",
    picture_url: item.image
  }));
  const preferenceBody = {
    items: mpItems,
    payer: {
      email: data.email,
      name: data.address.full_name,
      phone: {
        number: data.address.phone
      },
      address: {
        street_name: data.address.address,
        zip_code: data.address.postal_code || ""
      }
    },
    back_urls: {
      success: `${siteUrl}/checkout/resultado?status=success&order=${order.id}`,
      failure: `${siteUrl}/checkout/resultado?status=failure&order=${order.id}`,
      pending: `${siteUrl}/checkout/resultado?status=pending&order=${order.id}`
    },
    auto_return: "approved",
    external_reference: order.id,
    notification_url: `${siteUrl}/api/mp/webhook`,
    statement_descriptor: "AIAHN STORE"
  };
  const preferenceData = await createMPPreferenceAPI(mpAccessToken, preferenceBody);
  await supabase.from("orders").update({
    mp_preference_id: preferenceData.id
  }).eq("id", order.id);
  return {
    preferenceId: preferenceData.id,
    initPoint: preferenceData.init_point,
    sandboxInitPoint: preferenceData.sandbox_init_point,
    orderId: order.id
  };
});
const getOrderStatus_createServerFn_handler = createServerRpc({
  id: "9a2b3fe0ff87ae35bef9460fb93350905804f8167a152d318d7a59e276f7fbcf",
  name: "getOrderStatus",
  filename: "src/lib/api/mercadopago.functions.ts"
}, (opts) => getOrderStatus.__executeServer(opts));
const getOrderStatus = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  orderId: stringType()
})).handler(getOrderStatus_createServerFn_handler, async ({
  data
}) => {
  const supabaseUrl = "https://fqsprmctzfukebplodlb.supabase.co";
  const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxc3BybWN0emZ1a2VicGxvZGxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwODQwNjcsImV4cCI6MjA5NTY2MDA2N30.PS9ny7ihTX0PqXM4p7H92vFeUU_TBEsmalHGMcKrOuw";
  const supabase = createClient(supabaseUrl, supabaseKey);
  const {
    data: order,
    error
  } = await supabase.from("orders").select("id, status, payment_ref, total, email").eq("id", data.orderId).single();
  if (error || !order) {
    throw new Error("Orden no encontrada");
  }
  return order;
});
export {
  createMPPreference_createServerFn_handler,
  getOrderStatus_createServerFn_handler
};
