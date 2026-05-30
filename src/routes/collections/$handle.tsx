import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState, useMemo, useEffect, useRef } from "react";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import { z } from "zod";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { FilterDrawer, type Filters, DEFAULT_FILTERS, PRICE_MAX } from "@/components/FilterDrawer";
import { Reveal } from "@/components/Reveal";
import { fetchCollection, fetchProducts, fetchProductsIsNew, fetchMostSoldProducts } from "@/lib/catalog";
import { ProductCard } from "@/components/ProductCard";

const searchSchema = z.object({
  talla: z.string().optional(),
  color: z.string().optional(),
  sort: z.enum(["reciente", "precio-asc", "precio-desc", "vendidos"]).default("reciente"),
  disponible: z.boolean().optional(),
});

export const Route = createFileRoute("/collections/$handle")({
  validateSearch: (search) => searchSchema.parse(search),
  head: ({ loaderData }) => ({
    meta: loaderData?.collection
      ? [
          { title: `${loaderData.collection.name} — AIAHN STORE` },
          { name: "description", content: `Streetwear masculino premium — ${loaderData.collection.name}. ${loaderData.collection.subtitle}` },
        ]
      : [{ title: "Colección no encontrada" }],
  }),
  loader: async ({ params }) => {
    const collection = await fetchCollection(params.handle);
    if (!collection) throw notFound();

    // Fuente de productos según el tipo de colección
    let products;
    if (collection.isNewArrivals) {
      products = await fetchProductsIsNew();
    } else if (collection.isBestSellers) {
      products = await fetchMostSoldProducts();
    } else {
      products = await fetchProducts();
    }

    return { collection, products };
  },
  component: CollectionPage,
});

const SORT_LABELS: Record<string, string> = {
  "reciente": "Más reciente",
  "precio-asc": "Precio: menor a mayor",
  "precio-desc": "Precio: mayor a menor",
  "vendidos": "Más vendidos",
};

function CollectionPage() {
  const { collection, products } = Route.useLoaderData();
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
  const [visibleCount, setVisibleCount] = useState(12);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Infinite scroll — carga más al llegar al final
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((n) => n + 12);
        }
      },
      { rootMargin: "400px" } // empieza a cargar 400px antes del borde
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

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
  }, [products, collection]);

  return (
    <main className="bg-background text-foreground min-h-screen">
      <SiteHeader />

      {/* Hero strip */}
      <section className="relative h-[50vh] min-h-[340px] w-full overflow-hidden" style={{ marginTop: "var(--header-h, 88px)" }}>
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
      </section>

      {/* Filter + sort toolbar */}
      <div className="sticky z-40 bg-background border-b border-border" style={{ top: "calc(var(--header-h, 0px) - 1px)" }}>
        <div className="flex items-center justify-between px-5 py-3 md:px-10">
          <button
            onClick={() => setFilterOpen(true)}
            className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-cream/70 hover:text-cream transition-colors"
          >
            <SlidersHorizontal size={14} strokeWidth={1.5} />
            Filtrar
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 bg-acid text-ink text-[10px] font-bold flex items-center justify-center leading-none">
                {activeFilterCount}
              </span>
            )}
          </button>

          <div className="relative">
            <button
              onClick={() => setSortOpen((v) => !v)}
              className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-cream/70 hover:text-cream transition-colors"
            >
              {SORT_LABELS[sort] ?? "Más reciente"}
              <ChevronDown size={12} strokeWidth={1.5} className={sortOpen ? "rotate-180 transition-transform" : "transition-transform"} />
            </button>
            {sortOpen && (
              <div className="absolute right-0 top-full mt-2 bg-background border border-border w-52 z-50">
                {Object.entries(SORT_LABELS)
                  .filter(([value]) => !collection.isBestSellers || value !== "vendidos")
                  .map(([value, label]) => (
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
              {collection.isBestSellers
                ? "Los más vendidos aparecerán aquí cuando haya pedidos"
                : "No hay productos con estos filtros"}
            </p>
            {!collection.isBestSellers && (
              <button
                onClick={handleClearAll}
                className="mt-6 text-[10px] uppercase tracking-[0.25em] text-acid hover:opacity-70 transition-opacity"
              >
                Limpiar filtros
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 md:gap-x-5">
            {visible.map((p, i) => (
              <ProductCard key={p.slug} product={p} delay={i * 40} />
            ))}
          </div>
        )}

        {/* Sentinel invisible — el scroll lo activa automáticamente */}
        <div ref={sentinelRef} className="h-1" />
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

