import { createFileRoute, Outlet } from "@tanstack/react-router";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/cuenta")({
  // El layout marca noindex; todas las subrutas de /cuenta lo heredan.
  head: () => seo({ title: "Mi cuenta", noindex: true }),
  component: CuentaLayout,
});

function CuentaLayout() {
  return <Outlet />;
}
