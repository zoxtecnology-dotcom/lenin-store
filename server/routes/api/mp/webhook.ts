import { createClient } from "@supabase/supabase-js";

export default defineEventHandler(async (event) => {
  // Solo POST
  if (event.method !== "POST") {
    return { error: "Method not allowed" };
  }

  const body = await readBody(event);
  console.log("Webhook recibido:", JSON.stringify(body));

  // Solo procesar notificaciones de pago
  if (body?.type !== "payment" || !body?.data?.id) {
    return { received: true, processed: false };
  }

  const mpAccessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
  if (!mpAccessToken) {
    console.error("MERCADOPAGO_ACCESS_TOKEN no configurado");
    return { received: true, error: "Config error" };
  }

  try {
    // Obtener detalles del pago desde MercadoPago
    const response = await fetch(
      `https://api.mercadopago.com/v1/payments/${body.data.id}`,
      {
        headers: { Authorization: `Bearer ${mpAccessToken}` },
      }
    );

    if (!response.ok) {
      console.error("Error fetching payment:", await response.text());
      return { received: true, error: "MP API error" };
    }

    const paymentInfo = await response.json();

    if (!paymentInfo.external_reference) {
      console.error("Pago sin external_reference:", paymentInfo.id);
      return { received: true, processed: false };
    }

    // Conectar a Supabase
    const supabaseUrl = process.env.VITE_SUPABASE_URL!;
    const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Mapear estado
    const statusMap: Record<string, string> = {
      approved: "paid",
      pending: "pending",
      in_process: "pending",
      rejected: "failed",
      cancelled: "cancelled",
      refunded: "refunded",
    };

    const orderStatus = statusMap[paymentInfo.status ?? ""] ?? "pending";

    // Actualizar orden
    const { error } = await supabase
      .from("orders")
      .update({
        status: orderStatus,
        payment_ref: paymentInfo.id?.toString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", paymentInfo.external_reference);

    if (error) {
      console.error("Error actualizando orden:", error);
      return { received: true, error: "DB error" };
    }

    console.log(`✅ Orden ${paymentInfo.external_reference} → ${orderStatus}`);
    return { received: true, processed: true, status: orderStatus };
  } catch (err) {
    console.error("Webhook error:", err);
    return { received: true, error: "Processing error" };
  }
});
