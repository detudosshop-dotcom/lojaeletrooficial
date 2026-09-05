import { useEffect, useState } from "react";
import {
  Star,
  Truck,
  ShieldCheck,
  Check,
  Eye,
  ShoppingBag,
  Clock,
  CreditCard,
  ChevronRight,
  Ticket,
  Bookmark,
} from "lucide-react";
import { checkoutStore, useCheckoutData } from "@/lib/checkout-store";
import { WarrantyBadge } from "@/components/common/WarrantyBadge";
import { useDeliveryDate } from "@/lib/delivery-date";
import { useProduct } from "./ProductContext";
import { cn } from "@/lib/utils";

export function ProductInfo() {
  const product = useProduct();
  const delivery = useDeliveryDate();
  const { voltage, color } = useCheckoutData();
  const [saved, setSaved] = useState(false);

  const setVoltage = (v: "127V" | "220V") => checkoutStore.set({ voltage: v });
  const setColor = (c: string) => checkoutStore.set({ color: c });
  const showVoltage = !!product.voltageOptions?.length;
  const showColor = !!product.colorOptions?.length;
  const currentColor = product.colorOptions?.find((o) => o.label === color);

  // Valor da parcela em 12x
  const installmentValue = (product.price / 12).toFixed(2).replace(".", ",");

  // Contador "pessoas vendo agora" oscilando entre 80-160
  const [viewers, setViewers] = useState(127);
  useEffect(() => {
    const id = setInterval(() => {
      setViewers((v) => {
        const delta = Math.floor(Math.random() * 9) - 4;
        const next = v + delta;
        if (next < 80) return 80;
        if (next > 160) return 160;
        return next;
      });
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="space-y-3 bg-card px-4 py-3.5 shadow-xs">
      {/* Linha de Parcelamento em 12x */}
      <div className="flex items-center justify-between text-xs text-foreground/90 font-medium">
        <div className="flex items-center gap-1.5">
          <CreditCard className="h-4 w-4 text-muted-foreground" />
          <span>12x de R$ {installmentValue}</span>
        </div>
        <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
      </div>

      {/* Badges de Cupons em Rosa/Pink estilo TikTok Shop */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
        <span className="flex items-center gap-1 rounded-[3px] bg-[#fff0f3] border border-[#ffd2dd] px-2 py-0.5 text-[11px] font-bold text-[#fe2c55] whitespace-nowrap shadow-2xs">
          <Ticket className="h-3 w-3 rotate-45" /> Desconto de R$ 5
        </span>
        <span className="flex items-center gap-1 rounded-[3px] bg-[#fff0f3] border border-[#ffd2dd] px-2 py-0.5 text-[11px] font-bold text-[#fe2c55] whitespace-nowrap shadow-2xs">
          <Ticket className="h-3 w-3 rotate-45" /> {product.discount}% OFF
        </span>
        <span className="flex items-center gap-0.5 rounded-[3px] bg-[#fff0f3] border border-[#ffd2dd] px-2 py-0.5 text-[11px] font-bold text-[#fe2c55] whitespace-nowrap shadow-2xs">
          Economize 7% <ChevronRight className="h-3 w-3 inline" />
        </span>
      </div>

      {/* Título do Produto com Ícone de Salvar / Bookmark */}
      <div className="flex items-start justify-between gap-2.5 pt-0.5">
        <h1 className="flex-1 text-[15px] font-bold leading-snug text-foreground">
          {product.name}
        </h1>
        <button
          type="button"
          onClick={() => setSaved(!saved)}
          aria-label={saved ? "Remover dos favoritos" : "Salvar produto"}
          className="p-1 text-muted-foreground hover:text-foreground active:scale-90 transition-all shrink-0"
        >
          <Bookmark
            className={cn(
              "h-5 w-5 transition-colors",
              saved ? "fill-[#fe2c55] text-[#fe2c55]" : "text-muted-foreground"
            )}
          />
        </button>
      </div>

      {/* Avaliação e Vendas */}
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Star className="h-3.5 w-3.5 fill-[#ffb800] text-[#ffb800]" />
        <span className="font-bold text-foreground">{product.rating}</span>
        <span className="text-muted-foreground">({product.reviews})</span>
        <span className="text-muted-foreground/30 mx-0.5">|</span>
        <span className="text-muted-foreground">{product.sold.toLocaleString("pt-BR")} vendidos</span>
      </div>

      {/* Frete e Prazo de Entrega */}
      <div className="flex items-start gap-2.5 border-t border-border/60 pt-3 text-xs">
        <Truck className="h-4 w-4 mt-0.5 text-foreground shrink-0" />
        <div className="flex-1 leading-tight">
          <p className="font-bold text-foreground">
            Receba até {delivery.short}
          </p>
          <p className="text-[11px] text-muted-foreground mt-1">
            Taxa de envio: <span className="line-through">R$ 29,00</span>{" "}
            <span className="font-bold text-[#00c853]">Grátis</span>
          </p>
        </div>
      </div>

      <div className="space-y-2">
        {showVoltage && (
          <>
            <div className="text-sm text-muted-foreground">
              Voltagem: <span className="font-medium text-foreground">{voltage}</span>
              <span className="ml-2 text-xs text-primary">
                {voltage === "127V" ? "4 unidades disponíveis" : "3 unidades disponíveis"}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {(product.voltageOptions || []).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setVoltage(v)}
                  className={`relative rounded-md border px-4 py-2 text-sm font-medium transition-colors ${
                    voltage === v
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border bg-card text-foreground hover:border-muted-foreground/40"
                  }`}
                >
                  {v}
                  <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                    {v === "127V" ? 4 : 3}
                  </span>
                </button>
              ))}
            </div>
          </>
        )}
        {showColor && (
          <>
            <div className="text-sm text-muted-foreground">
              Cor: <span className="font-medium text-foreground">{color}</span>
              {currentColor && (
                <span className="ml-2 text-xs text-primary">
                  {currentColor.stock} unidades disponíveis
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {(product.colorOptions || []).map((opt) => {
                const isActive = color === opt.label;
                return (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => setColor(opt.label)}
                    className={`relative flex items-center gap-2 rounded-md border px-2 py-1.5 text-sm font-medium transition-colors ${
                      isActive
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border bg-card text-foreground hover:border-muted-foreground/40"
                    }`}
                  >
                    <img
                      src={opt.images[0]}
                      alt={opt.label}
                      className="h-9 w-9 rounded object-cover"
                      loading="lazy"
                    />
                    <span className="pr-1">{opt.label}</span>
                    <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                      {opt.stock}
                    </span>
                  </button>
                );
              })}
            </div>
          </>
        )}
        {/* Estoque baixo + barra visual */}
        {(() => {
          const stock = currentColor?.stock ?? (showVoltage ? (voltage === "127V" ? 4 : 3) : 7);
          const pct = Math.max(6, Math.min(100, Math.round((stock / 10) * 100)));
          return (
            <div className="space-y-1.5 rounded-md border border-primary/20 bg-primary/5 p-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 font-semibold text-primary">
                  <Clock className="h-3.5 w-3.5" />
                  Estoque acabando
                  {currentColor && (
                    <span className="font-normal text-muted-foreground">· {currentColor.label}</span>
                  )}
                </span>
                <span className="font-bold text-primary">{stock} {stock === 1 ? "unidade" : "unidades"}</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-primary/15">
                <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${pct}%` }} />
              </div>
            </div>
          );
        })()}

        {/* Pessoas vendo agora + vendas hoje */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-2 rounded-md border border-border bg-muted/40 px-2.5 py-2">
            <Eye className="h-3.5 w-3.5 shrink-0 text-primary" />
            <div className="leading-tight">
              <span className="block font-semibold text-foreground">{viewers} pessoas</span>
              <span className="text-[10px] text-muted-foreground">vendo agora</span>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-md border border-border bg-muted/40 px-2.5 py-2">
            <ShoppingBag className="h-3.5 w-3.5 shrink-0 text-success" />
            <div className="leading-tight">
              <span className="block font-semibold text-foreground">+38 vendidos</span>
              <span className="text-[10px] text-muted-foreground">nas últimas 24h</span>
            </div>
          </div>
        </div>
      </div>



      <div className="rounded-lg bg-protection-bg p-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-protection-fg">
          <ShieldCheck className="h-4 w-4" />
          Proteção do cliente
        </div>
        <ul className="mt-2 grid grid-cols-1 gap-1.5 text-xs text-foreground sm:grid-cols-2">
          {[
            "Garantia de 1 ano do fabricante",
            "Devolução gratuita em 7 dias",
            "Reembolso automático por danos",
            "Pagamento seguro",
          ].map((item) => (
            <li key={item} className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-success" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <WarrantyBadge variant="banner" />
    </section>
  );
}
