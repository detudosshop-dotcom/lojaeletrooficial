import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Truck, Mail, ShieldCheck } from "lucide-react";
import { useCheckoutData } from "@/lib/checkout-store";
import { storeConfig, warrantyLabel } from "@/lib/store-config";

export const Route = createFileRoute("/checkout/sucesso")({
  component: SucessoPage,
  head: () => ({ meta: [{ title: "Pagamento confirmado" }] }),
});

function SucessoPage() {
  const delivery = useCheckoutData();
  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col bg-muted">
      <div className="flex flex-1 flex-col gap-2 pb-8">
        <section className="bg-card px-4 pt-10 pb-6 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-success/15">
            <CheckCircle2 className="h-12 w-12 text-success" strokeWidth={2.5} />
          </div>
          <h1 className="mt-4 text-xl font-bold text-foreground">
            Pagamento confirmado!
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Recebemos seu Pix com sucesso. Seu pedido já está sendo separado.
          </p>
        </section>

        <section className="bg-card px-4 py-4">
          <h2 className="mb-3 text-sm font-semibold text-foreground">O que acontece agora</h2>
          <ol className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-success/15 text-xs font-bold text-success">1</div>
              <div>
                <p className="text-xs font-semibold text-foreground">Confirmação por e-mail</p>
                <p className="text-[11px] text-muted-foreground">Enviado para {delivery.email || "seu e-mail"} em alguns minutos.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">2</div>
              <div>
                <p className="text-xs font-semibold text-foreground">Despacho em até 24h úteis</p>
                <p className="text-[11px] text-muted-foreground">Seu produto sai do nosso CD e você recebe o código de rastreio.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">3</div>
              <div>
                <p className="text-xs font-semibold text-foreground">Entrega rastreada</p>
                <p className="text-[11px] text-muted-foreground">Acompanhe direto no seu e-mail até chegar na sua casa.</p>
              </div>
            </li>
          </ol>
        </section>

        <section className="bg-card px-4 py-4 text-xs text-muted-foreground">
          <p className="mb-1 flex items-center gap-1.5 font-medium text-foreground">
            <Truck className="h-4 w-4 text-primary" /> Endereço de entrega
          </p>
          <p>{delivery.fullName || "—"}</p>
          <p>
            {delivery.street}
            {delivery.number ? `, ${delivery.number}` : ""}
            {delivery.complement ? ` — ${delivery.complement}` : ""}
          </p>
          <p>
            {delivery.neighborhood}
            {delivery.city ? ` — ${delivery.city}/${delivery.state}` : ""}
          </p>
          <p>CEP {delivery.cep}</p>
        </section>

        <section className="bg-card px-4 py-4">
          <div className="flex items-start gap-3 rounded-md bg-success/5 p-3">
            <ShieldCheck className="h-5 w-5 shrink-0 text-success" />
            <div>
              <p className="text-xs font-semibold text-foreground">Compra protegida</p>
              <p className="text-[11px] leading-relaxed text-muted-foreground">
                Você tem 7 dias para troca ou devolução conforme o CDC. Garantia do fabricante: 12 meses.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-card px-4 py-4">
          <div className="flex items-start gap-3">
            <Mail className="h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="text-xs font-semibold text-foreground">Não recebeu o e-mail?</p>
              <p className="text-[11px] leading-relaxed text-muted-foreground">
                Verifique sua caixa de spam ou nos chame no chat — respondemos em até 1 hora.
              </p>
            </div>
          </div>
        </section>

        <div className="px-4 pt-2">
          <Link
            to="/loja"
            className="block w-full rounded-md bg-primary py-3 text-center text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            Continuar comprando
          </Link>
        </div>
      </div>
    </div>
  );
}
