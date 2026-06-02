import { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

interface WishlistCtx {
  items: string[]; // product IDs
  toggle: (productId: string) => void;
  has: (productId: string) => boolean;
  removeMany: (productIds: string[]) => void;
  loading: boolean;
}

const WishlistContext = createContext<WishlistCtx>(null!);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [items, setItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const ready = useRef(false);

  // Load wishlist: from DB if logged in, localStorage if not
  useEffect(() => {
    async function load() {
      setLoading(true);
      
      if (user) {
        // Load from database
        const { data } = await supabase
          .from("wishlist")
          .select("product_id")
          .eq("user_id", user.id);
        
        const dbItems = data?.map((w) => w.product_id).filter(Boolean) as string[] ?? [];
        setItems(dbItems);
        
        // Sync localStorage items to DB if any exist
        try {
          const localItems = JSON.parse(localStorage.getItem("aiahn-wishlist") ?? "[]") as string[];
          if (localItems.length > 0) {
            const newItems = localItems.filter((id) => !dbItems.includes(id));
            if (newItems.length > 0) {
              await supabase.from("wishlist").insert(
                newItems.map((product_id) => ({ user_id: user.id, product_id }))
              );
              setItems([...dbItems, ...newItems]);
            }
            localStorage.removeItem("aiahn-wishlist");
          }
        } catch {}
      } else {
        // Load from localStorage
        try {
          setItems(JSON.parse(localStorage.getItem("aiahn-wishlist") ?? "[]"));
        } catch {}
      }
      
      ready.current = true;
      setLoading(false);
    }
    
    load();

    // Listen for wishlist updates from other parts of the app (e.g., after purchase)
    const handleUpdate = () => {
      load();
    };
    window.addEventListener("wishlist-updated", handleUpdate);
    return () => window.removeEventListener("wishlist-updated", handleUpdate);
  }, [user]);

  // Persist to localStorage for non-logged users
  useEffect(() => {
    if (!ready.current || user) return;
    localStorage.setItem("aiahn-wishlist", JSON.stringify(items));
  }, [items, user]);

  const toggle = useCallback(async (productId: string) => {
    const exists = items.includes(productId);
    
    if (exists) {
      setItems((prev) => prev.filter((id) => id !== productId));
      if (user) {
        await supabase
          .from("wishlist")
          .delete()
          .eq("user_id", user.id)
          .eq("product_id", productId);
      }
    } else {
      setItems((prev) => [...prev, productId]);
      if (user) {
        await supabase
          .from("wishlist")
          .insert({ user_id: user.id, product_id: productId });
      }
    }
  }, [items, user]);

  const has = useCallback((productId: string) => items.includes(productId), [items]);

  const removeMany = useCallback(async (productIds: string[]) => {
    if (productIds.length === 0) return;
    
    const toRemove = productIds.filter((id) => items.includes(id));
    if (toRemove.length === 0) return;

    setItems((prev) => prev.filter((id) => !toRemove.includes(id)));
    
    if (user) {
      await supabase
        .from("wishlist")
        .delete()
        .eq("user_id", user.id)
        .in("product_id", toRemove);
    }
  }, [items, user]);

  return (
    <WishlistContext.Provider value={{ items, toggle, has, removeMany, loading }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
