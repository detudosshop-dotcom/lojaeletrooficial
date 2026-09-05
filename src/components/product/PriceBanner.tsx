import { Zap, Ticket } from "lucide-react";
import { useEffect, useState } from "react";
import { useProduct } from "./ProductContext";

function formatTimer(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function formatBRL(value: number) {
  return value.toFixed(2).replace(".", ",");
}

// 8 horas, 16 minutos e 34 segundos como na referência visual
const INITIAL_SECONDS = 8 * 3600 + 16 * 60 + 34;

export function PriceBanner() {
  const product = useProduct();
  const [seconds, setSeconds] = useState(INITIAL_SECONDS);

  useEffect(() => {
    const endsAt = Date.now() + INITIAL_SECONDS * 1000;
    const tick = () => {
      const remaining = Math.max(0, Math.round((endsAt - Date.now()) / 1000));
      setSeconds(remaining);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const [priceInt, priceDec] = product.price.toFixed(2).split(".");

  return (
    <div className="flex items-center justify-between gap-2 bg-gradient-to-r from-[#ff5500] via-[#ff5a1f] to-[#ff6728] px-3 py-2.5 text-white shadow-sm">
      {/* Lado Esquerdo: Badge -% + Preço Grande + Preço Antigo */}
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1.5">
          <span className="shrink-0 rounded-[4px] bg-white px-1.5 py-0.5 text-xs font-black text-[#ff5500] leading-tight shadow-sm">
            -{product.discount}%
          </span>
          <div className="flex items-baseline">
            <span className="text-xs font-bold text-white/95 mr-0.5">R$</span>
            <span className="text-[28px] font-black leading-none tracking-tight text-white">
              {priceInt}
            </span>
            <span className="text-sm font-bold leading-none text-white/95">
              ,{priceDec}
            </span>
            <Ticket className="ml-1.5 h-3.5 w-3.5 shrink-0 text-white/90" />
          </div>
        </div>
        <div className="mt-0.5 text-[11px] font-medium text-white/80 line-through">
          R$ {formatBRL(product.oldPrice)}
        </div>
      </div>

      {/* Lado Direito: Oferta Relâmpago + Cronômetro */}
      <div className="flex shrink-0 flex-col items-end text-right">
        <div className="flex items-center gap-1 text-xs font-extrabold text-white tracking-wide">
          <Zap className="h-3.5 w-3.5 fill-white text-white" />
          <span>Oferta Relâmpago</span>
        </div>
        <div className="mt-0.5 whitespace-nowrap text-[11px] text-white/90">
          Termina em <span className="font-bold tabular-nums text-white">{formatTimer(seconds)}</span>
        </div>
      </div>
    </div>
  );
}
