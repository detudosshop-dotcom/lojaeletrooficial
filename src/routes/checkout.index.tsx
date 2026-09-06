import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ShieldCheck, Lock, Truck, HeadphonesIcon, BadgeCheck, Zap, Minus, Plus } from "lucide-react";
import { brl, computeOrderTotals, EXPRESS_SHIPPING_PRICE } from "@/lib/pricing";
import { storeConfig, warrantyLabel, returnLabel } from "@/lib/store-config";
import { getPixDiscount, useCouponApplied } from "@/lib/coupon-store";
import { checkoutStore, useCheckoutData } from "@/lib/checkout-store";
import { CheckoutSteps } from "@/components/checkout/CheckoutSteps";
import { WarrantyBadge } from "@/components/common/WarrantyBadge";
import { DeliveryDateBadge } from "@/components/common/DeliveryDateBadge";
import { useDeliveryDate } from "@/lib/delivery-date";

import { ttqTrack } from "@/lib/ttq";
import { useActiveProductSlug } from "@/lib/active-product-store";
import { getProductBySlug, MAIN_PRODUCT_SLUG } from "@/lib/catalog";

export const Route = createFileRoute("/checkout/")({
  component: Checkout,
  head: () => ({
    meta: [{ title: "Resumo do pedido" }],
  }),
});

