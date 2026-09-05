import { useSyncExternalStore } from "react";
import { PIX_DISCOUNT_RATE } from "@/lib/pricing";

const SESSION_KEY = "lav-exit-coupon-applied";
const SESSION_SHOWN = "lav-exit-coupon-shown";

let applied = false;

if (typeof window !== "undefined") {
  try {
    applied = window.sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    /* ignore */
  }
}

const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

export const couponStore = {
  get: () => applied,
  subscribe: (l: () => void) => {
    listeners.add(l);
    return () => listeners.delete(l);
  },
  apply: () => {
    applied = true;
    try {
      window.sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* ignore */
    }
    emit();
  },
  wasShown: () => {
    if (typeof window === "undefined") return false;
    try {
      return window.sessionStorage.getItem(SESSION_SHOWN) === "1";
    } catch {
      return false;
    }
  },
  markShown: () => {
    try {
      window.sessionStorage.setItem(SESSION_SHOWN, "1");
    } catch {
      /* ignore */
    }
  },
};

export function useCouponApplied() {
  return useSyncExternalStore(
    couponStore.subscribe,
    couponStore.get,
    () => false,
  );
}

/** Desconto do Pix — vem da configuração da loja (cupom soma 5 p.p.). */
export function getPixDiscount(couponApplied: boolean) {
  return couponApplied ? PIX_DISCOUNT_RATE + 0.05 : PIX_DISCOUNT_RATE;
}
