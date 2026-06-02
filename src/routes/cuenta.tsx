import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/cuenta")({
  component: CuentaLayout,
});

function CuentaLayout() {
  return <Outlet />;
}
