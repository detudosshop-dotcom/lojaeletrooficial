import { useState, useMemo } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import {
  Star,
  ShoppingCart,
  ChevronLeft,
  Search,
  Share2,
  MoreHorizontal,
  BadgeCheck,
  Check,
  Plus,
  Ticket,
  Truck,
  ShieldCheck,
  Flame,
  Zap,
  MessageCircle,
} from "lucide-react";
import { storeProducts, StoreProduct } from "@/lib/store-products";
import { useCartUI } from "@/components/cart/CartUIContext";
import { useCartCount, cartStore } from "@/lib/cart-store";
import { activeProductStore } from "@/lib/active-product-store";
import storeLogo from "@/assets/store-logo.jpg";
import { TrustBar } from "@/components/product/TrustBar";
import { ChatWidget } from "@/components/chat/ChatWidget";

export const Route = createFileRoute("/loja")({
  head: () => ({
    meta: [
      { title: "Loja Eletro Oficial - TikTok Shop" },
      {
        name: "description",
        content:
          "Loja Eletro Oficial no TikTok Shop. Ofertas relâmpago, cupons exclusivos e frete grátis para todo o Brasil.",
      },
    ],
  }),
  component: LojaPage,
});

type TabType = "todos" | "mais-vendidos" | "ofertas" | "frete-gratis";

