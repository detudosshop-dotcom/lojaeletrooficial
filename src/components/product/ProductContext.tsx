import { createContext, useContext } from "react";
import type { Product } from "@/lib/catalog";

const ProductContext = createContext<Product | null>(null);

export function ProductProvider({
  product,
  children,
}: {
  product: Product;
  children: React.ReactNode;
}) {
  return (
    <ProductContext.Provider value={product}>{children}</ProductContext.Provider>
  );
}

export function useProduct(): Product {
  const ctx = useContext(ProductContext);
  if (!ctx) {
    throw new Error("useProduct must be used inside a <ProductProvider />");
  }
  return ctx;
}
