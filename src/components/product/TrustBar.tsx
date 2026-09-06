import {
  ShieldCheck,
  Lock,
  Truck,
  RefreshCcw,
  HeadphonesIcon,
  BadgeCheck,
  Award,
  Building2,
} from "lucide-react";

export function TrustBar() {
  return (
    <section className="space-y-4 bg-card px-4 py-5">
      <h2 className="text-base font-semibold text-foreground">
        Compre com segurança
      </h2>

      {/* Faixa de ambiente seguro */}
      <div className="flex items-center justify-center gap-2 rounded-md bg-success/10 px-3 py-2.5 text-success">
        <Lock className="h-4 w-4" />
        <span className="text-xs font-semibold">
          Ambiente 100% seguro · SSL 256 bits · LGPD
        </span>
      </div>

      {/* Grid de garantias */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col items-center gap-1.5 rounded-md border border-border p-3 text-center">
          <ShieldCheck className="h-5 w-5 text-success" />
          <p className="text-[11px] font-semibold leading-tight text-foreground">
            Compra protegida
          </p>
          <p className="text-[10px] leading-tight text-muted-foreground">
            Reembolso garantido se algo der errado
          </p>
        </div>
        <div className="flex flex-col items-center gap-1.5 rounded-md border border-border p-3 text-center">
          <Truck className="h-5 w-5 text-primary" />
          <p className="text-[11px] font-semibold leading-tight text-foreground">
            Envio rastreado
          </p>
          <p className="text-[10px] leading-tight text-muted-foreground">
            Acompanhe seu pedido em tempo real
          </p>
        </div>
        <div className="flex flex-col items-center gap-1.5 rounded-md border-2 border-success/40 bg-success/5 p-3 text-center">
          <ShieldCheck className="h-5 w-5 text-success" />
          <p className="text-[11px] font-bold leading-tight text-success">
            Garantia de 1 ano
          </p>
          <p className="text-[10px] leading-tight text-muted-foreground">
            Cobertura completa do fabricante por 12 meses
          </p>
        </div>
        <div className="flex flex-col items-center gap-1.5 rounded-md border border-border p-3 text-center">
          <RefreshCcw className="h-5 w-5 text-primary" />
          <p className="text-[11px] font-semibold leading-tight text-foreground">
            7 dias para troca
          </p>
          <p className="text-[10px] leading-tight text-muted-foreground">
            Devolução grátis conforme CDC
          </p>
        </div>
      </div>

      {/* Bloco institucional */}
      <div className="rounded-md border border-border bg-muted/40 p-3">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <Building2 className="h-4 w-4 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">
              +8 anos no mercado
            </p>
            <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">
              Loja oficial com mais de 12 mil pedidos entregues em todo o Brasil.
              Empresa registrada com CNPJ ativo.
            </p>
          </div>
        </div>
      </div>

      {/* Suporte humano */}
      <div className="rounded-md border border-border bg-muted/40 p-3">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-success/10">
            <HeadphonesIcon className="h-4 w-4 text-success" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">
              Suporte humano de verdade
            </p>
            <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">
              Atendimento de segunda a sábado, 8h às 20h, via WhatsApp e e-mail
              com resposta em até 1 hora.
            </p>
          </div>
        </div>
      </div>

      {/* Selos rápidos */}
      <ul className="grid grid-cols-1 gap-1.5 text-[11px] text-muted-foreground">
        <li className="flex items-center gap-1.5">
          <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-success" />
          Pagamento processado pelo SPI do Banco Central
        </li>
        <li className="flex items-center gap-1.5">
          <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-success" />
          Pagamento 100% seguro via Pix oficial do Banco Central
        </li>
        <li className="flex items-center gap-1.5">
          <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-success" />
          Nota fiscal eletrônica enviada por e-mail
        </li>
      </ul>
    </section>
  );
}
