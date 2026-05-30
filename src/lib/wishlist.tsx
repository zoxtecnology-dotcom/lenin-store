import { createContext, useContext, useState, useEffect, useRef } from "react";

interface WishlistCtx {
  items: string[];
  toggle: (slug: string) => void;
  has: (slug: string) => boolean;
}

const WishlistContext = createContext<WishlistCtx>(null!);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<string[]>([]);
  const ready = useRef(false);

  // Load from localStorage after mount (client-only, never on SSR)
  useEffect(() => {
    try {
      setItems(JSON.parse(localStorage.getItem("aiahn-wishlist") ?? "[]"));
    } catch {}
    ready.current = true;
  }, []);

  // Persist changes (skip until we've finished loading)
  useEffect(() => {
    if (!ready.current) return;
    localStorage.setItem("aiahn-wishlist", JSON.stringify(items));
  }, [items]);

  function toggle(slug: string) {
    setItems((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  }

  return (
    <WishlistContext.Provider value={{ items, toggle, has: (slug) => items.includes(slug) }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
