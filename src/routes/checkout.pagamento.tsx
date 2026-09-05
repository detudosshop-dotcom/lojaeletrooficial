import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowLeft, Copy, Check, Loader2, ShieldCheck, Lock, CreditCard, Truck, RefreshCcw, HeadphonesIcon, Zap, BadgeCheck, Clock, Smartphone, Building2, ScanLine, CheckCircle2 } from "lucide-react";
import QRCode from "qrcode";
import { useCheckoutData } from "@/lib/checkout-store";
import { createPixTransaction, getPixStatus } from "@/lib/flevopay.functions";
import { sendUtmifyOrder } from "@/lib/utmify.functions";
import { getTracking } from "@/lib/utm-store";
import { CheckoutSteps } from "@/components/checkout/CheckoutSteps";
import { WarrantyBadge } from "@/components/common/WarrantyBadge";
import { DeliveryDateBadge } from "@/components/common/DeliveryDateBadge";


import { couponStore, useCouponApplied, getPixDiscount } from "@/lib/coupon-store";
import { ttqTrack } from "@/lib/ttq";
import { useActiveProductSlug } from "@/lib/active-product-store";
import { getProductBySlug, MAIN_PRODUCT_SLUG } from "@/lib/catalog";
import { brl, computeOrderTotals } from "@/lib/pricing";
import { storeConfig, warrantyLabel } from "@/lib/store-config";

export const Route = createFileRoute("/checkout/pagamento")({
  component: PagamentoPage,
  head: () => ({ meta: [{ title: "Pagamento" }] }),
});

const PIX_EXPIRATION_SECONDS = 15 * 60;

