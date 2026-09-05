/**
 * Configuração real da loja — FONTE ÚNICA de políticas e promessas.
 *
 * IMPORTANTE: todos os valores abaixo devem refletir a operação real da loja.
 * Nenhuma tela deve escrever prazo, garantia, política ou preço "na mão":
 * tudo é lido daqui (ou de `src/lib/pricing.ts`, que também usa este arquivo).
 *
 * Campos com `null` significam "não informado / não confirmado" — a interface
 * simplesmente omite a informação em vez de afirmar algo que não é verificável.
 */

export type StoreConfig = {
  name: string;
  pricing: {
    /** Desconto aplicado a pagamentos via Pix (0.05 = 5%). */
    pixDiscountRate: number;
    /** Preço do frete expresso em reais. */
    expressShippingPrice: number;
  };
  shipping: {
    /** Prazo padrão de entrega, em dias, a partir da confirmação. */
    standardDeliveryDays: number;
    /** Prazo do frete expresso, em dias. */
    expressDeliveryDays: number;
    /** Texto do prazo de postagem/expedição. */
    handlingLabel: string;
    /** Envio com código de rastreio. */
    tracking: boolean;
    trackingLabel: string;
  };
  policies: {
    /** Meses de garantia contra defeito de fabricação. */
    warrantyMonths: number;
    warrantyDescription: string;
    /** Dias para devolução/arrependimento (CDC = 7). */
    returnDays: number;
    returnDescription: string;
    /** Emissão de nota fiscal eletrônica. */
    invoice: boolean;
    invoiceLabel: string;
  };
  support: {
    hours: string;
    channels: string;
    /** Tempo médio de resposta — null quando não há medição real. */
    responseTime: string | null;
  };
  security: {
    sslLabel: string;
    lgpdLabel: string;
    paymentLabel: string;
  };
  /** Métricas públicas só devem ser preenchidas com números reais e auditáveis. */
  metrics: {
    ordersDelivered: number | null;
    customers: number | null;
    averageRating: number | null;
    ratingCount: number | null;
    yearsInMarket: number | null;
  };
};

export const storeConfig: StoreConfig = {
  name: "Loja Eletro",
  pricing: {
    pixDiscountRate: 0.05,
    expressShippingPrice: 9.8,
  },
  shipping: {
    standardDeliveryDays: 5,
    expressDeliveryDays: 3,
    handlingLabel: "Envio após a confirmação do pagamento",
    tracking: true,
    trackingLabel: "Código de rastreio enviado por e-mail",
  },
  policies: {
    warrantyMonths: 12,
    warrantyDescription:
      "Cobertura contra defeitos de fabricação durante o período de garantia.",
    returnDays: 7,
    returnDescription:
      "Direito de arrependimento em 7 dias após o recebimento, conforme o Código de Defesa do Consumidor.",
    invoice: true,
    invoiceLabel: "Nota fiscal eletrônica enviada por e-mail",
  },
  support: {
    hours: "Segunda a sábado, das 8h às 20h",
    channels: "WhatsApp e e-mail",
    responseTime: null,
  },
  security: {
    sslLabel: "Conexão criptografada (SSL)",
    lgpdLabel: "Tratamento de dados conforme a LGPD",
    paymentLabel: "Pagamento processado por gateway certificado — não armazenamos dados bancários",
  },
  metrics: {
    ordersDelivered: null,
    customers: null,
    averageRating: null,
    ratingCount: null,
    yearsInMarket: null,
  },
};

/** "Garantia de 1 ano" / "Garantia de 6 meses" a partir da config. */
export function warrantyLabel(): string {
  const m = storeConfig.policies.warrantyMonths;
  if (m % 12 === 0) {
    const y = m / 12;
    return `Garantia de ${y} ${y === 1 ? "ano" : "anos"}`;
  }
  return `Garantia de ${m} meses`;
}

export function returnLabel(): string {
  return `${storeConfig.policies.returnDays} dias para troca ou devolução`;
}
