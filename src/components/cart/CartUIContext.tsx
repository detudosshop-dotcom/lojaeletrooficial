import { createContext, useContext, useState, type ReactNode } from "react";
import { CartDrawer } from "@/components/cart/CartDrawer";

type CartUIContextValue = {
  open: boolean;
  openCart: () => void;
  closeCart: () => void;
};

const CartUIContext = createContext<CartUIContextValue | null>(null);

export function CartUIProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <CartUIContext.Provider
      value={{
        open,
        openCart: () => setOpen(true),
        closeCart: () => setOpen(false),
      }}
    >
      {children}
      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </CartUIContext.Provider>
  );
}

export function useCartUI() {
  const ctx = useContext(CartUIContext);
  if (!ctx) {
    return {
      open: false,
      openCart: () => {},
      closeCart: () => {},
    };
  }
  return ctx;
}
