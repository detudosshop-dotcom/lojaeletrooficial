import { storeConfig } from "@/lib/store-config";

/**
 * FONTE ÚNICA de cálculo monetário do app.
 *
 * Regra de arredondamento: todo dinheiro é convertido para centavos inteiros
 * (Math.round) no momento da entrada, e todos os cálculos (subtotal, frete,
 * desconto Pix, total) acontecem em centavos. Nenhuma tela pode recalcular
 * valores por conta própria — todas usam `computeOrderTotals`.
 */

export const PIX_DISCOUNT_RATE = storeConfig.pricing.pixDiscountRate;
export const EXPRESS_SHIPPING_PRICE = storeConfig.pricing.expressShippingPrice;

export function toCents(value: number): number {
  return Math.round(value * 100);
}

/** "67,90" */
export function formatCents(cents: number): string {
  return (cents / 100).toFixed(2).replace(".", ",");
}

/** "R$ 67,90" */
export function brl(cents: number): string {
  return `R$ ${formatCents(cents)}`;
}

/** Percentual de desconto derivado do preço atual x preço de referência. */
export function discountPercent(price: number, oldPrice: number): number {
  if (!oldPrice || oldPrice <= price) return 0;
  return Math.round((1 - price / oldPrice) * 100);
}

export type OrderTotals = {
  quantity: number;
  unitCents: number;
  unitOldCents: number;
  subtotalCents: number;
  subtotalOldCents: number;
  catalogDiscountCents: number;
  shippingCents: number;
  /** Total sem o desconto Pix. */
  totalCents: number;
  pixDiscountRate: number;
  pixDiscountCents: number;
  /** Valor final cobrado no Pix — é este que vai para o gateway. */
  pixTotalCents: number;
};

export function computeOrderTotals(params: {
  unitPrice: number;
  unitOldPrice?: number;
  quantity?: number;
  express?: boolean;
  pixDiscountRate?: number;
}): OrderTotals {
  const quantity = Math.max(1, Math.floor(params.quantity ?? 1));
  const unitCents = toCents(params.unitPrice);
  const unitOldCents = toCents(params.unitOldPrice ?? params.unitPrice);
  const subtotalCents = unitCents * quantity;
  const subtotalOldCents = unitOldCents * quantity;
  const shippingCents = params.express ? toCents(EXPRESS_SHIPPING_PRICE) : 0;
  const totalCents = subtotalCents + shippingCents;
  const pixDiscountRate = params.pixDiscountRate ?? PIX_DISCOUNT_RATE;
  const pixDiscountCents = Math.round(totalCents * pixDiscountRate);

  return {
    quantity,
    unitCents,
    unitOldCents,
    subtotalCents,
    subtotalOldCents,
    catalogDiscountCents: Math.max(0, subtotalOldCents - subtotalCents),
    shippingCents,
    totalCents,
    pixDiscountRate,
    pixDiscountCents,
    pixTotalCents: totalCents - pixDiscountCents,
  };
}
