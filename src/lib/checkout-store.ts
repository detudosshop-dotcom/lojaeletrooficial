import { useSyncExternalStore } from "react";

export type ShippingOption = "normal" | "expresso";
export type VoltageOption = "127V" | "220V";
export type ColorOption = string;

export type CheckoutData = {
  fullName: string;
  cpf: string;
  email: string;
  phone: string;
  cep: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  shipping: ShippingOption;
  voltage: VoltageOption;
  color: ColorOption;
  quantity: number;
};

const initial: CheckoutData = {
  fullName: "",
  cpf: "",
  email: "",
  phone: "",
  cep: "",
  street: "",
  number: "",
  complement: "",
  neighborhood: "",
  city: "",
  state: "",
  shipping: "normal",
  voltage: "127V",
  color: "Dourado/Verde",
  quantity: 1,
};

let state: CheckoutData = initial;
const listeners = new Set<() => void>();

const STORAGE_KEY = "checkout-data-v1";

function persist() {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
}

/** Restaura dados já preenchidos (chamado no cliente, após hidratação). */
export function hydrateCheckoutStore() {
  if (typeof window === "undefined") return;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw) as Partial<CheckoutData>;
    const next = { ...state, ...parsed };
    if (JSON.stringify(next) === JSON.stringify(state)) return;
    state = next;
    listeners.forEach((l) => l());
  } catch {
    /* ignore */
  }
}

export const checkoutStore = {
  get: () => state,
  set: (patch: Partial<CheckoutData>) => {
    state = { ...state, ...patch };
    persist();
    listeners.forEach((l) => l());
  },
  subscribe: (l: () => void) => {
    listeners.add(l);
    return () => listeners.delete(l);
  },
};

export function useCheckoutData() {
  return useSyncExternalStore(
    checkoutStore.subscribe,
    checkoutStore.get,
    checkoutStore.get,
  );
}
