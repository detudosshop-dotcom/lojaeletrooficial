import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Store, MessageCircle } from "lucide-react";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { useCartUI } from "@/components/cart/CartUIContext";
import { cartStore } from "@/lib/cart-store";
import { useCheckoutData } from "@/lib/checkout-store";
import { activeProductStore } from "@/lib/active-product-store";
import { useProduct } from "./ProductContext";

export function BuyBar() {
  const product = useProduct();
  const { color } = useCheckoutData();
  const [chatOpen, setChatOpen] = useState(false);
  const { openCart } = useCartUI();

  const handleAddToCart = () => {
    activeProductStore.set(product.slug);
    const colorImage = product.colorOptions?.find((c) => c.label === color)?.images[0];
    cartStore.add(
      {
        id: product.id,
        name: product.name,
        image: colorImage ?? product.images[0],
        price: product.price,
      },
      1,
    );
    openCart();
  };

  const handleBuyNow = () => {
    activeProductStore.set(product.slug);
    const colorImage = product.colorOptions?.find((c) => c.label === color)?.images[0];
    cartStore.add(
      {
        id: product.id,
        name: product.name,
        image: colorImage ?? product.images[0],
        price: product.price,
      },
      1,
    );
  };

  return (
    <>
      <div
        className="fixed inset-x-0 bottom-0 z-50 mx-auto flex max-w-md items-center gap-2 border-t border-border/60 bg-card px-3 py-2 shadow-[0_-4px_12px_rgba(0,0,0,0.06)]"
        style={{ paddingBottom: "max(0.6rem, env(safe-area-inset-bottom))" }}
      >
        {/* Ícone Loja */}
        <Link
          to="/loja"
          className="flex w-10 shrink-0 flex-col items-center justify-center gap-0.5 text-[11px] font-medium text-muted-foreground hover:text-foreground active:scale-95 transition-all"
        >
          <Store className="h-5 w-5" strokeWidth={1.8} />
          <span>Loja</span>
        </Link>

        {/* Ícone Chat */}
        <button
          type="button"
          onClick={() => setChatOpen(true)}
          aria-label="Abrir chat com a loja"
          className="flex w-10 shrink-0 flex-col items-center justify-center gap-0.5 text-[11px] font-medium text-muted-foreground hover:text-foreground active:scale-95 transition-all"
        >
          <MessageCircle className="h-5 w-5" strokeWidth={1.8} />
          <span>Chat</span>
        </button>

        {/* Botão Adicionar ao carrinho (cinza claro cápsula) */}
        <button
          type="button"
          onClick={handleAddToCart}
          className="flex-1 rounded-full bg-neutral-100 hover:bg-neutral-200/90 active:scale-[0.98] py-2.5 px-2 text-center text-xs sm:text-sm font-semibold text-neutral-900 transition-all leading-tight border border-neutral-200/60 shadow-xs"
        >
          Adicionar ao carrinho
        </button>

        {/* Botão Comprar com cupom (rosa avermelhado #fe2c55 cápsula) */}
        <Link
          to="/checkout"
          onClick={handleBuyNow}
          className="flex-1 rounded-full bg-[#fe2c55] hover:bg-[#e02449] active:scale-[0.98] py-2.5 px-2 text-center text-xs sm:text-sm font-bold text-white transition-all leading-tight shadow-md shadow-[#fe2c55]/25"
        >
          Comprar com cupom
        </Link>
      </div>
      <ChatWidget open={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  );
}
