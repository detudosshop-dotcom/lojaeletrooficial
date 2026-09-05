import { z } from "zod";

const BASE_URL = "https://api.freepaybrasil.com";
const WEBHOOK_URL =
  "https://lojadetudoshop.lovable.app/api/public/freepay-webhook";

function onlyDigits(v: string) {
  return v.replace(/\D+/g, "");
}

function authHeader() {
  const pub = process.env.FREEPAY_PUBLIC_KEY;
  const secret = process.env.FREEPAY_SECRET_KEY;
  if (!pub || !secret) return null;
  return "Basic " + Buffer.from(`${pub}:${secret}`).toString("base64");
}

const inputSchema = z.object({
  amount: z.number().int().positive().max(10_000_000),
  customer: z.object({
    name: z.string().trim().min(3).max(120),
    email: z.string().trim().email().max(255),
    phone: z.string().trim().min(8).max(20),
    document: z.string().trim().min(11).max(14),
  }),
  shipping: z
    .object({
      street: z.string().min(1),
      number: z.string().min(1),
      complement: z.string().optional().default(""),
      neighborhood: z.string().min(1),
      city: z.string().min(1),
      state: z.string().min(2).max(2),
      zipCode: z.string().min(8),
    })
    .optional(),
  items: z
    .array(
      z.object({
        title: z.string().min(1).max(120),
        quantity: z.number().int().positive().max(100),
        unitPrice: z.number().int().positive(),
        tangible: z.boolean().optional(),
      }),
    )
    .min(1)
    .max(50),
  utmify: z
    .object({
      orderId: z.string().min(1).max(120),
      products: z.array(z.any()),
      tracking: z.record(z.string(), z.any()).default({}),
      customer: z.object({
        name: z.string(),
        email: z.string(),
        phone: z.string(),
        document: z.string(),
        country: z.string().default("BR"),
      }),
    })
    .optional(),
});

export type CreatePixInput = z.infer<typeof inputSchema>;

export type CreatePixResult = {
  ok: boolean;
  transactionId?: string;
  qrCode?: string;
  qrCodeImage?: string;
  expiresAt?: string;
  error?: string;
};

function firstOf<T>(value: T | T[] | undefined | null): T | undefined {
  if (Array.isArray(value)) return value[0];
  return value ?? undefined;
}

export function parseCreatePixInput(input: unknown): CreatePixInput {
  return inputSchema.parse(input);
}