function LojaPage() {
  const { openCart } = useCartUI();
  const count = useCartCount();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<TabType>("todos");
  const [isFollowing, setIsFollowing] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [collectedVouchers, setCollectedVouchers] = useState<Record<string, boolean>>({
    v1: true,
  });

  const toggleVoucher = (id: string) => {
    setCollectedVouchers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Filtragem e ordenação dos produtos
  const filteredProducts = useMemo(() => {
    let list = [...storeProducts];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q));
    }

    if (activeTab === "mais-vendidos") {
      list.sort((a, b) => b.sold - a.sold);
    } else if (activeTab === "ofertas") {
      list.sort((a, b) => b.discount - a.discount);
    } else if (activeTab === "frete-gratis") {
      list = list.filter((p) => p.freeShipping);
    }

    return list;
  }, [searchQuery, activeTab]);

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col bg-[#f8f8f9] text-foreground">
      {/* 1. Header estilo TikTok Shop App */}
      <header className="sticky top-0 z-40 flex items-center gap-2 bg-background/95 px-2.5 py-2 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border/40">
        <Link
          to="/"
          aria-label="Voltar para a página principal"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full hover:bg-muted active:scale-95 text-foreground transition-all"
        >
          <ChevronLeft className="h-6 w-6 stroke-[2.2]" />
        </Link>

        {/* Input de busca interativo */}
        <div className="flex flex-1 items-center gap-2 rounded-full bg-muted/80 px-3 py-1.5 text-xs text-muted-foreground transition-colors focus-within:bg-background focus-within:ring-1 focus-within:ring-primary">
          <Search className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Pesquisar nesta loja..."
            className="w-full bg-transparent text-[13px] text-foreground placeholder:text-muted-foreground/70 outline-none"
          />
        </div>

        {/* Chat de atendimento com a Júlia */}
        <button
          type="button"
          onClick={() => setChatOpen(true)}
          aria-label="Falar no chat da loja"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full hover:bg-muted active:scale-95 text-foreground transition-all"
        >
          <MessageCircle className="h-4 w-4" />
        </button>

        {/* Compartilhar */}
        <button
          type="button"
          aria-label="Compartilhar loja"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full hover:bg-muted active:scale-95 text-foreground transition-all"
        >
          <Share2 className="h-4 w-4" />
        </button>

        {/* Carrinho com contador */}
        <button
          type="button"
          onClick={openCart}
          aria-label={`Carrinho com ${count} itens`}
          className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full hover:bg-muted active:scale-95 text-foreground transition-all"
        >
          <ShoppingCart className="h-4 w-4" />
          {count > 0 && (
            <span className="absolute -right-1 -top-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#fe2c55] px-1 text-[10px] font-bold text-white shadow-xs">
              {count > 99 ? "99+" : count}
            </span>
          )}
        </button>

        {/* Mais opções */}
        <button
          type="button"
          aria-label="Mais opções"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full hover:bg-muted active:scale-95 text-foreground transition-all"
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </header>

      {/* 2. Banner Oficial da Loja (TikTok Shop Official Store Profile) */}
      <div className="bg-card border-b border-border/60 px-4 pt-3.5 pb-3">
        <div className="flex items-center gap-3">
          {/* Logo da Loja oficial com foto storeLogo */}
          <div className="relative shrink-0">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-[#fe2c55] via-[#ff5500] to-[#ffb800] p-[2px] shadow-sm">
              <img
                src={storeLogo}
                alt="Loja Eletro"
                className="h-full w-full rounded-full object-cover bg-white"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#00c853] text-white ring-2 ring-card shadow-xs">
              <Check className="h-3 w-3 stroke-[3]" />
            </div>
          </div>

          {/* Nome da Loja e Métricas idênticas à foto */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h1 className="truncate text-base font-black text-foreground">
                Loja Eletro
              </h1>
              <span className="flex items-center gap-1 text-xs text-[#00c853] font-medium">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#00c853] animate-pulse" />
                Online
              </span>
              <BadgeCheck className="h-4 w-4 shrink-0 fill-[#20d5ec] text-white" />
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="inline-flex items-center rounded-sm bg-[#fe2c55]/10 px-1.5 py-0.2 text-[10px] font-bold text-[#fe2c55]">
                TikTok Shop Oficial
              </span>
              <span className="text-[11px] text-muted-foreground">· 84.5k seguidores</span>
            </div>

            <div className="flex items-center gap-2 mt-1.5 text-[11px] text-muted-foreground flex-wrap">
              <div className="flex items-center gap-0.5">
                <Star className="h-3 w-3 fill-[#ffb800] text-[#ffb800]" />
                <span className="font-bold text-foreground">4.98</span>
              </div>
              <span>|</span>
              <div>
                <span className="font-bold text-foreground">+16 mil</span> vendas
              </div>
              <span>|</span>
              <div className="text-[#00c853] font-medium">98% positivas</div>
            </div>
          </div>

          {/* Botão Seguir */}
          <button
            type="button"
            onClick={() => setIsFollowing(!isFollowing)}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all shadow-xs active:scale-95 ${
              isFollowing
                ? "bg-muted text-muted-foreground border border-border"
                : "bg-[#fe2c55] text-white hover:bg-[#e02449]"
            }`}
          >
            {isFollowing ? "Seguindo ✓" : "+ Seguir"}
          </button>
        </div>

        {/* 3. Cupons de Desconto Coletáveis (TikTok Shop Vouchers) */}
        <div className="mt-3.5 flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {/* Cupom 1 */}
          <div className="flex shrink-0 items-center rounded-lg border border-[#ffd2dd] bg-[#fff0f3] p-1.5 text-xs shadow-2xs">
            <div className="flex items-center gap-1.5 pr-2 border-r border-[#ffd2dd]/80">
              <Ticket className="h-3.5 w-3.5 text-[#fe2c55] rotate-45" />
              <div className="leading-tight">
                <p className="font-black text-[#fe2c55] text-[11px]">R$ 10 OFF</p>
                <p className="text-[9px] text-[#fe2c55]/80">Acima de R$ 99</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => toggleVoucher("v1")}
              className={`ml-2 rounded-full px-2 py-0.5 text-[10px] font-bold transition-all ${
                collectedVouchers.v1
                  ? "bg-[#fe2c55]/15 text-[#fe2c55]"
                  : "bg-[#fe2c55] text-white"
              }`}
            >
              {collectedVouchers.v1 ? "Coletado" : "Coletar"}
            </button>
          </div>

          {/* Cupom 2 */}
          <div className="flex shrink-0 items-center rounded-lg border border-[#c8e6c9] bg-[#e8f5e9] p-1.5 text-xs shadow-2xs">
            <div className="flex items-center gap-1.5 pr-2 border-r border-[#c8e6c9]/80">
              <Truck className="h-3.5 w-3.5 text-[#00c853]" />
              <div className="leading-tight">
                <p className="font-black text-[#2e7d32] text-[11px]">Frete Grátis</p>
                <p className="text-[9px] text-[#2e7d32]/80">Para todo Brasil</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => toggleVoucher("v2")}
              className={`ml-2 rounded-full px-2 py-0.5 text-[10px] font-bold transition-all ${
                collectedVouchers.v2
                  ? "bg-[#00c853]/15 text-[#00c853]"
                  : "bg-[#00c853] text-white"
              }`}
            >
              {collectedVouchers.v2 ? "Coletado" : "Coletar"}
            </button>
          </div>

          {/* Cupom 3 */}
          <div className="flex shrink-0 items-center rounded-lg border border-[#ffe0b2] bg-[#fff8e1] p-1.5 text-xs shadow-2xs">
            <div className="flex items-center gap-1.5 pr-2 border-r border-[#ffe0b2]/80">
              <Zap className="h-3.5 w-3.5 text-[#ff6f00]" />
              <div className="leading-tight">
                <p className="font-black text-[#e65100] text-[11px]">5% no Pix</p>
                <p className="text-[9px] text-[#e65100]/80">Desconto imediato</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => toggleVoucher("v3")}
              className={`ml-2 rounded-full px-2 py-0.5 text-[10px] font-bold transition-all ${
                collectedVouchers.v3
                  ? "bg-[#ff6f00]/15 text-[#ff6f00]"
                  : "bg-[#ff6f00] text-white"
              }`}
            >
              {collectedVouchers.v3 ? "Coletado" : "Coletar"}
            </button>
          </div>
        </div>
      </div>

      {/* 4. Barra de Abas / Categorias do TikTok Shop */}
      <nav className="sticky top-[53px] z-30 flex items-center border-b border-border/60 bg-background px-3 shadow-2xs">
        <button
          type="button"
          onClick={() => setActiveTab("todos")}
          className={`relative flex-1 py-2.5 text-center text-xs font-bold transition-colors ${
            activeTab === "todos"
              ? "text-[#fe2c55]"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Recomendados
          {activeTab === "todos" && (
            <span className="absolute inset-x-4 bottom-0 h-0.5 rounded-full bg-[#fe2c55]" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("mais-vendidos")}
          className={`relative flex-1 py-2.5 text-center text-xs font-bold transition-colors flex items-center justify-center gap-1 ${
            activeTab === "mais-vendidos"
              ? "text-[#fe2c55]"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Flame className="h-3.5 w-3.5" />
          Mais Vendidos
          {activeTab === "mais-vendidos" && (
            <span className="absolute inset-x-4 bottom-0 h-0.5 rounded-full bg-[#fe2c55]" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("ofertas")}
          className={`relative flex-1 py-2.5 text-center text-xs font-bold transition-colors flex items-center justify-center gap-1 ${
            activeTab === "ofertas"
              ? "text-[#fe2c55]"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Zap className="h-3.5 w-3.5" />
          Ofertas ⚡
          {activeTab === "ofertas" && (
            <span className="absolute inset-x-4 bottom-0 h-0.5 rounded-full bg-[#fe2c55]" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("frete-gratis")}
          className={`relative flex-1 py-2.5 text-center text-xs font-bold transition-colors flex items-center justify-center gap-1 ${
            activeTab === "frete-gratis"
              ? "text-[#fe2c55]"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Truck className="h-3.5 w-3.5" />
          Frete Grátis
          {activeTab === "frete-gratis" && (
            <span className="absolute inset-x-4 bottom-0 h-0.5 rounded-full bg-[#fe2c55]" />
          )}
        </button>
      </nav>

      {/* 5. Grade de Produtos estilo TikTok Shop Showcase */}
      <main className="flex-1 p-2.5">
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Search className="h-8 w-8 text-muted-foreground/50 mb-2" />
            <p className="text-sm font-semibold">Nenhum produto encontrado</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Tente buscar por outro termo ou categoria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2.5">
            {filteredProducts.map((product, index) => (
              <TikTokProductCard
                key={product.id}
                product={product}
                index={index}
                onAddToCart={() => {
                  activeProductStore.set(product.slug ?? product.id);
                  cartStore.add(
                    {
                      id: product.id,
                      name: product.name,
                      image: product.image,
                      price: product.price,
                    },
                    1,
                  );
                  openCart();
                }}
              />
            ))}
          </div>
        )}

        {/* 6. Banner de Segurança TikTok Shop no Rodapé */}
        {/* 6. Compre com segurança (idêntico ao da foto) */}
        <div className="mt-5 overflow-hidden rounded-xl border border-border/80 bg-card shadow-2xs">
          <TrustBar />
        </div>

        {/* Banner de Segurança TikTok Shop no Rodapé */}
        <div className="mt-3 rounded-xl border border-border/80 bg-card p-3 text-center shadow-2xs">
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-foreground">
            <ShieldCheck className="h-4 w-4 text-[#00c853]" />
            <span>Compra Segura TikTok Shop Oficial</span>
          </div>
          <p className="mt-1 text-[11px] text-muted-foreground leading-relaxed">
            Pagamentos protegidos · Devolução grátis em até 7 dias · Atendimento prioritário
          </p>
        </div>
      </main>
      <ChatWidget open={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  );
}

function TikTokProductCard({
  product,
  index,
  onAddToCart,
}: {
  product: StoreProduct;
  index: number;
  onAddToCart: () => void;
}) {
  const installment = (product.price / 12).toFixed(2).replace(".", ",");
  const [priceInt, priceDec] = product.price.toFixed(2).split(".");

  const card = (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-neutral-200/70 bg-white shadow-xs transition-all hover:shadow-md active:scale-[0.99]">
      {/* Área da Imagem com Badges */}
      <div className="relative aspect-square w-full bg-[#fdfdfd] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain p-2.5 transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />

        {/* Badge de Desconto Estilo TikTok Shop (Rosa/Vermelho) */}
        {product.discount > 0 && (
          <span className="absolute left-0 top-2 rounded-r-md bg-[#fe2c55] px-2 py-0.5 text-[10.5px] font-black text-white shadow-sm">
            {product.discount}% OFF
          </span>
        )}

        {/* Badge de Destaque #1 Mais Vendido para os primeiros */}
        {index < 3 && (
          <span className="absolute right-1.5 top-1.5 rounded-full bg-gradient-to-r from-[#ff5500] to-[#ff7043] px-1.5 py-0.5 text-[9px] font-black text-white shadow-xs">
            #{index + 1} Top
          </span>
        )}

        {/* Badge de Frete Grátis na base da imagem */}
        {product.freeShipping && (
          <span className="absolute bottom-1.5 left-1.5 flex items-center gap-0.5 rounded-sm bg-[#00c853] px-1.5 py-0.5 text-[9px] font-bold text-white shadow-xs">
            <Truck className="h-2.5 w-2.5" />
            Frete grátis
          </span>
        )}
      </div>

      {/* Área de Informações */}
      <div className="flex flex-1 flex-col justify-between p-2.5 bg-white">
        <div>
          {/* Preço estilo TikTok Shop */}
          <div className="flex items-baseline gap-1">
            <span className="text-xs font-bold text-[#fe2c55]">R$</span>
            <span className="text-[19px] font-black leading-none text-[#fe2c55]">
              {priceInt}
            </span>
            <span className="text-xs font-bold text-[#fe2c55]">,{priceDec}</span>
            {product.oldPrice > product.price && (
              <span className="ml-1 text-[11px] text-muted-foreground/70 line-through">
                R$ {product.oldPrice.toFixed(2).replace(".", ",")}
              </span>
            )}
          </div>

          {/* Parcelamento pequeno */}
          <div className="mt-0.5 text-[10px] text-muted-foreground">
            ou 12x de R$ {installment}
          </div>

          {/* Título do produto com 2 linhas */}
          <h3 className="mt-1 line-clamp-2 text-xs font-semibold leading-snug text-neutral-900 group-hover:text-[#fe2c55] transition-colors">
            {product.name}
          </h3>
        </div>

        {/* Linha de Avaliações + Botão de Compra Rápida */}
        <div className="mt-2.5 flex items-center justify-between pt-1 border-t border-neutral-100">
          <div className="flex items-center gap-1 text-[10.5px] text-muted-foreground">
            <Star className="h-3 w-3 fill-[#ffb800] text-[#ffb800]" />
            <span className="font-bold text-neutral-800">{product.rating}</span>
            <span className="text-[10px] text-neutral-400">|</span>
            <span className="text-[10px]">
              {product.sold >= 1000 ? `${(product.sold / 1000).toFixed(1)}k` : product.sold} vendidos
            </span>
          </div>

          {/* Botão rápido de adicionar ao carrinho */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onAddToCart();
            }}
            aria-label="Adicionar ao carrinho"
            className="flex h-6 w-6 items-center justify-center rounded-full bg-[#fe2c55]/10 text-[#fe2c55] hover:bg-[#fe2c55] hover:text-white transition-all active:scale-90"
          >
            <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  );

  if (product.href) {
    return (
      <Link to={product.href} className="block h-full">
        {card}
      </Link>
    );
  }

  return <div className="opacity-60">{card}</div>;
}