function formatUtmifyDate(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())} ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}`;
}

type UtmifyOrderSnapshot = {
  orderId: string;
  products: Array<{
    id: string;
    name: string;
    planId: null;
    planName: null;
    quantity: number;
    priceInCents: number;
  }>;
  tracking: ReturnType<typeof getTracking>;
  createdAt: string;
  totalCents: number;
};

function PagamentoPage() {
  const delivery = useCheckoutData();
  const navigate = useNavigate();
  const createPix = useServerFn(createPixTransaction);
  const checkStatus = useServerFn(getPixStatus);
  const sendUtmify = useServerFn(sendUtmifyOrder);
  const couponApplied = useCouponApplied();
  const pixDiscount = getPixDiscount(couponApplied);

  const slug = useActiveProductSlug();
  const product = getProductBySlug(slug) ?? getProductBySlug(MAIN_PRODUCT_SLUG)!;
  const quantity = delivery.quantity || 1;
  const totals = computeOrderTotals({
    unitPrice: product.price,
    unitOldPrice: product.oldPrice,
    quantity,
    express: delivery.shipping === "expresso",
    pixDiscountRate: pixDiscount,
  });
  const shippingCents = totals.shippingCents;
  const fullAmountCents = totals.totalCents;
  // Valor unitário com desconto Pix arredondado uma única vez, para que a soma
  // enviada ao gateway seja EXATAMENTE o valor exibido ao cliente.
  const pixUnitCents = Math.round((totals.pixTotalCents - shippingCents) / quantity);
  const amountCents = pixUnitCents * quantity + shippingCents;
  const economiaCents = fullAmountCents - amountCents;
  const discountPct = Math.round(totals.pixDiscountRate * 100);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pixCode, setPixCode] = useState<string | null>(null);
  const [pixImage, setPixImage] = useState<string | null>(null);
  const [transactionId, setTransactionId] = useState<string | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(PIX_EXPIRATION_SECONDS);
  const [expired, setExpired] = useState(false);
  const [paid, setPaid] = useState(false);
  const [copied, setCopied] = useState(false);
  const startedRef = useRef(false);
  const utmifyOrderRef = useRef<UtmifyOrderSnapshot | null>(null);
  const utmifyPaidRef = useRef(false);

  const hasDelivery = Boolean(delivery.fullName && delivery.cpf && delivery.email);

  useEffect(() => {
    if (startedRef.current) return;
    if (!hasDelivery) {
      setLoading(false);
      setError("Preencha o endereço de entrega antes de continuar.");
      return;
    }
    startedRef.current = true;

    (async () => {
      try {
        // Aplica o desconto Pix no preço unitário do produto pra bater com `amount`
        const productUnitPrice = pixUnitCents;
        const gatewayAmount = amountCents;
        const provisionalOrderId = `order_${Date.now()}`;
        const productUnitForUtmify = productUnitPrice;
        const utmifyProductsForSnapshot = [
          {
            id: product.id,
            name: product.shortName,
            planId: null,
            planName: null,
            quantity,
            priceInCents: productUnitForUtmify,
          },
          ...(shippingCents > 0
            ? [
                {
                  id: "frete-expresso",
                  name: "Frete Expresso",
                  planId: null,
                  planName: null,
                  quantity: 1,
                  priceInCents: shippingCents,
                },
              ]
            : []),
        ];
        const trackingSnapshot = getTracking();
        const result = await createPix({
          data: {
            amount: gatewayAmount,
            customer: {
              name: delivery.fullName,
              email: delivery.email,
              phone: delivery.phone,
              document: delivery.cpf,
            },
            shipping: {
              street: delivery.street,
              number: delivery.number,
              complement: delivery.complement,
              neighborhood: delivery.neighborhood,
              city: delivery.city,
              state: delivery.state,
              zipCode: delivery.cep,
            },
            items: [
              {
                title: `${product.shortName}${pixDiscount > 0 ? ` (${discountPct}% OFF Pix)` : ""}`,
                quantity,
                unitPrice: productUnitPrice,
                tangible: true,
              },
              ...(shippingCents > 0
                ? [
                    {
                      title: "Frete Expresso",
                      quantity: 1,
                      unitPrice: shippingCents,
                      tangible: false,
                    },
                  ]
                : []),
            ],
            utmify: {
              orderId: provisionalOrderId,
              products: utmifyProductsForSnapshot,
              tracking: trackingSnapshot as Record<string, unknown>,
              customer: {
                name: delivery.fullName,
                email: delivery.email,
                phone: delivery.phone.replace(/\D+/g, ""),
                document: delivery.cpf.replace(/\D+/g, ""),
                country: "BR",
              },
            },
          },
        });

        if (!result.ok || !result.qrCode) {
          setError(result.error ?? "Não foi possível gerar o Pix.");
          return;
        }

        setPixCode(result.qrCode);
        if (result.transactionId) setTransactionId(result.transactionId);

        // Dispara Purchase no TikTok Pixel ao gerar o Pix
        ttqTrack("Purchase", {
          content_id: product.id,
          content_type: "product",
          content_name: product.name,
          currency: "BRL",
          value: gatewayAmount / 100,
        });

        // Envia pedido para Utmify (waiting_payment)
        const orderId = result.transactionId?.split("__")[0] ?? provisionalOrderId;
        const utmifyProducts = utmifyProductsForSnapshot;
        // Atualiza order_id no banco caso transactionId tenha vindo
        if (result.transactionId && orderId !== provisionalOrderId) {
          // best-effort: backend já gravou com transactionId como chave
        }
        utmifyOrderRef.current = {
          orderId,
          products: utmifyProducts,
          tracking: getTracking(),
          createdAt: formatUtmifyDate(new Date()),
          totalCents: gatewayAmount,
        };
        try {
          const utmifyResult = await sendUtmify({
            data: {
              orderId,
              status: "waiting_payment",
              createdAt: utmifyOrderRef.current.createdAt,
              approvedDate: null,
              refundedAt: null,
              customer: {
                name: delivery.fullName,
                email: delivery.email,
                phone: delivery.phone.replace(/\D+/g, ""),
                document: delivery.cpf.replace(/\D+/g, ""),
                country: "BR",
              },
              products: utmifyProducts,
              trackingParameters: utmifyOrderRef.current.tracking,
              commission: {
                totalPriceInCents: gatewayAmount,
                gatewayFeeInCents: 0,
                userCommissionInCents: gatewayAmount,
                currency: "BRL",
              },
              isTest: false,
            },
          });
          if (!utmifyResult.ok) {
            console.error("Utmify (waiting_payment) rejeitou evento:", utmifyResult.error);
          }
        } catch (err) {
          console.warn("Utmify (waiting_payment) falhou", err);
        }

        // Só usamos a imagem do gateway se for um data URL (base64).
        // URLs externas frequentemente são bloqueadas (CORS/hotlink),
        // então geramos o QR localmente a partir do código copia-e-cola.
        if (result.qrCodeImage && result.qrCodeImage.startsWith("data:")) {
          setPixImage(result.qrCodeImage);
        } else {
          const dataUrl = await QRCode.toDataURL(result.qrCode, {
            margin: 1,
            width: 280,
          });
          setPixImage(dataUrl);
        }
      } catch (err) {
        console.error(err);
        setError("Erro ao se comunicar com o servidor.");
      } finally {
        setLoading(false);
      }
    })();
  }, [createPix, delivery, hasDelivery, amountCents]);

  // Se o cupom for aplicado depois do Pix gerado, regenera com novo valor
  const lastDiscountRef = useRef(pixDiscount);
  useEffect(() => {
    if (lastDiscountRef.current !== pixDiscount && !paid) {
      lastDiscountRef.current = pixDiscount;
      startedRef.current = false;
      setLoading(true);
      setPixCode(null);
      setPixImage(null);
      setTransactionId(null);
      setExpired(false);
      setSecondsLeft(PIX_EXPIRATION_SECONDS);
    }
  }, [pixDiscount, paid]);

  // Timer de expiração (15 min)
  useEffect(() => {
    if (!pixCode || paid || expired) return;
    if (secondsLeft <= 0) {
      setExpired(true);
      return;
    }
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [pixCode, paid, expired, secondsLeft]);

  // Polling do status do Pix a cada 4s
  useEffect(() => {
    if (!transactionId || paid || expired) return;
    let cancelled = false;

    async function poll() {
      if (!transactionId) return;
      try {
        const res = await checkStatus({ data: { transactionId } });
        if (cancelled) return;
        if (res.ok && res.status === "paid") {
          setPaid(true);
          // Notifica Utmify do pagamento aprovado
          if (!utmifyPaidRef.current && utmifyOrderRef.current) {
            utmifyPaidRef.current = true;
            const snap = utmifyOrderRef.current;
            try {
              const utmifyResult = await sendUtmify({
                data: {
                  orderId: snap.orderId,
                  status: "paid",
                  createdAt: snap.createdAt,
                  approvedDate: formatUtmifyDate(new Date()),
                  refundedAt: null,
                  customer: {
                    name: delivery.fullName,
                    email: delivery.email,
                    phone: delivery.phone.replace(/\D+/g, ""),
                    document: delivery.cpf.replace(/\D+/g, ""),
                    country: "BR",
                  },
                  products: snap.products,
                  trackingParameters: snap.tracking,
                  commission: {
                    totalPriceInCents: snap.totalCents,
                    gatewayFeeInCents: 0,
                    userCommissionInCents: snap.totalCents,
                    currency: "BRL",
                  },
                  isTest: false,
                },
              });
              if (!utmifyResult.ok) {
                utmifyPaidRef.current = false;
                console.error("Utmify (paid) rejeitou evento:", utmifyResult.error);
              }
            } catch (err) {
              console.warn("Utmify (paid) falhou", err);
            }
          }
          setTimeout(() => {
            window.location.href = "https://esteirashopingtk.shop/ups1/";
          }, 1500);
        } else if (res.ok && (res.status === "expired" || res.status === "failed")) {
          setExpired(true);
        }
      } catch (err) {
        console.warn("polling status falhou", err);
      }
    }

    const interval = setInterval(() => {
      void poll();
    }, 4000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [transactionId, paid, expired, checkStatus, navigate]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const timerLabel = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  const timerWarn = secondsLeft <= 60;

  const onCopy = async () => {
    if (!pixCode) return;
    let success = false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(pixCode);
        success = true;
      }
    } catch (err) {
      console.warn("clipboard API falhou, usando fallback", err);
    }

    if (!success) {
      try {
        const ta = document.createElement("textarea");
        ta.value = pixCode;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.top = "0";
        ta.style.left = "0";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        ta.setSelectionRange(0, pixCode.length);
        success = document.execCommand("copy");
        document.body.removeChild(ta);
      } catch (err) {
        console.error("fallback de cópia falhou", err);
      }
    }

    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else {
      setError("Não foi possível copiar automaticamente. Selecione e copie manualmente.");
    }
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col bg-muted">
      <header className="sticky top-0 z-40 flex items-center gap-2 bg-background px-3 py-3 shadow-sm">
        <Link
          to="/checkout/endereco"
          aria-label="Voltar"
          className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-muted"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="flex-1 text-center text-base font-semibold">Pagamento</h1>
        <div className="w-9" />
      </header>

      <div className="flex flex-1 flex-col gap-2 pb-6">
        <CheckoutSteps current={3} />

        <DeliveryDateBadge />


        {/* Banner desconto Pix */}
        <section className="bg-card px-4 py-3">
          <div className="flex items-center justify-between rounded-md border-2 border-success/40 bg-success/5 p-3">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-success/15">
                <Zap className="h-4 w-4 fill-success text-success" />
              </div>
              <div className="leading-tight">
                <p className="flex flex-wrap items-center gap-1 text-xs font-bold text-success">
                  {discountPct}% OFF aplicado no Pix
                  {couponApplied && (
                    <span className="rounded bg-success px-1.5 py-0.5 text-[9px] font-bold uppercase text-success-foreground">
                      Cupom FICAMAIS5
                    </span>
                  )}
                </p>
                <p className="flex items-center gap-1 text-[11px] text-muted-foreground">
                  <BadgeCheck className="h-3 w-3 text-success" />
                  Aprovação na hora
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-muted-foreground line-through">
                {brl(fullAmountCents)}
              </p>
              <p className="text-base font-bold text-success">
                {brl(amountCents)}
              </p>
            </div>
          </div>
          <p className="mt-2 text-center text-[11px] text-muted-foreground">
            Você economiza{" "}
            <span className="font-semibold text-success">
              {brl(economiaCents)}
            </span>{" "}
            pagando no Pix
          </p>
          <div className="mt-3">
            <WarrantyBadge variant="compact" />
          </div>
        </section>

        <section className="bg-card px-4 py-5 text-center">
          <p className="text-sm font-medium">Pague com Pix</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Valor a pagar: <span className="font-semibold text-foreground">
              {brl(amountCents)}
            </span>
            {shippingCents > 0 && (
              <span className="ml-1">(inclui frete expresso {brl(shippingCents)})</span>
            )}
          </p>

          {/* Banner de status do pagamento */}
          {!loading && pixCode && !paid && !expired && (
            <div
              className={`mx-auto mt-4 flex items-center justify-center gap-2 rounded-md border-2 px-3 py-2 ${
                timerWarn
                  ? "border-destructive/40 bg-destructive/5 text-destructive"
                  : "border-warning/40 bg-warning/5 text-warning-foreground"
              }`}
              style={timerWarn ? undefined : { borderColor: "hsl(38 92% 50% / 0.4)", backgroundColor: "hsl(38 92% 50% / 0.08)", color: "hsl(25 95% 35%)" }}
            >
              <Clock className={`h-4 w-4 ${timerWarn ? "animate-pulse" : ""}`} />
              <span className="text-xs font-semibold">
                Seu Pix expira em <span className="tabular-nums">{timerLabel}</span>
              </span>
            </div>
          )}

          {paid && (
            <div className="mx-auto mt-4 flex flex-col items-center gap-2 rounded-md border-2 border-success/40 bg-success/10 px-3 py-4 text-success">
              <CheckCircle2 className="h-10 w-10" />
              <p className="text-sm font-bold">Pagamento confirmado!</p>
              <p className="text-[11px] text-muted-foreground">Redirecionando...</p>
            </div>
          )}

          {expired && !paid && (
            <div className="mx-auto mt-4 rounded-md border-2 border-destructive/40 bg-destructive/5 px-3 py-3 text-destructive">
              <p className="text-xs font-semibold">Este Pix expirou.</p>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-2 rounded-md bg-destructive px-3 py-1.5 text-[11px] font-semibold text-destructive-foreground hover:opacity-90"
              >
                Gerar novo Pix
              </button>
            </div>
          )}

          {loading && (
            <div className="mt-6 flex flex-col items-center gap-2 text-muted-foreground">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-xs">Gerando QR Code...</p>
            </div>
          )}

          {!loading && pixImage && !paid && !expired && (
            <img
              src={pixImage}
              alt="QR Code Pix"
              className="mx-auto mt-4 h-64 w-64 rounded-md border border-border bg-background p-2"
            />
          )}

          {!loading && pixCode && !paid && !expired && (
            <div className="mt-5">
              <button
                type="button"
                onClick={onCopy}
                aria-label="Copiar código Pix"
                className={`flex w-full items-center justify-center gap-2 rounded-full px-4 py-3.5 text-base font-bold text-white shadow-lg transition active:scale-[0.98] ${
                  copied
                    ? "bg-[#00c853] shadow-[#00c853]/25"
                    : "bg-[#fe2c55] hover:bg-[#e02449] shadow-[#fe2c55]/25"
                }`}
              >
                {copied ? (
                  <>
                    <Check className="h-5 w-5" strokeWidth={3} />
                    Código copiado!
                  </>
                ) : (
                  <>
                    <Copy className="h-5 w-5" />
                    Copiar código Pix
                  </>
                )}
              </button>

              <p className="mt-2 text-center text-[11px] text-muted-foreground">
                Toque para copiar e cole no app do seu banco
              </p>

              <details className="mt-3">
                <summary className="cursor-pointer text-center text-[11px] text-muted-foreground underline underline-offset-2">
                  Ver código completo
                </summary>
                <input
                  readOnly
                  value={pixCode}
                  onFocus={(e) => e.currentTarget.select()}
                  className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-[11px] text-muted-foreground"
                />
              </details>

              {transactionId && (
                <div className="mt-4 flex items-center justify-center gap-1.5 rounded-md bg-muted px-3 py-2 text-[11px] text-muted-foreground">
                  <Loader2 className="h-3 w-3 animate-spin text-primary" />
                  Aguardando confirmação automática do pagamento...
                </div>
              )}
            </div>
          )}

          {error && (
            <p className="mt-4 text-xs text-destructive">{error}</p>
          )}
        </section>

        {/* Passo a passo de como pagar */}
        {!loading && pixCode && !paid && !expired && (
          <section className="bg-card px-4 py-4">
            <h3 className="mb-3 text-xs font-semibold text-foreground">
              Como pagar em 4 passos:
            </h3>
            <ol className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">1</div>
                <div className="flex-1">
                  <p className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                    <Smartphone className="h-3.5 w-3.5 text-primary" /> Abra o app do seu banco
                  </p>
                  <p className="text-[11px] leading-relaxed text-muted-foreground">
                    Nubank, Itaú, Bradesco, Caixa, PicPay — qualquer banco que tenha Pix.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">2</div>
                <div className="flex-1">
                  <p className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                    <Building2 className="h-3.5 w-3.5 text-primary" /> Acesse a área Pix
                  </p>
                  <p className="text-[11px] leading-relaxed text-muted-foreground">
                    Toque em <span className="font-semibold">Pix</span> e depois em{" "}
                    <span className="font-semibold">Pagar</span> ou{" "}
                    <span className="font-semibold">Pix Copia e Cola</span>.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">3</div>
                <div className="flex-1">
                  <p className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                    <ScanLine className="h-3.5 w-3.5 text-primary" /> Escaneie ou cole o código
                  </p>
                  <p className="text-[11px] leading-relaxed text-muted-foreground">
                    Aponte a câmera para o QR Code acima ou cole o Pix Copia e Cola.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-success/15 text-xs font-bold text-success">4</div>
                <div className="flex-1">
                  <p className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                    <BadgeCheck className="h-3.5 w-3.5 text-success" /> Confirme o pagamento
                  </p>
                  <p className="text-[11px] leading-relaxed text-muted-foreground">
                    Esta página detecta o pagamento automaticamente. Não feche o navegador.
                  </p>
                </div>
              </li>
            </ol>
          </section>
        )}


        <section className="bg-card px-4 py-4 text-xs text-muted-foreground">
          <p className="mb-1 flex items-center gap-1.5 font-medium text-foreground">
            <ShieldCheck className="h-4 w-4 text-success" /> Entregar para
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
          <div className="mt-3">
            <DeliveryDateBadge variant="compact" prefix="Receba até" />
          </div>
        </section>


        {/* Selos de confiança */}
        <section className="bg-card px-4 py-4">
          <div className="flex items-center justify-center gap-2 rounded-md bg-success/10 px-3 py-2.5 text-success">
            <Lock className="h-4 w-4" />
            <span className="text-xs font-semibold">{storeConfig.security.sslLabel}</span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="flex flex-col items-center gap-1.5 rounded-md border border-border p-3 text-center">
              <ShieldCheck className="h-5 w-5 text-success" />
              <p className="text-[11px] font-semibold leading-tight text-foreground">
                Compra protegida
              </p>
              <p className="text-[10px] leading-tight text-muted-foreground">
                Reembolso conforme a política de devolução
              </p>
            </div>
            <div className="flex flex-col items-center gap-1.5 rounded-md border border-border p-3 text-center">
              <CreditCard className="h-5 w-5 text-primary" />
              <p className="text-[11px] font-semibold leading-tight text-foreground">
                Pagamento Pix
              </p>
              <p className="text-[10px] leading-tight text-muted-foreground">
                Confirmação automática após o pagamento
              </p>
            </div>
            <div className="flex flex-col items-center gap-1.5 rounded-md border border-border p-3 text-center">
              <Truck className="h-5 w-5 text-primary" />
              <p className="text-[11px] font-semibold leading-tight text-foreground">
                Envio rastreado
              </p>
              <p className="text-[10px] leading-tight text-muted-foreground">
                {storeConfig.shipping.trackingLabel}
              </p>
            </div>
            <div className="flex flex-col items-center gap-1.5 rounded-md border-2 border-success/40 bg-success/5 p-3 text-center">
              <ShieldCheck className="h-5 w-5 text-success" />
              <p className="text-[11px] font-bold leading-tight text-success">
                {warrantyLabel()}
              </p>
              <p className="text-[10px] leading-tight text-muted-foreground">
                {storeConfig.policies.warrantyDescription}
              </p>
            </div>
          </div>
        </section>

        {/* Informações de segurança */}
        <section className="bg-card px-4 py-4">
          <h3 className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-foreground">
            <Lock className="h-3.5 w-3.5 text-success" /> Seus dados estão protegidos
          </h3>
          <ul className="space-y-1.5 text-[11px] leading-relaxed text-muted-foreground">
            <li className="flex gap-1.5">
              <Check className="mt-0.5 h-3 w-3 shrink-0 text-success" />
              {storeConfig.security.sslLabel}
            </li>
            <li className="flex gap-1.5">
              <Check className="mt-0.5 h-3 w-3 shrink-0 text-success" />
              {storeConfig.security.paymentLabel}
            </li>
            <li className="flex gap-1.5">
              <Check className="mt-0.5 h-3 w-3 shrink-0 text-success" />
              {storeConfig.policies.invoiceLabel}
            </li>
            <li className="flex gap-1.5">
              <Check className="mt-0.5 h-3 w-3 shrink-0 text-success" />
              {storeConfig.security.lgpdLabel}
            </li>
          </ul>
        </section>

        {/* Suporte */}
        <section className="bg-card px-4 py-4">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <HeadphonesIcon className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground">Precisa de ajuda?</p>
              <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">
                {storeConfig.support.hours} · {storeConfig.support.channels}.
              </p>
            </div>
          </div>
        </section>

        {/* Rodapé institucional */}
        <section className="px-4 py-3 text-center">
          <p className="text-[10px] leading-relaxed text-muted-foreground">
            Ao finalizar a compra você concorda com os Termos de Uso e Política de Privacidade.
          </p>
        </section>
      </div>

    </div>
  );
}
