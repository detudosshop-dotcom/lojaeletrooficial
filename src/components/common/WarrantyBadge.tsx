import { ShieldCheck, BadgeCheck } from "lucide-react";

type Variant = "banner" | "compact" | "inline";

export function WarrantyBadge({ variant = "banner" }: { variant?: Variant }) {
  if (variant === "inline") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-[11px] font-semibold text-success">
        <ShieldCheck className="h-3 w-3" />
        Garantia de 1 ano
      </span>
    );
  }

  if (variant === "compact") {
    return (
      <div className="flex items-center gap-2 rounded-md border border-success/30 bg-success/5 px-3 py-2">
        <ShieldCheck className="h-4 w-4 shrink-0 text-success" />
        <div className="leading-tight">
          <p className="text-xs font-bold text-success">Garantia de 1 ano</p>
          <p className="text-[10px] text-muted-foreground">
            Direto com o fabricante contra defeitos
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-md border-2 border-success/30 bg-success/5 p-3">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-success/15">
          <ShieldCheck className="h-5 w-5 text-success" />
        </div>
        <div className="flex-1">
          <p className="flex items-center gap-1.5 text-sm font-bold text-success">
            Garantia de 1 ano
            <BadgeCheck className="h-3.5 w-3.5" />
          </p>
          <p className="mt-0.5 text-[11px] leading-relaxed text-foreground">
            Cobertura completa contra defeitos de fabricação por{" "}
            <span className="font-semibold">12 meses</span>, direto com o fabricante.
            Troca ou reparo sem custo adicional.
          </p>
        </div>
      </div>
    </div>
  );
}
