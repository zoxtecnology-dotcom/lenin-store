import { Y as reactExports, N as jsxRuntimeExports } from "./index.mjs";
import { Q as supabase, y as fmtCOP, x as createLucideIcon } from "./router-Cd0oBxWL.mjs";
import { S as Search, U as User } from "./user-vzxeEXK0.mjs";
import { M as Mail } from "./mail-B40JBfd3.mjs";
import { S as ShoppingBag } from "./shopping-bag-6dSKfxZg.mjs";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./index-0g9BxVXQ.mjs";
const __iconNode$1 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar = createLucideIcon("calendar", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
      key: "9njp5v"
    }
  ]
];
const Phone = createLucideIcon("phone", __iconNode);
function AdminClientes() {
  const [profiles, setProfiles] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [search, setSearch] = reactExports.useState("");
  const [filter, setFilter] = reactExports.useState("all");
  reactExports.useEffect(() => {
    load();
  }, []);
  async function load() {
    const {
      data: profilesData
    } = await supabase.from("profiles").select("id, email, full_name, phone, role, created_at").order("created_at", {
      ascending: false
    });
    const {
      data: ordersData
    } = await supabase.from("orders").select("user_id, total");
    const ordersByUser = (ordersData ?? []).reduce((acc, o) => {
      if (!acc[o.user_id]) acc[o.user_id] = {
        count: 0,
        total: 0
      };
      acc[o.user_id].count++;
      acc[o.user_id].total += o.total || 0;
      return acc;
    }, {});
    const enriched = (profilesData ?? []).map((p) => ({
      ...p,
      orders_count: ordersByUser[p.id]?.count ?? 0,
      orders_total: ordersByUser[p.id]?.total ?? 0
    }));
    setProfiles(enriched);
    setLoading(false);
  }
  const filtered = profiles.filter((p) => {
    if (filter === "customers" && p.role !== "customer") return false;
    if (filter === "admins" && p.role !== "admin") return false;
    if (filter === "buyers" && (p.orders_count ?? 0) === 0) return false;
    if (search) {
      const q = search.toLowerCase();
      return p.email.toLowerCase().includes(q) || (p.full_name?.toLowerCase().includes(q) ?? false) || (p.phone?.includes(q) ?? false);
    }
    return true;
  });
  const counts = {
    all: profiles.length,
    customers: profiles.filter((p) => p.role === "customer").length,
    admins: profiles.filter((p) => p.role === "admin").length,
    buyers: profiles.filter((p) => (p.orders_count ?? 0) > 0).length
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-[0.4em] text-acid mb-1", children: "Usuarios" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-[clamp(1.8rem,4vw,3rem)] uppercase leading-[0.88] text-cream", children: "Clientes" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-cream/40 mt-2", children: "Lista de usuarios registrados (solo lectura)." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { size: 14, className: "absolute left-3 top-1/2 -translate-y-1/2 text-cream/30" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: search, onChange: (e) => setSearch(e.target.value), placeholder: "Buscar por email, nombre o teléfono...", className: "w-full bg-transparent border border-border pl-9 pr-3 py-2.5 text-sm text-cream placeholder:text-cream/30 focus:border-acid focus:outline-none" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: ["all", "customers", "admins", "buyers"].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setFilter(f), className: `px-3 py-2 text-[10px] uppercase tracking-[0.15em] border transition-colors ${filter === f ? "border-acid text-acid" : "border-border text-cream/50 hover:border-cream/30"}`, children: [
        f === "all" && `Todos (${counts.all})`,
        f === "customers" && `Clientes (${counts.customers})`,
        f === "admins" && `Admins (${counts.admins})`,
        f === "buyers" && `Con compras (${counts.buyers})`
      ] }, f)) })
    ] }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [...Array(8)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 bg-cream/5 animate-pulse" }, i)) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border border-border p-8 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-cream/40 text-sm", children: "No hay usuarios que coincidan." }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: filtered.map((profile) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border p-4 flex flex-col sm:flex-row sm:items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 bg-cream/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 16, className: "text-cream/40" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-cream font-medium truncate", children: [
            profile.full_name || "Sin nombre",
            profile.role === "admin" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 text-[9px] bg-acid text-ink px-1.5 py-0.5 uppercase", children: "Admin" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-[11px] text-cream/40 mt-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 truncate", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 10 }),
              " ",
              profile.email
            ] }),
            profile.phone && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 10 }),
              " ",
              profile.phone
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6 text-[11px] text-cream/50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 12 }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            profile.orders_count ?? 0,
            " pedidos"
          ] })
        ] }),
        (profile.orders_total ?? 0) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-acid font-medium", children: fmtCOP(profile.orders_total ?? 0) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 12 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: new Date(profile.created_at).toLocaleDateString("es-CO") })
        ] })
      ] })
    ] }, profile.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-cream/20", children: [
      filtered.length,
      " de ",
      profiles.length,
      " usuarios"
    ] })
  ] });
}
export {
  AdminClientes as component
};
