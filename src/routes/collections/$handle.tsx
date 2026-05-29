import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import { z } from "zod";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { FilterDrawer, type Filters, DEFAULT_FILTERS, PRICE_MAX } from "@/components/FilterDrawer";
import { Cursor } from "@/components/Cursor";
import { Reveal } from "@/components/Reveal";
import { getCollection } from "@/lib/collections";
import { products, fmtCOP } from "@/lib/products";

const searchSchema = z.object({
  talla: z.string().optional(),
  color: z.string().optional(),
  sort: z.enum(["reciente", "precio-asc", "precio-desc", "vendidos"]).default("reciente"),
  disponible: z.boolean().optional(),
});

export const Route = createFileRoute("/collections/$handle")({
  validateSearch: (search) => searchSchema.parse(search),
  head: ({ params }) => {
    const col = getCollection(params.handle);
    return {
      meta: col
        ? [
            { title: `${col.name} — AIAHN STORE` },
            { name: "description", content: `Streetwear masculino premium — ${col.name}. ${col.subtitle}` },
          ]
        : [{ title: "Colección no encontrada" }],
    };
  },
  loader: ({ params }) => {
    const col = getCollection(params.handle);
    if (!col) throw notFound();
    return { collection: col };
  },
  component: CollectionPage,
});

const SORT_LABELS: Record<string, string> = {
  "reciente": "Más reciente",
  "precio-asc": "Precio ↑",
  "precio-desc": "Precio ↓",
  "vendidos": "Más vendidos",
};

