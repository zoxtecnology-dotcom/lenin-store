import { createContext, useContext, useState, useEffect } from "react";

interface WishlistCtx {
  items: string[];
  toggle: (slug: string) => void;
  has: (slug: string) => boolean;
}

const WishlistContext = createContext<WishlistCtx>(null!);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("aiahn-wishlist") ?? "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
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
