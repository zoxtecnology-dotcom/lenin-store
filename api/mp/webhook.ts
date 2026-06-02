// Tipos manuales para Vercel Functions (evitar importar @vercel/node que tiene problemas ESM)
interface VercelRequest {
  method?: string;
  body: {
    type?: string;
    data?: { id?: string };
    [key: string]: unknown;
  };
}

interface VercelResponse {
  status(code: number): VercelResponse;
  json(data: unknown): VercelResponse;
}

import { createClient } from "@supabase/supabase-js";

// Helper para obtener pago de MercadoPago via API REST
async function getMPPayment(accessToken: string, paymentId: string) {
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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Solo aceptar POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { type, data } = req.body;

    // MercadoPago envía varios tipos de notificaciones
    // Solo procesamos las de pago
    if (type !== "payment" || !data?.id) {
      return res.status(200).json({ received: true, processed: false });
    }

    const mpAccessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
    if (!mpAccessToken) {
      console.error("MERCADOPAGO_ACCESS_TOKEN no configurado");
      return res.status(500).json({ error: "Server configuration error" });
    }

    // Obtener detalles del pago desde MercadoPago
    const paymentInfo = await getMPPayment(mpAccessToken, data.id);

    if (!paymentInfo.external_reference) {
      console.error("Pago sin external_reference:", paymentInfo.id);
      return res.status(200).json({ received: true, processed: false });
    }

    // Conectar a Supabase
    const supabaseUrl = process.env.VITE_SUPABASE_URL;
    const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error("Variables de Supabase no configuradas");
      return res.status(500).json({ error: "Server configuration error" });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Mapear estado de MP a nuestro estado
    const statusMap: Record<string, string> = {
      approved: "paid",
      pending: "pending",
      in_process: "pending",
      rejected: "failed",
      cancelled: "cancelled",
      refunded: "refunded",
    };

    const orderStatus = statusMap[paymentInfo.status ?? ""] ?? "pending";

    // Actualizar orden en Supabase
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
      return res.status(500).json({ error: "Database error" });
    }

    console.log(`✅ Orden ${paymentInfo.external_reference} actualizada a: ${orderStatus}`);

    return res.status(200).json({
      received: true,
      processed: true,
      status: orderStatus,
    });
  } catch (error) {
    console.error("Webhook error:", error);
    // Devolver 200 para que MP no reintente indefinidamente
    return res.status(200).json({ received: true, error: "Processing error" });
  }
}