function CollectionPage() {
  const { collection } = Route.useLoaderData();
  const search = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    tallas: search.talla ? [search.talla] : [],
    colores: search.color ? [search.color] : [],
    precioMin: 0,
    precioMax: PRICE_MAX,
    disponible: search.disponible ?? false,
  });
  const [sort, setSort] = useState(search.sort ?? "reciente");
  const [visibleCount, setVisibleCount] = useState(8);

  const activeFilterCount =
    filters.tallas.length +
    filters.colores.length +
    (filters.precioMin > 0 || filters.precioMax < PRICE_MAX ? 1 : 0) +
    (filters.disponible ? 1 : 0);

  // All products for this collection's category
  const collectionProducts = useMemo(() => {
    let list = collection.isAll
      ? [...products]
      : collection.isNewArrivals
      ? products.filter((p) => p.isNew)
      : collection.isBestSellers
      ? products.filter((p) => p.isBestSeller)
      : collection.isHotSale
      ? products.filter((p) => p.isOnSale)
      : products.filter((p) => p.category === collection.category);

    if (filters.tallas.length > 0) {
      list = list.filter((p) => p.sizes.some((s) => filters.tallas.includes(s)));
    }
    if (filters.colores.length > 0) {
      list = list.filter((p) => p.colors.some((c) => filters.colores.includes(c.name)));
    }
    list = list.filter((p) => p.price >= filters.precioMin && p.price <= filters.precioMax);

    if (sort === "precio-asc") list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === "precio-desc") list = [...list].sort((a, b) => b.price - a.price);

    return list;
  }, [collection.category, filters, sort]);

  function handleFiltersChange(f: Filters) {
    setFilters(f);
    navigate({
      search: (prev) => ({
        ...prev,
        talla: f.tallas[0],
        color: f.colores[0],
        disponible: f.disponible || undefined,
      }),
    });
  }

  function handleClearAll() {
    setFilters(DEFAULT_FILTERS);
  }

  function handleSortChange(s: string) {
    setSort(s);
    navigate({ search: (prev) => ({ ...prev, sort: s as typeof search.sort }) });
    setSortOpen(false);
  }

  const visible = collectionProducts.slice(0, visibleCount);

  const availableSizes = useMemo(() => {
    const all = products
      .filter((p) => collection.isAll ? true : collection.isNewArrivals ? p.isNew : collection.isBestSellers ? p.isBestSeller : collection.isHotSale ? p.isOnSale : p.category === collection.category)
      .flatMap((p) => p.sizes);
    return [...new Set(all)];
  }, [collection]);

  return (
    <main className="bg-background text-foreground min-h-screen">
      <Cursor />
      <SiteHeader />

      {/* Hero strip */}
      <section className="relative h-[50vh] min-h-[340px] w-full overflow-hidden mt-[88px]">
        <img
          src={collection.image}
          alt={collection.name}
          className="absolute inset-0 h-full w-full object-cover object-top"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />
        <div className="relative h-full mx-auto max-w-[1500px] px-5 md:px-10 flex flex-col justify-end pb-10">
          <h1 className="font-display text-[clamp(4rem,14vw,12rem)] uppercase leading-[0.85] text-cream">
            {collection.name}
          </h1>
          <p className="mt-3 font-serif-i text-base text-cream/70 max-w-xs">{collection.subtitle}</p>
        </div>
        <div className="absolute top-8 right-8 text-[10px] uppercase tracking-[0.35em] text-cream/50">
          {collectionProducts.length} productos
        </div>
      </section>

      {/* Filter + sort toolbar */}
      <div className="sticky top-[88px] z-40 bg-background border-b border-border">
        <div className="flex items-center justify-between px-5 py-3 md:px-10">
          <button
            onClick={() => setFilterOpen(true)}
            className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-cream/70 hover:text-cream transition-colors"
          >
            <SlidersHorizontal size={14} strokeWidth={1.5} />
            Filtrar {activeFilterCount > 0 && <span className="text-acid">({activeFilterCount})</span>}
          </button>

          <div className="relative">
            <button
              onClick={() => setSortOpen((v) => !v)}
              className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-cream/70 hover:text-cream transition-colors"
            >
              {SORT_LABELS[sort]}
              <ChevronDown size={12} strokeWidth={1.5} className={sortOpen ? "rotate-180 transition-transform" : "transition-transform"} />
            </button>
            {sortOpen && (
              <div className="absolute right-0 top-full mt-2 bg-background border border-border w-44 z-50">
                {Object.entries(SORT_LABELS).map(([value, label]) => (
                  <button
                    key={value}
                    onClick={() => handleSortChange(value)}
                    className={`block w-full text-left px-4 py-3 text-[10px] uppercase tracking-[0.2em] transition-colors border-b border-border/50 last:border-0 ${
                      sort === value ? "text-cream bg-border/30" : "text-cream/60 hover:text-cream hover:bg-border/20"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product grid */}
      <section className="mx-auto max-w-[1500px] px-5 py-12 md:px-10">
        {visible.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-[11px] uppercase tracking-[0.3em] text-cream/40">
              No hay productos con estos filtros
            </p>
            <button
              onClick={handleClearAll}
              className="mt-6 text-[10px] uppercase tracking-[0.25em] text-acid hover:opacity-70 transition-opacity"
            >
              Limpiar filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 md:gap-x-5">
            {visible.map((p, i) => (
              <Reveal key={p.slug} delay={i * 40}>
                <Link to="/products/$slug" params={{ slug: p.slug }} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden bg-bone">
                    {p.tag && (
                      <span className={`absolute left-3 top-3 z-10 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.2em] ${
                        p.tag.startsWith("-") ? "bg-acid text-ink" : "bg-ink text-cream"
                      }`}>
                        {p.tag}
                      </span>
                    )}
                    <img
                      src={p.front}
                      alt={p.name}
                      loading="lazy"
                      className="card-img card-img-front absolute inset-0 h-full w-full object-cover"
                    />
                    <img
                      src={p.back}
                      alt=""
                      aria-hidden
                      loading="lazy"
                      className="card-img card-img-back absolute inset-0 h-full w-full object-cover opacity-0"
                    />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-[11px] uppercase tracking-[0.18em] text-cream leading-snug">{p.name}</h3>
                    <p className="mt-1 text-[11px] tabular-nums text-cream/60">{fmtCOP(p.price)}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}

        {visibleCount < collectionProducts.length && (
          <div className="mt-16 text-center">
            <button
              onClick={() => setVisibleCount((n) => n + 8)}
              className="border border-cream px-10 py-4 text-[11px] uppercase tracking-[0.3em] text-cream hover:bg-cream hover:text-ink transition-colors"
            >
              Cargar más ({collectionProducts.length - visibleCount} restantes)
            </button>
          </div>
        )}
      </section>

      <Footer />

      <FilterDrawer
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        filters={filters}
        sort={sort}
        onFiltersChange={handleFiltersChange}
        onSortChange={() => {}}
        activeCount={activeFilterCount}
        availableSizes={availableSizes}
      />
    </main>
  );
}

