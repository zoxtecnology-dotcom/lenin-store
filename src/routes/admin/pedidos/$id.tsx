import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Save, Loader } from "lucide-react";

export const Route = createFileRoute("/admin/pedidos/$id")({
  component: DetallePedido,
});

const STATUS_OPTIONS = ["pending", "paid", "preparing", "shipped", "delivered", "cancelled", "refunded"];
const STATUS_LABELS: Record<string, string> = {
  pending: "Pendiente", paid: "Pagado", preparing: "Preparando",
  shipped: "Enviado", delivered: "Entregado", cancelled: "Cancelado", refunded: "Reembolsado",
};

const fmt = (n: number) => new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 }).format(n);

function DetallePedido() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Record<string, unknown> | null>(null);
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");
  const [trackingCode, setTrackingCode] = useState("");

  useEffect(() => {
    Promise.all([
      supabase.from("orders").select("*, profiles(full_name, phone)").eq("id", id).single(),
      supabase.from("order_items").select("*").eq("order_id", id),
    ]).then(([{ data: ord }, { data: its }]) => {
      if (!ord) { navigate({ to: "/admin/pedidos" }); return; }
      setOrder(ord);
      setStatus(ord.status as string);
      setTrackingCode(ord.tracking_code as string ?? "");
      setItems(its ?? []);
      setLoading(false);
    });
  }, [id, navigate]);

  async function handleSave() {
    setSaving(true);
    await supabase.from("orders").update({ status, tracking_code: trackingCode || null }).eq("id", id);
    setSaving(false);
    navigate({ to: "/admin/pedidos" });
  }

  if (loading || !order) return <div className="flex justify-center py-24"><div className="w-5 h-5 border border-cream/20 border-t-cream rounded-full animate-spin" /></div>;

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
              #{(order.id as string).slice(0, 8)}
            </h1>
          </div>
        </div>
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 bg-acid text-ink px-4 py-3 text-[11px] uppercase tracking-[0.25em] font-medium hover:opacity-90 disabled:opacity-50">
          {saving ? <Loader size={14} className="animate-spin" /> : <Save size={14} strokeWidth={2} />}
          {saving ? "Guardando..." : "Guardar"}
        </button>
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
        <p className="text-sm text-cream">{profile?.full_name ?? order.email as string}</p>
        <p className="text-[11px] text-cream/50">{order.email as string}</p>
        {profile?.phone && <p className="text-[11px] text-cream/50">{profile.phone}</p>}
        {address && (
          <div className="mt-3 pt-3 border-t border-border">
            <p className="text-[10px] uppercase tracking-[0.25em] text-cream/30 mb-1">Dirección de envío</p>
            <p className="text-[11px] text-cream/70">{address.address}</p>
            <p className="text-[11px] text-cream/50">{address.city}, {address.department}</p>
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
                <p className="text-sm text-cream">{item.product_name as string}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  {item.color_name && <span className="text-[10px] text-cream/40">{item.color_name as string}</span>}
                  {item.size && <span className="text-[10px] text-cream/40">Talla {item.size as string}</span>}
                  {item.piece && <span className="text-[10px] text-cream/30">{item.piece as string}</span>}
                  <span className="text-[10px] text-cream/30">×{item.qty as number}</span>
                </div>
              </div>
              <span className="text-sm text-cream">{fmt((item.unit_price as number) * (item.qty as number))}</span>
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
