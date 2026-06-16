import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Save, Loader, Printer } from "lucide-react";

export const Route = createFileRoute("/admin/pedidos/$id")({
  component: DetallePedido,
});

const STATUS_OPTIONS = ["pending", "paid", "preparing", "shipped", "delivered", "cancelled", "refunded"];
const STATUS_LABELS: Record<string, string> = {
  pending: "Pendiente", paid: "Pagado", preparing: "Preparando",
  shipped: "Enviado", delivered: "Entregado", cancelled: "Cancelado", refunded: "Reembolsado",
};

const fmt = (n: number) => new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 }).format(n);

interface OrderItem {
  product_name: string;
  color_name: string | null;
  size: string | null;
  piece: string | null;
  qty: number;
  unit_price: number;
}

// Unifica items que vienen de la tabla order_items o del JSONB `items` del carrito (MercadoPago)
function normalizeItem(it: Record<string, unknown>): OrderItem {
  return {
    product_name: String(it.product_name ?? it.name ?? "Producto"),
    color_name: (it.color_name ?? it.color ?? null) as string | null,
    size: (it.size ?? null) as string | null,
    piece: (it.piece ?? null) as string | null,
    qty: Number(it.qty ?? 1),
    unit_price: Number(it.unit_price ?? it.price ?? 0),
  };
}

