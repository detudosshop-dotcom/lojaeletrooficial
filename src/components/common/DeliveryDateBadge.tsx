import { Truck, Zap } from "lucide-react";
import { useDeliveryDate } from "@/lib/delivery-date";
import { storeConfig } from "@/lib/store-config";

type Variant = "banner" | "inline" | "compact";

/**
 * Destaque do prazo de entrega — sempre 5 dias à frente da data atual,
 * recalculado quando o dia vira. Usado em todas as telas até o pagamento.
 */
export function DeliveryDateBadge({
  variant = "banner",
  prefix = "Receba até",
}: {
  variant?: Variant;
  prefix?: string;
}) {
  const { long, short } = useDeliveryDate();

  if (variant === "inline") {
    return (
      <span className="inline-flex items-center gap-1 font-semibold text-success">
        <Truck className="h-3.5 w-3.5" />
        {prefix} <span className="text-foreground">{short}</span>
      </span>
    );
  }

  if (variant === "compact") {
    return (
      <div className="flex items-center gap-2 rounded-md border border-success/40 bg-success/10 px-3 py-2">
        <Truck className="h-4 w-4 shrink-0 text-success" />
        <p className="text-xs leading-tight">
          <span className="font-bold text-success">{prefix}</span>{" "}
          <span className="font-semibold text-foreground">{short}</span>
          <span className="ml-1 text-muted-foreground">· Frete grátis</span>
        </p>
      </div>
    );
  }

  return (
    <div className="mx-4 flex items-center gap-3 rounded-lg border-2 border-success/40 bg-success/10 p-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-success/20">
        <Zap className="h-5 w-5 fill-success text-success" />
      </div>
      <div className="flex-1 leading-tight">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-success">
          Entrega expressa garantida
        </p>
        <p className="text-sm font-bold text-foreground">
          {prefix} <span className="text-success">{long}</span>
        </p>
        <p className="text-[11px] text-muted-foreground">
          Pedidos aprovados hoje são enviados em até 24h
        </p>
      </div>
    </div>
  );
}
