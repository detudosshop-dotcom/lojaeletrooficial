import { z } from "zod";

const BASE_URL = "https://app.flevopay.com.br";

function onlyDigits(v: string) {
  return v.replace(/\D+/g, "");
}

export function getFlevoApiKey(): string {
  return (
    process.env.FLEVOPAY_API_KEY ||
    process.env.FLEVOPAY_SECRET_KEY ||
    "flevopay_sk_4d2f2349cd060b2eb9d2346923037759f1c3b617645417359fc96c8a80ea2429"
  );
}

function getApiKey(): string | null {
  return getFlevoApiKey();
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

export function parseCreatePixInput(input: unknown): CreatePixInput {
  return inputSchema.parse(input);
}

export async function createPixTransactionCore(
  data: CreatePixInput,
): Promise<CreatePixResult> {
  const apiKey = getApiKey();
  if (!apiKey) {
    return {
      ok: false,
      error: "Chave da FlevoPay (FLEVOPAY_API_KEY) não configurada no servidor.",
    };
  }

  const reference =
    data.utmify?.orderId ||
    `PED-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

  const description =
    data.items[0]?.title || "Pedido na Loja Eletro";

  const body: Record<string, unknown> = {
    amount: data.amount,
    description,
    reference,
    source: "api_externa", // Importante: ignora validação de productHash da FlevoPay
    customer: {
      name: data.customer.name,
      email: data.customer.email,
      phone: onlyDigits(data.customer.phone),
      document: onlyDigits(data.customer.document),
    },
  };

  // Tracking UTMify se houver
  if (data.utmify?.tracking) {
    const t = data.utmify.tracking as Record<string, any>;
    body.tracking = {
      utm_source: t.utm_source || undefined,
      utm_medium: t.utm_medium || undefined,
      utm_campaign: t.utm_campaign || undefined,
      utm_content: t.utm_content || undefined,
      utm_term: t.utm_term || undefined,
      src: t.src || undefined,
      sck: t.sck || undefined,
    };
  }

  try {
    const res = await fetch(`${BASE_URL}/api/v1/transaction`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-API-Key": apiKey,
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

    if (!res.ok || json?.status === "error" || json?.success === false) {
      console.error("FlevoPay error:", res.status, text);
      return {
        ok: false,
        error:
          json?.message ||
          json?.error ||
          `Falha ao gerar Pix na FlevoPay (HTTP ${res.status})`,
      };
    }

    const transactionId = String(json?.transaction_id || json?.id || "");
    const qrCode = json?.qr_code || json?.pix_code || "";
    const qrCodeImage = json?.qr_code_base64 || undefined;
    const expiresAt = json?.expires_at || undefined;

    if (!qrCode) {
      console.error("FlevoPay resposta sem QR Code:", text);
      return {
        ok: false,
        error: "FlevoPay não retornou o código Pix.",
      };
    }

    // Salva no banco Supabase para conciliação com UTMify
    if (data.utmify) {
      try {
        const { supabaseAdmin } = await import(
          "@/integrations/supabase/client.server"
        );
        await supabaseAdmin.from("pagouai_orders").upsert({
          transaction_id: transactionId || reference,
          order_id: reference,
          amount_cents: data.amount,
          customer: data.utmify.customer,
          products: data.utmify.products,
          tracking: data.utmify.tracking,
          paid_notified: false,
        });
      } catch (err) {
        console.error("Falha ao salvar order no Supabase:", err);
      }
    }

    return {
      ok: true,
      transactionId: transactionId || reference,
      qrCode,
      qrCodeImage,
      expiresAt,
    };
  } catch (err: any) {
    console.error("FlevoPay request failed:", err);
    return {
      ok: false,
      error: "Não foi possível conectar à FlevoPay no momento.",
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

export function normalizeFlevoStatus(s: unknown): PixStatus {
  if (typeof s !== "string") return "unknown";
  const v = s.toLowerCase();
  if (v === "approved" || v === "paid" || v === "completed") return "paid";
  if (v === "pending" || v === "processing" || v === "under_review")
    return "pending";
  if (v === "expired") return "expired";
  if (["failed", "refunded", "chargeback", "error"].includes(v)) return "failed";
  return "unknown";
}

export function parsePixStatusInput(input: unknown) {
  return statusSchema.parse(input);
}

export async function getPixStatusCore(
  data: z.infer<typeof statusSchema>,
): Promise<GetPixStatusResult> {
  const apiKey = getApiKey();
  if (!apiKey) {
    return {
      ok: false,
      status: "unknown",
      error: "Chave FlevoPay ausente no servidor.",
    };
  }

  const id = data.transactionId.split("__")[0];

  try {
    // Tenta primeiro consultar por transaction_id direto
    let queryUrl = `${BASE_URL}/api/v1/query?action=get_transaction&id=${encodeURIComponent(id)}`;
    if (id.startsWith("PED-")) {
      queryUrl = `${BASE_URL}/api/v1/query?action=list_transactions&external_id=${encodeURIComponent(id)}`;
    }

    let res = await fetch(queryUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "X-API-Key": apiKey,
      },
    });

    let text = await res.text();
    let json: any = null;
    try {
      json = text ? JSON.parse(text) : null;
    } catch {
      json = null;
    }

    // Se falhou e era get_transaction, tenta como external_id
    if ((!res.ok || !json || json.status === "error") && !id.startsWith("PED-")) {
      const fallbackUrl = `${BASE_URL}/api/v1/query?action=list_transactions&external_id=${encodeURIComponent(id)}`;
      const fallbackRes = await fetch(fallbackUrl, {
        method: "GET",
        headers: { Accept: "application/json", "X-API-Key": apiKey },
      });
      if (fallbackRes.ok) {
        const fallbackText = await fallbackRes.text();
        try {
          const fallbackJson = JSON.parse(fallbackText);
          if (fallbackJson) {
            res = fallbackRes;
            json = fallbackJson;
          }
        } catch {
          // Mantém json anterior
        }
      }
    }

    if (!res.ok) {
      return {
        ok: false,
        status: "unknown",
        error: json?.message || json?.error || `HTTP ${res.status}`,
      };
    }

    // Se veio array (list_transactions), pega o primeiro
    const tx = Array.isArray(json) ? json[0] : (json?.data ?? json);
    const rawStatus = tx?.status;

    return {
      ok: true,
      status: normalizeFlevoStatus(rawStatus),
      raw: typeof rawStatus === "string" ? rawStatus : undefined,
    };
  } catch (err) {
    console.error("FlevoPay status check failed:", err);
    return {
      ok: false,
      status: "unknown",
      error: "Falha de rede ao consultar status na FlevoPay.",
    };
  }
}