function DetallePedido() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Record<string, unknown> | null>(null);
  const [items, setItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");
  const [trackingCode, setTrackingCode] = useState("");

  useEffect(() => {
    Promise.all([
      supabase.from("orders").select("*").eq("id", id).single(),
      supabase.from("order_items").select("*").eq("order_id", id),
    ]).then(([{ data: ord, error: ordErr }, { data: its }]) => {
      if (ordErr || !ord) {
        console.error("Error cargando pedido:", ordErr);
        setLoadError(ordErr?.message ?? "No se encontró el pedido");
        setLoading(false);
        return;
      }
      setOrder(ord);
      setStatus(ord.status as string);
      setTrackingCode((ord.tracking_code as string) ?? "");
      // Items: usar la tabla order_items si existe; si no, el JSONB `items` del pedido (caso MercadoPago)
      const fromTable = (its ?? []) as Record<string, unknown>[];
      const fromJsonb = Array.isArray(ord.items) ? (ord.items as Record<string, unknown>[]) : [];
      setItems((fromTable.length ? fromTable : fromJsonb).map(normalizeItem));
      setLoading(false);
    });
  }, [id]);

  async function handleSave() {
    setSaving(true);
    await supabase.from("orders").update({ status, tracking_code: trackingCode || null }).eq("id", id);
    setSaving(false);
    navigate({ to: "/admin/pedidos" });
  }

  function handlePrint() {
    if (!order) return;
    const address = order.address_snap as Record<string, string> | null;
    const profile = order.profiles as Record<string, string> | null;
    const orderNo = (order.id as string).slice(0, 8).toUpperCase();
    const date = order.created_at
      ? new Date(order.created_at as string).toLocaleString("es-CO", { dateStyle: "medium", timeStyle: "short" })
      : "";

    const itemsRows = items.map((it) => {
      const meta = [
        it.size ? `Talla ${it.size}` : "",
        it.color_name ?? "",
        it.piece ?? "",
      ].filter(Boolean).join(" · ");
      const lineTotal = (it.unit_price as number) * (it.qty as number);
      return `<tr>
        <td>${it.product_name as string}${meta ? `<br><span class="meta">${meta}</span>` : ""}</td>
        <td class="c">${it.qty as number}</td>
        <td class="r">${fmt(lineTotal)}</td>
      </tr>`;
    }).join("");

    const win = window.open("", "_blank", "width=820,height=920");
    if (!win) return;
    win.document.write(`<!doctype html><html lang="es"><head><meta charset="utf-8">
      <title>Pedido #${orderNo}</title>
      <style>
        * { box-sizing: border-box; }
        body { font-family: Arial, Helvetica, sans-serif; color: #111; margin: 32px; font-size: 13px; }
        h1 { font-size: 20px; margin: 0; letter-spacing: 1px; }
        h2 { font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #888; margin: 0 0 6px; }
        .head { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #111; padding-bottom: 12px; margin-bottom: 20px; }
        .muted { color: #555; font-size: 12px; }
        .box { border: 1px solid #ddd; padding: 14px; margin-bottom: 16px; }
        .grid { display: flex; gap: 16px; }
        .grid > div { flex: 1; }
        table { width: 100%; border-collapse: collapse; margin-top: 4px; }
        th, td { text-align: left; padding: 8px 6px; border-bottom: 1px solid #eee; vertical-align: top; }
        th { font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: #888; }
        td.c, th.c { text-align: center; width: 50px; }
        td.r, th.r { text-align: right; width: 110px; }
        .meta { color: #888; font-size: 11px; }
        .totals { margin-top: 10px; margin-left: auto; width: 260px; }
        .totals .row { display: flex; justify-content: space-between; padding: 4px 0; }
        .totals .total { border-top: 2px solid #111; font-weight: bold; font-size: 15px; padding-top: 8px; }
        @media print { body { margin: 12mm; } }
      </style></head><body>
      <div class="head">
        <div>
          <h1>PEDIDO #${orderNo}</h1>
          <div class="muted">${date}</div>
          <div class="muted">Estado: ${STATUS_LABELS[status] ?? status}</div>
          ${trackingCode ? `<div class="muted">Guía: ${trackingCode}</div>` : ""}
        </div>
        <div style="text-align:right">
          <strong>AIAHN STORE</strong>
        </div>
      </div>
      <div class="grid">
        <div class="box">
          <h2>Cliente</h2>
          <div>${profile?.full_name ?? address?.full_name ?? (order.email as string)}</div>
          <div class="muted">${order.email as string}</div>
          ${address?.phone || profile?.phone ? `<div class="muted">Tel: ${address?.phone ?? profile?.phone}</div>` : ""}
        </div>
        <div class="box">
          <h2>Dirección de envío</h2>
          ${address?.full_name ? `<div>${address.full_name}</div>` : ""}
          <div>${address?.address ?? ""}</div>
          <div class="muted">${[address?.city, address?.department].filter(Boolean).join(", ")}${address?.postal_code ? ` — CP ${address.postal_code}` : ""}</div>
        </div>
      </div>
      <div class="box">
        <h2>Productos</h2>
        <table>
          <thead><tr><th>Producto</th><th class="c">Cant</th><th class="r">Total</th></tr></thead>
          <tbody>${itemsRows}</tbody>
        </table>
        <div class="totals">
          <div class="row"><span>Subtotal</span><span>${fmt(order.subtotal as number)}</span></div>
          ${(order.discount as number) > 0 ? `<div class="row"><span>Descuento</span><span>-${fmt(order.discount as number)}</span></div>` : ""}
          <div class="row"><span>Envío</span><span>${(order.shipping_cost as number) > 0 ? fmt(order.shipping_cost as number) : "Gratis"}</span></div>
          <div class="row total"><span>Total</span><span>${fmt(order.total as number)}</span></div>
        </div>
      </div>
      </body></html>`);
    win.document.close();
    win.focus();
    win.print();
  }

  if (loading) return <div className="flex justify-center py-24"><div className="w-5 h-5 border border-cream/20 border-t-cream rounded-full animate-spin" /></div>;

  if (loadError || !order) return (
    <div className="max-w-2xl space-y-4">
      <button onClick={() => navigate({ to: "/admin/pedidos" })} className="flex items-center gap-2 text-cream/40 hover:text-cream transition-colors text-[11px] uppercase tracking-[0.25em]">
        <ArrowLeft size={16} strokeWidth={1.5} /> Volver a pedidos
      </button>
      <div className="border border-red-500/30 bg-red-500/10 p-5">
        <p className="text-sm text-red-400 mb-1">No se pudo cargar el pedido</p>
        <p className="text-[11px] text-cream/50">{loadError ?? "Pedido no encontrado"}</p>
        <p className="text-[10px] text-cream/30 mt-2 font-mono">ID: {id}</p>
      </div>
    </div>
  );

  const address = order.address_snap as Record<string, string> | null;
  const profile = order.profiles as Record<string, string> | null;

  return (
    <div className="space-y-8 max-w-2xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate({ to: "/admin/pedidos" })} className="text-cream/40 hover:text-cream transition-colors">
            <ArrowLeft size={18} strokeWidth={1.5} />
          </button>
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-acid mb-1">Pedidos</p>
            <h1 className="font-display text-[clamp(1.5rem,3vw,2.5rem)] uppercase leading-[0.88] text-cream">
              #{(order.id as string).slice(0, 8).toUpperCase()}
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handlePrint}
            className="flex items-center gap-2 border border-border text-cream px-4 py-3 text-[11px] uppercase tracking-[0.25em] font-medium hover:border-cream/40 transition-colors">
            <Printer size={14} strokeWidth={2} />
            Imprimir
          </button>
          <button onClick={handleSave} disabled={saving}
            className="flex items-center gap-2 bg-acid text-ink px-4 py-3 text-[11px] uppercase tracking-[0.25em] font-medium hover:opacity-90 disabled:opacity-50">
            {saving ? <Loader size={14} className="animate-spin" /> : <Save size={14} strokeWidth={2} />}
            {saving ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </div>

      {/* Estado y tracking */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={lbl}>Estado del pedido</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}
            className="w-full bg-background border border-border text-cream text-sm px-3 py-2 focus:outline-none focus:border-cream/40">
            {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
          </select>
        </div>
        <div>
          <label className={lbl}>Código de rastreo</label>
          <input value={trackingCode} onChange={(e) => setTrackingCode(e.target.value)}
            placeholder="Ej: 123456789CO"
            className="w-full bg-background border border-border text-cream text-sm px-3 py-2 placeholder:text-cream/20 focus:outline-none focus:border-cream/40" />
        </div>
      </div>

      {/* Info del cliente */}
      <div className="border border-border p-5 space-y-2">
        <p className="text-[10px] uppercase tracking-[0.3em] text-acid mb-3">Cliente</p>
        <p className="text-sm text-cream">{profile?.full_name ?? address?.full_name ?? order.email as string}</p>
        <p className="text-[11px] text-cream/50">{order.email as string}</p>
        {(address?.phone || profile?.phone) && (
          <p className="text-[11px] text-cream/50">Tel: {address?.phone ?? profile?.phone}</p>
        )}
        {address && (
          <div className="mt-3 pt-3 border-t border-border">
            <p className="text-[10px] uppercase tracking-[0.25em] text-cream/30 mb-1">Dirección de envío</p>
            {address.full_name && <p className="text-[11px] text-cream/70">{address.full_name}</p>}
            <p className="text-[11px] text-cream/70">{address.address}</p>
            <p className="text-[11px] text-cream/50">
              {[address.city, address.department].filter(Boolean).join(", ")}
              {address.postal_code ? ` — CP ${address.postal_code}` : ""}
            </p>
            {address.phone && <p className="text-[11px] text-cream/50">Tel: {address.phone}</p>}
          </div>
        )}
      </div>

      {/* Items */}
      <div className="space-y-2">
        <p className="text-[10px] uppercase tracking-[0.3em] text-acid">Productos</p>
        <div className="border border-border divide-y divide-border">
          {items.map((item, i) => (
            <div key={i} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm text-cream">{item.product_name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  {item.color_name && <span className="text-[10px] text-cream/40">{item.color_name}</span>}
                  {item.size && <span className="text-[10px] text-cream/40">Talla {item.size}</span>}
                  {item.piece && <span className="text-[10px] text-cream/30">{item.piece}</span>}
                  <span className="text-[10px] text-cream/30">×{item.qty}</span>
                </div>
              </div>
              <span className="text-sm text-cream">{fmt(item.unit_price * item.qty)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Totales */}
      <div className="border border-border p-4 space-y-2">
        <div className="flex justify-between text-[11px] text-cream/50">
          <span className="uppercase tracking-[0.2em]">Subtotal</span>
          <span>{fmt(order.subtotal as number)}</span>
        </div>
        {(order.discount as number) > 0 && (
          <div className="flex justify-between text-[11px] text-acid">
            <span className="uppercase tracking-[0.2em]">Descuento</span>
            <span>-{fmt(order.discount as number)}</span>
          </div>
        )}
        <div className="flex justify-between text-[11px] text-cream/50">
          <span className="uppercase tracking-[0.2em]">Envío</span>
          <span>{(order.shipping_cost as number) > 0 ? fmt(order.shipping_cost as number) : "Gratis"}</span>
        </div>
        <div className="flex justify-between text-sm text-cream font-medium pt-2 border-t border-border">
          <span className="uppercase tracking-[0.2em]">Total</span>
          <span>{fmt(order.total as number)}</span>
        </div>
      </div>
    </div>
  );
}

const lbl = "block text-[10px] uppercase tracking-[0.25em] text-cream/40 mb-1.5";
