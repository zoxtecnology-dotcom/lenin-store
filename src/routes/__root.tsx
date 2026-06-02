import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect } from "react";

import appCss from "../styles.css?url";
import { CartProvider } from "@/lib/cart";
import { CartDrawer } from "@/components/CartDrawer";
import { WhatsappWidget } from "@/components/WhatsappWidget";
import { WishlistProvider } from "@/lib/wishlist";
import { AuthProvider } from "@/lib/auth";
import { SettingsProvider } from "@/lib/settings";


function NotFoundComponent() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-5 text-center">
      <p className="text-[11px] uppercase tracking-[0.4em] text-acid mb-6">— Error 404</p>
      <h1
        className="font-display uppercase leading-[0.85] text-cream"
        style={{ fontSize: "clamp(5rem, 20vw, 16rem)" }}
      >
        404
      </h1>
      <p className="mt-6 font-serif-i text-xl text-cream/50 mb-10">
        Esta página no existe o fue movida.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Link
          to="/"
          className="bg-acid text-ink px-8 py-4 text-[11px] uppercase tracking-[0.3em] font-medium hover:opacity-90 transition-opacity"
        >
          Volver al inicio
        </Link>
        <Link
          to="/collections/$handle"
          params={{ handle: "nuevo" }}
          className="border border-border text-cream px-8 py-4 text-[11px] uppercase tracking-[0.3em] hover:border-cream/40 transition-colors"
        >
          Ver colección
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Esta página no cargó
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Algo falló de nuestro lado. Puedes intentar de nuevo o volver al inicio.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Intentar de nuevo
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Volver al inicio
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "AIAHN STORE — Streetwear masculino hecho en Colombia" },
      { name: "description", content: "Streetwear masculino premium hecho en Colombia. Drop 01 — AIAHN Essentials SS26." },
      { name: "author", content: "AIAHN Store" },
      { property: "og:title", content: "AIAHN STORE — Drop 01" },
      { property: "og:description", content: "Ropa hecha por amor, vestida con actitud. Drop 01 disponible ahora." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@aiahn_store" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  // Mide el header y publica --header-h como variable CSS global
  // Todos los sticky/offset lo leen de aquí — nunca píxeles hardcodeados
  useEffect(() => {
    function measureHeader() {
      const el = document.getElementById("site-header");
      if (el) {
        document.documentElement.style.setProperty("--header-h", `${el.offsetHeight}px`);
      }
    }
    measureHeader();
    const observer = new ResizeObserver(measureHeader);
    const el = document.getElementById("site-header");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SettingsProvider>
        <AuthProvider>
          <WishlistProvider>
            <CartProvider>
              <Outlet />
              <CartDrawer />
              <WhatsappWidget />
            </CartProvider>
          </WishlistProvider>
        </AuthProvider>
      </SettingsProvider>
    </QueryClientProvider>
  );
}