export async function createPixTransactionCore(data: CreatePixInput): Promise<CreatePixResult> {
    const auth = authHeader();
    if (!auth) {
      return {
        ok: false,
        error:
          "Credenciais FreePay (FREEPAY_PUBLIC_KEY / FREEPAY_SECRET_KEY) não configuradas",
      };
    }

    const body: Record<string, unknown> = {
      amount: data.amount,
      payment_method: "pix",
      postback_url: WEBHOOK_URL,
      metadata: {
        source: "lojaeletro",
        order_id: data.utmify?.orderId ?? "",
      },
      customer: {
        name: data.customer.name,
        email: data.customer.email,
        phone: onlyDigits(data.customer.phone),
        document: {
          number: onlyDigits(data.customer.document),
          type: onlyDigits(data.customer.document).length > 11 ? "cnpj" : "cpf",
        },
      },
      items: data.items.map((item) => ({
        title: item.title,
        unit_price: item.unitPrice,
        quantity: item.quantity,
        tangible: item.tangible ?? true,
      })),
      pix: { expires_in_days: 1 },
      ...(data.shipping
        ? {
            shipping: {
              fee: 0,
              address: {
                street: data.shipping.street,
                street_number: data.shipping.number,
                complement: data.shipping.complement || "",
                zip_code: onlyDigits(data.shipping.zipCode),
                neighborhood: data.shipping.neighborhood,
                city: data.shipping.city,
                state: data.shipping.state.toUpperCase(),
                country: "BR",
              },
            },
          }
        : {}),
    };

    try {
      const res = await fetch(`${BASE_URL}/v1/payment-transaction/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          authorization: auth,
        },
        body: JSON.stringify(body),
      });

      const text = await res.text();
      let json: any = null;
      try {
        json = text ? JSON.parse(text) : null;
      } catch {
        json = { raw: text };
      }

      if (!res.ok) {
        console.error("FreePay error:", res.status, text);
        return {
          ok: false,
          error:
            json?.message ||
            json?.error ||
            `Falha ao gerar Pix (HTTP ${res.status})`,
        };
      }

      const tx = firstOf<any>(json?.data) ?? json;
      const pix = firstOf<any>(tx?.pix);
      const transactionId: string | undefined = tx?.id;
      const qrCode: string | undefined = pix?.qr_code || pix?.url;

      if (!transactionId || !qrCode) {
        console.error("FreePay resposta incompleta:", text);
        return { ok: false, error: "Resposta inesperada da FreePay." };
      }

      if (data.utmify) {
        try {
          const { supabaseAdmin } = await import(
            "@/integrations/supabase/client.server"
          );
          await supabaseAdmin.from("pagouai_orders").upsert({
            transaction_id: transactionId,
            order_id: transactionId,
            amount_cents: data.amount,
            customer: data.utmify.customer,
            products: data.utmify.products,
            tracking: data.utmify.tracking,
            paid_notified: false,
          });
        } catch (err) {
          console.error("Falha ao salvar order:", err);
        }
      }

      return {
        ok: true,
        transactionId,
        qrCode,
        expiresAt: pix?.expiration_date,
      };
    } catch (err) {
      console.error("FreePay request failed:", err);
      return {
        ok: false,
        error: "Não foi possível conectar à FreePay no momento.",
      };
    }
}

const statusSchema = z.object({
  transactionId: z.string().min(1).max(200),
});

export type PixStatus = "pending" | "paid" | "failed" | "expired" | "unknown";

export type GetPixStatusResult = {
  ok: boolean;
  status: PixStatus;
  raw?: string;
  error?: string;
};

export function normalizeStatus(s: unknown): PixStatus {
  if (typeof s !== "string") return "unknown";
  const v = s.toUpperCase();
  if (v === "PAID") return "paid";
  if (v === "PENDING") return "pending";
  if (v === "EXPIRED") return "expired";
  if (["REFUSED", "REFUNDED", "CHARGEBACK", "PRECHARGEBACK", "ERROR"].includes(v))
    return "failed";
  return "unknown";
}

export function parsePixStatusInput(input: unknown) {
  return statusSchema.parse(input);
}

export async function getPixStatusCore(data: z.infer<typeof statusSchema>): Promise<GetPixStatusResult> {
    const auth = authHeader();
    if (!auth) {
      return { ok: false, status: "unknown", error: "Credenciais FreePay ausentes" };
    }

    const id = data.transactionId.split("__")[0];

    try {
      const res = await fetch(
        `${BASE_URL}/v1/payment-transaction/info/${encodeURIComponent(id)}`,
        {
          method: "GET",
          headers: { Accept: "application/json", authorization: auth },
        },
      );

      const text = await res.text();
      let json: any = null;
      try {
        json = text ? JSON.parse(text) : null;
      } catch {
        json = null;
      }

      if (!res.ok) {
        return {
          ok: false,
          status: "unknown",
          error: json?.message || json?.error || `HTTP ${res.status}`,
        };
      }

      const tx = firstOf<any>(json?.data) ?? json;
      const rawStatus = tx?.status;
      return {
        ok: true,
        status: normalizeStatus(rawStatus),
        raw: typeof rawStatus === "string" ? rawStatus : undefined,
      };
    } catch (err) {
      console.error("FreePay status request failed:", err);
      return { ok: false, status: "unknown", error: "Falha de rede ao consultar status." };
    }
  }
