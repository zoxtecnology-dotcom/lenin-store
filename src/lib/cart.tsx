import { createContext, useContext, useState, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { supabase } from "@/lib/supabase";

export interface CartPiece {
  name: string;
  size: string;
}

export interface CartItem {
  slug: string;
  name: string;
  price: number;
  qty: number;
  image?: string;
  size?: string;
  color?: string;
  conjuntoMode?: "completo" | "top" | "bottom";
  pieces?: CartPiece[];
}

interface CartContextValue {
  items: CartItem[];
  add: (item: Omit<CartItem, "qty">) => void;
  remove: (slug: string) => void;
  updateQty: (slug: string, qty: number) => void;
  clear: () => void;
  total: number;
  count: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  freeShippingThreshold: number;
  amountToFreeShipping: number;
}

const CartContext = createContext<CartContextValue | null>(null);

const CART_KEY = "aiahn-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(200000);
  const ready = useRef(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CART_KEY);
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch {}
    ready.current = true;

    // Listen for cart clear events (e.g., after purchase)
    const handleCartUpdate = () => {
      try {
        const saved = localStorage.getItem(CART_KEY);
        setItems(saved ? JSON.parse(saved) : []);
      } catch {
        setItems([]);
      }
    };
    window.addEventListener("storage", handleCartUpdate);
    window.addEventListener("cart-updated", handleCartUpdate);
    return () => {
      window.removeEventListener("storage", handleCartUpdate);
      window.removeEventListener("cart-updated", handleCartUpdate);
    };
  }, []);

  // Persist cart to localStorage when items change
  useEffect(() => {
    if (!ready.current) return;
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    supabase.from("site_settings")
      .select("value")
      .eq("key", "free_shipping_threshold")
      .single()
      .then(({ data }) => {
        if (data?.value) setFreeShippingThreshold(parseInt(data.value) || 200000);
      });
  }, []);

  function add(item: Omit<CartItem, "qty">) {
    setItems((prev) => {
      const key = item.slug + (item.conjuntoMode ?? "");
      const existing = prev.find((i) => i.slug + (i.conjuntoMode ?? "") === key);
      if (existing) {
        return prev.map((i) =>
          i.slug + (i.conjuntoMode ?? "") === key ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  }

  function remove(slug: string) {
    setItems((prev) => prev.filter((i) => i.slug !== slug));
  }

  function updateQty(slug: string, qty: number) {
    if (qty < 1) return remove(slug);
    setItems((prev) => prev.map((i) => i.slug === slug ? { ...i, qty } : i));
  }

  function clear() {
    setItems([]);
  }

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = items.reduce((sum, i) => sum + i.qty, 0);
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - total);

  return (
    <CartContext.Provider value={{
      items, add, remove, updateQty, clear,
      total, count, open, setOpen,
      freeShippingThreshold,
      amountToFreeShipping,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