function Checkout() {
  const { shipping, voltage, color, quantity } = useCheckoutData();
  const setShipping = (s: "normal" | "expresso") => checkoutStore.set({ shipping: s });
  const setQuantity = (q: number) => checkoutStore.set({ quantity: Math.max(1, Math.min(99, q)) });

  const slug = useActiveProductSlug();
  const product = getProductBySlug(slug) ?? getProductBySlug(MAIN_PRODUCT_SLUG)!;
  const delivery = useDeliveryDate();
  const deliveryExpress = useDeliveryDate(storeConfig.shipping.expressDeliveryDays);

  const showVoltage = (product.voltageOptions?.length ?? 0) > 0;
  const colorOptions = product.colorOptions ?? [];
  const showColor = colorOptions.length > 0;
  const selectedColor = colorOptions.find((c) => c.label === color) ?? colorOptions[0];
  const productImage = selectedColor?.images[0] ?? product.images[0];

  const qty = quantity || 1;
  const couponApplied = useCouponApplied();
  const totals = computeOrderTotals({
    unitPrice: product.price,
    unitOldPrice: product.oldPrice,
    quantity: qty,
    express: shipping === "expresso",
    pixDiscountRate: getPixDiscount(couponApplied),
  });
  const total = totals.totalCents / 100;
  const discountPct = Math.round(totals.pixDiscountRate * 100);

  useEffect(() => {
    ttqTrack("InitiateCheckout", {
      content_id: product.id,
      content_type: "product",
      content_name: product.name,
      currency: "BRL",
      value: totals.totalCents / 100,
      quantity: qty,
    });
  }, [product.id, product.name, totals.totalCents, qty]);

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col bg-muted">
      <header className="sticky top-0 z-40 flex items-center gap-2 bg-background px-3 py-3 shadow-sm">
        <Link
          to={slug === MAIN_PRODUCT_SLUG ? "/" : "/produto/$slug"}
          params={slug === MAIN_PRODUCT_SLUG ? undefined : { slug }}
          aria-label="Voltar"
          className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-muted"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="flex-1 text-center text-base font-semibold">Resumo do pedido</h1>
        <div className="w-9" />
      </header>

      <main
        className="flex flex-1 flex-col gap-2"
        style={{ paddingBottom: "calc(6rem + env(safe-area-inset-bottom))" }}
      >
        <CheckoutSteps current={1} />

        <DeliveryDateBadge />


        {/* Destaque Pix com 5% off */}
        <section className="bg-card px-4 py-3">
          <div className="flex items-center justify-between rounded-md border-2 border-success/40 bg-success/5 p-3">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-success/15">
                <Zap className="h-4 w-4 fill-success text-success" />
              </div>
              <div className="leading-tight">
                <p className="text-xs font-bold text-success">Pague no Pix e ganhe {discountPct}% OFF</p>
                <p className="text-[11px] text-muted-foreground">
                  Aprovação na hora · Economize {brl(totals.pixDiscountCents)}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-muted-foreground line-through">
                {brl(totals.totalCents)}
              </p>
              <p className="text-base font-bold text-success">
                {brl(totals.pixTotalCents)}
              </p>
            </div>
          </div>
        </section>

        {/* Faixa de confiança no topo */}
        <section className="bg-card px-4 pt-3 pb-3">
          <div className="flex items-center justify-center gap-2 rounded-md bg-success/10 px-3 py-2 text-success">
            <Lock className="h-4 w-4" />
            <span className="text-xs font-semibold">
              {storeConfig.security.sslLabel} · {storeConfig.security.lgpdLabel}
            </span>
          </div>

          <p className="mt-3 text-center text-[11px] leading-relaxed text-muted-foreground">
            {storeConfig.shipping.handlingLabel} · {storeConfig.shipping.trackingLabel}
          </p>
        </section>

        {/* Produto */}
        <section className="flex gap-3 bg-card px-4 py-4">
          <img
            src={productImage}
            alt={product.name}
            className="h-20 w-20 rounded-md border border-border object-contain"
          />
          <div className="flex-1">
            <p className="line-clamp-2 text-sm text-foreground">
              {product.name}
            </p>
            {showVoltage && (
              <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                <span>Voltagem:</span>
                <span className="rounded border border-primary/30 bg-primary/5 px-1.5 py-0.5 text-[11px] font-semibold text-primary">
                  {voltage}
                </span>
              </div>
            )}
            {showColor && selectedColor && (
              <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                <span>{product.colorOptionsLabel ?? "Cor"}:</span>
                <span className="rounded border border-primary/30 bg-primary/5 px-1.5 py-0.5 text-[11px] font-semibold text-primary">
                  {selectedColor.label}
                </span>
              </div>
            )}
            <div className="mt-2 flex items-center justify-between gap-2">
              <p className="text-base font-bold text-price">
                {brl(totals.unitCents)}
              </p>
              <div className="flex items-center gap-1.5 rounded-full border border-border bg-background p-0.5">
                <button
                  type="button"
                  onClick={() => setQuantity(qty - 1)}
                  disabled={qty <= 1}
                  aria-label="Diminuir quantidade"
                  className="flex h-7 w-7 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted disabled:opacity-40"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="min-w-[1.5rem] text-center text-sm font-semibold tabular-nums">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(qty + 1)}
                  aria-label="Aumentar quantidade"
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity hover:opacity-90"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Frete */}
        <section className="bg-card px-4 py-4">
          <h2 className="mb-3 text-sm font-semibold">Frete</h2>
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => setShipping("normal")}
              className="flex w-full items-center justify-between text-left"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                    shipping === "normal" ? "border-primary" : "border-border"
                  }`}
                >
                  {shipping === "normal" && (
                    <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                  )}
                </span>
                <div>
                  <div className="text-sm font-medium">Frete</div>
                  <div className="text-xs">
                    Chega até <span className="font-bold text-success">{delivery.short}</span>
                  </div>
                </div>

              </div>
              <span className="text-sm font-semibold text-success">Grátis</span>
            </button>

            <button
              type="button"
              onClick={() => setShipping("expresso")}
              className="flex w-full items-center justify-between text-left"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                    shipping === "expresso" ? "border-primary" : "border-border"
                  }`}
                >
                  {shipping === "expresso" && (
                    <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                  )}
                </span>
                <div>
                  <div className="text-sm font-medium">Frete Expresso</div>
                  <div className="text-xs">
                    Chega até <span className="font-bold text-success">{deliveryExpress.short}</span>
                  </div>
                </div>

              </div>
              <span className="text-sm font-medium">{brl(totals.shippingCents || Math.round(EXPRESS_SHIPPING_PRICE * 100))}</span>
            </button>
          </div>
        </section>

        {/* Resumo */}
        <section className="bg-card px-4 py-4">
          <h2 className="mb-3 text-sm font-semibold">Resumo do pedido</h2>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">
                Subtotal {qty > 1 && <span className="text-xs">({qty}x)</span>}
              </dt>
              <dd>{brl(totals.subtotalOldCents)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-success">Descontos</dt>
              <dd className="text-success">-{brl(totals.catalogDiscountCents)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Frete</dt>
              <dd className={shipping === "normal" ? "text-success" : ""}>
                {shipping === "normal" ? "Grátis" : brl(totals.shippingCents)}
              </dd>
            </div>
            <div className="mt-2 flex justify-between border-t border-border pt-3">
              <dt className="text-base font-semibold">Total</dt>
              <dd className="text-base font-bold text-price">
                {brl(totals.totalCents)}
              </dd>
            </div>
          </dl>
        </section>

        <section className="flex items-center justify-between bg-card px-4 py-4">
          <span className="text-sm font-semibold">Total ({qty} {qty === 1 ? "item" : "itens"})</span>
          <span className="text-lg font-bold text-price">
            {brl(totals.totalCents)}
          </span>
        </section>

        {/* Faixa de ambiente seguro */}
        <section className="bg-card px-4 py-3">
          <div className="flex items-center justify-center gap-2 rounded-md bg-success/10 px-3 py-2.5 text-success">
            <Lock className="h-4 w-4" />
            <span className="text-xs font-semibold">{storeConfig.security.sslLabel}</span>
          </div>
        </section>

        {/* Garantia de 1 ano */}
        <section className="bg-card px-4 py-3">
          <WarrantyBadge variant="banner" />
        </section>

        {/* Selos de garantia */}
        <section className="bg-card px-4 py-4">
          <h2 className="mb-3 text-sm font-semibold">Por que comprar com a gente</h2>
          <div className="grid grid-cols-2 gap-3">
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
              <Zap className="h-5 w-5 fill-success text-success" />
              <p className="text-[11px] font-semibold leading-tight text-foreground">
                Pagamento via Pix
              </p>
              <p className="text-[10px] leading-tight text-muted-foreground">
                Aprovação imediata e 5% de desconto
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

        {/* Proteção de dados */}
        <section className="bg-card px-4 py-4">
          <h3 className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-foreground">
            <Lock className="h-3.5 w-3.5 text-success" /> Seus dados estão protegidos
          </h3>
          <ul className="space-y-1.5 text-[11px] leading-relaxed text-muted-foreground">
            <li className="flex gap-1.5">
              <BadgeCheck className="mt-0.5 h-3 w-3 shrink-0 text-success" />
              {storeConfig.security.sslLabel}
            </li>
            <li className="flex gap-1.5">
              <BadgeCheck className="mt-0.5 h-3 w-3 shrink-0 text-success" />
              {storeConfig.security.paymentLabel}
            </li>
            <li className="flex gap-1.5">
              <BadgeCheck className="mt-0.5 h-3 w-3 shrink-0 text-success" />
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
              <p className="text-xs font-semibold text-foreground">Atendimento ao cliente</p>
              <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">
                {storeConfig.support.hours} · {storeConfig.support.channels}.
              </p>
            </div>
          </div>
        </section>

        {/* Rodapé institucional */}
        <section className="px-4 pb-4 pt-1 text-center">
          <p className="text-[10px] leading-relaxed text-muted-foreground">
            Ao continuar você concorda com os Termos de Uso e Política de Privacidade.
          </p>
        </section>
      </main>

      {/* Botão fixo */}
      <div
        className="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-md border-t border-border bg-card p-3"
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      >
        <Link
          to="/checkout/endereco"
          className="flex w-full flex-col items-center justify-center rounded-full bg-[#fe2c55] hover:bg-[#e02449] px-4 py-3 text-white shadow-md shadow-[#fe2c55]/25 active:scale-[0.99] transition-all"
        >
          <span className="text-base font-bold leading-none">Fazer pedido</span>
          <span className="mt-1 text-[11px] text-white/90">
            Total {brl(totals.totalCents)} · {brl(totals.pixTotalCents)} no Pix
          </span>
        </Link>
      </div>
    </div>
  );
}
