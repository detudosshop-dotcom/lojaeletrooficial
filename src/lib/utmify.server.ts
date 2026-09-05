import { getRequestHeader } from "@tanstack/react-start/server";
import { z } from "zod";

const trackingSchema = z.object({
  src: z.string().nullable().optional(),
  sck: z.string().nullable().optional(),
  utm_source: z.string().nullable().optional(),
  utm_campaign: z.string().nullable().optional(),
  utm_medium: z.string().nullable().optional(),
  utm_content: z.string().nullable().optional(),
  utm_term: z.string().nullable().optional(),
});

const productSchema = z.object({
  id: z.string().min(1).max(120),
  name: z.string().min(1).max(200),
  planId: z.string().nullable().optional(),
  planName: z.string().nullable().optional(),
  quantity: z.number().int().positive(),
  priceInCents: z.number().int().positive(),
});

const inputSchema = z.object({
  orderId: z.string().min(1).max(120),
  status: z.enum(["waiting_payment", "paid", "refused", "refunded", "chargedback"]),
  createdAt: z.string().min(1),
  approvedDate: z.string().nullable().optional(),
  refundedAt: z.string().nullable().optional(),
  customer: z.object({
    name: z.string().min(1).max(200),
    email: z.string().email().max(255),
    phone: z.string().nullable().optional(),
    document: z.string().nullable().optional(),
    country: z.string().min(2).max(2).default("BR"),
    ip: z.string().nullable().optional(),
  }),
  products: z.array(productSchema).min(1).max(50),
  trackingParameters: trackingSchema,
  commission: z.object({
    totalPriceInCents: z.number().int().nonnegative(),
    gatewayFeeInCents: z.number().int().nonnegative().default(0),
    userCommissionInCents: z.number().int().nonnegative(),
    currency: z.string().default("BRL"),
  }),
  isTest: z.boolean().optional().default(false),
});

export type UtmifyOrderPayload = z.infer<typeof inputSchema>;

export function parseUtmifyOrderInput(input: unknown): UtmifyOrderPayload {
  return inputSchema.parse(input);
}

const ENDPOINT = "https://api.utmify.com.br/api-credentials/orders";

export function formatUtmifyDate(date: Date): string {
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())} ${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}:${pad(date.getUTCSeconds())}`;
}

export async function sendUtmifyOrderCore(data: UtmifyOrderPayload) {
  const token = process.env.UTMIFY_API_TOKEN;
  if (!token) {
    console.error("UTMIFY_API_TOKEN ausente");
    return { ok: false, error: "Token Utmify não configurado" } as const;
  }

  const transactionId = data.orderId.split("__")[0] || data.orderId;
  const ip =
    data.customer.ip ||
    getRequestHeader("cf-connecting-ip") ||
    getRequestHeader("x-real-ip") ||
    (getRequestHeader("x-forwarded-for") || "").split(",")[0].trim() ||
    "0.0.0.0";

  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  if (data.status === "paid") {
    const { data: existing, error } = await supabaseAdmin
      .from("pagouai_orders")
      .select("paid_notified")
      .eq("transaction_id", transactionId)
      .maybeSingle();
    if (error) console.warn("Falha ao consultar paid_notified:", error.message);
    if (existing?.paid_notified) return { ok: true, skipped: true } as const;
  }

  const body = {
    orderId: transactionId,
    platform: "FreePay",
    paymentMethod: "pix",
    status: data.status,
    createdAt: data.createdAt,
    approvedDate: data.approvedDate ?? null,
    refundedAt: data.refundedAt ?? null,
    customer: {
      name: data.customer.name,
      email: data.customer.email,
      phone: data.customer.phone ?? null,
      document: data.customer.document ?? null,
      country: data.customer.country || "BR",
      ip,
    },
    products: data.products,
    trackingParameters: {
      src: data.trackingParameters.src ?? null,
      sck: data.trackingParameters.sck ?? null,
      utm_source: data.trackingParameters.utm_source ?? null,
      utm_campaign: data.trackingParameters.utm_campaign ?? null,
      utm_medium: data.trackingParameters.utm_medium ?? null,
      utm_content: data.trackingParameters.utm_content ?? null,
      utm_term: data.trackingParameters.utm_term ?? null,
    },
    commission: data.commission,
    isTest: data.isTest ?? false,
  };

  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "x-api-token": token,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });
    const responseText = await response.text();
    if (!response.ok) {
      console.error("Utmify error:", response.status, responseText);
      return { ok: false, error: `HTTP ${response.status}: ${responseText}` } as const;
    }

    if (data.status === "paid") {
      const { error } = await supabaseAdmin
        .from("pagouai_orders")
        .update({ paid_notified: true, paid_at: new Date().toISOString() })
        .eq("transaction_id", transactionId)
        .eq("paid_notified", false);
      if (error) console.warn("Falha ao marcar paid_notified:", error.message);
    }

    console.log("Utmify enviado:", { orderId: transactionId, status: data.status });
    return { ok: true } as const;
  } catch (error) {
    console.error("Utmify request failed:", error);
    return { ok: false, error: "Falha de rede ao enviar para Utmify." } as const;
  }
}