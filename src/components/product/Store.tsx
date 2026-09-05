import { Star } from "lucide-react";
import { Link } from "@tanstack/react-router";
import storeLogo from "@/assets/store-logo.jpg";

export function Store() {
  return (
    <section className="flex items-center gap-3 bg-card px-4 py-4">
      <img
        src={storeLogo}
        alt="Loja Eletro - Loja oficial de ferramentas"
        className="h-14 w-14 rounded-full border border-border object-cover"
        loading="lazy"
        width={56}
        height={56}
      />
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold">Loja Eletro</h3>
          <span className="flex items-center gap-1 text-xs text-success">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-success" />
            Online
          </span>
        </div>
        <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Star className="h-3 w-3 fill-star text-star" />
          <span className="font-medium text-foreground">4.98</span>
          <span>|</span>
          <span>+16 mil vendas</span>
          <span>|</span>
          <span>98% positivas</span>
        </div>
      </div>
      <Link
        to="/loja"
        className="rounded-full border border-primary px-4 py-1.5 text-xs font-semibold text-primary hover:bg-primary/5"
      >
        Visitar
      </Link>
    </section>
  );
}
