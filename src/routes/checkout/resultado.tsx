import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/checkout/resultado")({
  component: CheckoutResultPage,
});

function CheckoutResultPage() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      
      // Limpiar carrito si es exitoso
      if (urlParams.get("collection_status") === "approved" || urlParams.get("status") === "success") {
        localStorage.removeItem("aiahn-cart");
      }
      
      // Redirigir al home
      window.location.href = "/";
    }
  }, []);

  return null;
}
