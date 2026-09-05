import { useSyncExternalStore } from "react";
import { MAIN_PRODUCT_SLUG } from "@/lib/catalog";

const STORAGE_KEY = "mestre-de-obra-active-product-v1";

function loadInitial(): string {
  if (typeof window === "undefined") return MAIN_PRODUCT_SLUG;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw || MAIN_PRODUCT_SLUG;
  } catch {
    return MAIN_PRODUCT_SLUG;
  }
}

let activeSlug: string = loadInitial();
const listeners = new Set<() => void>();

function persist() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, activeSlug);
  } catch {
    /* ignore */
  }
}

function emit() {
  persist();
  listeners.forEach((l) => l());
}

/**
 * Guarda o slug do produto que o usuário está comprando agora.
 * Usado pelo checkout pra exibir produto correto e calcular preço.
 */
export const activeProductStore = {
  get: () => activeSlug,
  set: (slug: string) => {
    if (slug === activeSlug) return;
    activeSlug = slug;
    emit();
  },
  subscribe: (l: () => void) => {
    listeners.add(l);
    return () => listeners.delete(l);
  },
};

export function useActiveProductSlug(): string {
  return useSyncExternalStore(
    activeProductStore.subscribe,
    activeProductStore.get,
    () => MAIN_PRODUCT_SLUG,
  );
}
