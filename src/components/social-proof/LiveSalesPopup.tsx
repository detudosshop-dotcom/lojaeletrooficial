import { useEffect, useState } from "react";
import { CheckCircle2, X } from "lucide-react";
import { getProductBySlug, MAIN_PRODUCT_SLUG, type Product } from "@/lib/catalog";
import { useActiveProductSlug } from "@/lib/active-product-store";

const NAMES = [
  "Maria S.", "João P.", "Ana C.", "Carlos M.", "Fernanda L.", "Pedro H.",
  "Juliana R.", "Lucas A.", "Patrícia G.", "Rafael T.", "Camila B.", "Diego F.",
  "Beatriz N.", "Ricardo V.", "Larissa O.", "Marcos D.", "Tatiane S.", "Bruno K.",
  "Aline M.", "Gustavo C.", "Simone A.", "Eduardo P.", "Vanessa L.", "Felipe R.",
];

const CITIES = [
  "São Paulo - SP", "Rio de Janeiro - RJ", "Belo Horizonte - MG", "Curitiba - PR",
  "Porto Alegre - RS", "Salvador - BA", "Fortaleza - CE", "Recife - PE",
  "Brasília - DF", "Goiânia - GO", "Manaus - AM", "Belém - PA",
  "Florianópolis - SC", "Vitória - ES", "Campinas - SP", "Natal - RN",
  "São Luís - MA", "Maceió - AL", "João Pessoa - PB", "Cuiabá - MT",
];

const TIMES = [
  "agora mesmo", "há 1 minuto", "há 2 minutos", "há 4 minutos",
  "há 7 minutos", "há 12 minutos", "há 18 minutos",
];

type Sale = {
  name: string;
  city: string;
  product: { name: string; image: string; shortName: string };
  time: string;
};

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function buildSale(product: Product): Sale {
  return {
    name: pick(NAMES),
    city: pick(CITIES),
    product: { name: product.name, image: product.images[0], shortName: product.shortName },
    time: pick(TIMES),
  };
}

export function LiveSalesPopup() {
  const slug = useActiveProductSlug();
  const product = getProductBySlug(slug) ?? getProductBySlug(MAIN_PRODUCT_SLUG)!;

  const [sale, setSale] = useState<Sale | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let mounted = true;
    let showTimer: ReturnType<typeof setTimeout>;
    let hideTimer: ReturnType<typeof setTimeout>;
    let cycleTimer: ReturnType<typeof setTimeout>;

    function cycle() {
      if (!mounted) return;
      setSale(buildSale(product));
      setVisible(true);
      hideTimer = setTimeout(() => {
        if (!mounted) return;
        setVisible(false);
        cycleTimer = setTimeout(cycle, 12_000 + Math.random() * 13_000);
      }, 5_500);
    }

    showTimer = setTimeout(cycle, 8_000);

    return () => {
      mounted = false;
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      clearTimeout(cycleTimer);
    };
  }, [product]);

  if (!sale) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed left-3 z-[55] max-w-[280px] transition-all duration-500 sm:left-4 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-2 opacity-0"
      }`}
      style={{
        bottom: "calc(5.5rem + env(safe-area-inset-bottom))",
      }}
    >
      <div className="flex items-center gap-2.5 rounded-xl border border-border bg-card/95 p-2.5 shadow-lg backdrop-blur-sm">
        <div className="relative shrink-0">
          <img
            src={sale.product.image}
            alt=""
            className="h-11 w-11 rounded-md border border-border object-contain"
          />
          <CheckCircle2 className="absolute -bottom-1 -right-1 h-4 w-4 fill-success text-success-foreground" />
        </div>
        <div className="min-w-0 flex-1 leading-tight">
          <p className="text-[11px] font-semibold text-foreground">
            {sale.name} · {sale.city}
          </p>
          <p className="truncate text-[11px] text-muted-foreground">
            comprou {sale.product.shortName}
          </p>
          <p className="text-[10px] font-medium text-success">{sale.time}</p>
        </div>
        <button
          type="button"
          aria-label="Fechar notificação"
          onClick={() => setVisible(false)}
          className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <X className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}
