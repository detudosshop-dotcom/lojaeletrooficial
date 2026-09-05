import { useSyncExternalStore } from "react";
import { storeProducts, type StoreProduct } from "@/lib/store-products";
import { activeProductStore } from "@/lib/active-product-store";
import { getProductBySlug } from "@/lib/catalog";

export type CartItem = {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
};

const STORAGE_KEY = "mestre-de-obra-cart-v1";

function loadInitial(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (i) => i && typeof i.id === "string" && typeof i.quantity === "number",
    );
  } catch {
    return [];
  }
}

let items: CartItem[] = loadInitial();
const listeners = new Set<() => void>();

function persist() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    /* ignore */
  }
}

function emit() {
  persist();
  listeners.forEach((l) => l());
}

export const cartStore = {
  get: () => items,
  subscribe: (l: () => void) => {
    listeners.add(l);
    return () => listeners.delete(l);
  },
  add: (product: Pick<StoreProduct, "id" | "name" | "image" | "price">, qty = 1) => {
    const existing = items.find((i) => i.id === product.id);
    if (existing) {
      items = items.map((i) =>
        i.id === product.id ? { ...i, quantity: i.quantity + qty } : i,
      );
    } else {
      items = [
        ...items,
        {
          id: product.id,
          name: product.name,
          image: product.image,
          price: product.price,
          quantity: qty,
        },
      ];
    }
    emit();
  },
  setQuantity: (id: string, quantity: number) => {
    if (quantity <= 0) {
      items = items.filter((i) => i.id !== id);
    } else {
      items = items.map((i) => (i.id === id ? { ...i, quantity } : i));
    }
    emit();
  },
  remove: (id: string) => {
    items = items.filter((i) => i.id !== id);
    emit();
  },
  clear: () => {
    items = [];
    emit();
  },
  /** Garante que o produto ativo esteja no carrinho. */
  ensureMain: () => {
    const slug = activeProductStore.get();
    const product = getProductBySlug(slug);
    if (!product) return;
    if (!items.find((i) => i.id === product.id)) {
      cartStore.add(
        {
          id: product.id,
          name: product.name,
          image: product.images[0],
          price: product.price,
        },
        1,
      );
    }
  },
};

// Mantém referência usada (evita warning de import não usado em alguns setups)
void storeProducts;

const emptyArr: CartItem[] = [];

export function useCart() {
  return useSyncExternalStore(
    cartStore.subscribe,
    cartStore.get,
    () => emptyArr,
  );
}

export function useCartCount() {
  const cart = useCart();
  return cart.reduce((sum, i) => sum + i.quantity, 0);
}

export function useCartTotal() {
  const cart = useCart();
  return cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
}
