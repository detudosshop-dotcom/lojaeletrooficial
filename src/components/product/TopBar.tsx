import { Link } from "@tanstack/react-router";
import { ChevronLeft, Search, Share2, ShoppingCart, MoreHorizontal } from "lucide-react";
import { useCartUI } from "@/components/cart/CartUIContext";
import { useCartCount } from "@/lib/cart-store";
import { useState } from "react";

export function TopBar() {
  const { openCart } = useCartUI();
  const count = useCartCount();
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          url: window.location.href,
        });
      } catch {
        // Ignorar cancelamento
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // Fallback
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 flex items-center gap-2 bg-background/95 px-2.5 py-2 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border/40">
      {/* Botão Voltar */}
      <Link
        to="/loja"
        aria-label="Ir para a loja"
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full hover:bg-muted active:scale-95 text-foreground transition-all"
      >
        <ChevronLeft className="h-6 w-6 stroke-[2.2]" />
      </Link>

      {/* Barra de Pesquisa tipo Cápsula TikTok Shop */}
      <Link
        to="/loja"
        className="flex flex-1 items-center gap-2 rounded-full bg-muted/80 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-muted"
      >
        <Search className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
        <span className="truncate text-[13px] text-muted-foreground/80">
          buscar produtos, marcas...
        </span>
      </Link>

      {/* Compartilhar */}
      <button
        type="button"
        onClick={handleShare}
        aria-label="Compartilhar produto"
        className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full hover:bg-muted active:scale-95 text-foreground transition-all"
      >
        <Share2 className="h-4 w-4" />
        {copied && (
          <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black/80 px-1.5 py-0.5 text-[9px] text-white">
            Link copiado!
          </span>
        )}
      </button>

      {/* Carrinho de Compras */}
      <button
        type="button"
        onClick={openCart}
        aria-label={`Carrinho com ${count} ${count === 1 ? "item" : "itens"}`}
        className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full hover:bg-muted active:scale-95 text-foreground transition-all"
      >
        <ShoppingCart className="h-4 w-4" />
        {count > 0 && (
          <span className="absolute -right-1 -top-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#fe2c55] px-1 text-[10px] font-bold text-white">
            {count > 99 ? "99+" : count}
          </span>
        )}
      </button>

      {/* Menu / 3 pontinhos */}
      <Link
        to="/loja"
        aria-label="Mais opções da loja"
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full hover:bg-muted active:scale-95 text-foreground transition-all"
      >
        <MoreHorizontal className="h-4 w-4" />
      </Link>
    </header>
  );
}
