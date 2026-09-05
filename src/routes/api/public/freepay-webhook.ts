import { createFileRoute } from "@tanstack/react-router";
import { formatUtmifyDate, sendUtmifyOrderCore } from "@/lib/utmify.server";

export const Route = createFileRoute("/api/public/freepay-webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const pub = process.env.FREEPAY_PUBLIC_KEY;
        const secret = process.env.FREEPAY_SECRET_KEY;

        let payload: any;
        try {
          payload = await request.json();
        } catch {
          return new Response("bad json", { status: 400 });
        }

        const txid: string | undefined = payload?.Id ?? payload?.id;
        const rawStatus: string | undefined = payload?.Status ?? payload?.status;

        if (!txid || !rawStatus) {
          return new Response("missing fields", { status: 400 });
        }

        console.log("FreePay webhook:", { txid, status: rawStatus });

        if (rawStatus.toUpperCase() !== "PAID") {
          return new Response("ok", { status: 200 });
        }

        // Confirma o pagamento direto na API (o webhook não é assinado)
        if (!pub || !secret) {
          console.error("FreePay webhook: credenciais ausentes");
          return new Response("not configured", { status: 500 });
        }

        try {
          const auth =
            "Basic " + Buffer.from(`${pub}:${secret}`).toString("base64");
          const verifyRes = await fetch(
            `https://api.freepaybrasil.com/v1/payment-transaction/info/${encodeURIComponent(txid)}`,
            { headers: { Accept: "application/json", authorization: auth } },
          );
          const verifyJson: any = await verifyRes.json().catch(() => null);
          const tx = Array.isArray(verifyJson?.data)
            ? verifyJson.data[0]
            : (verifyJson?.data ?? verifyJson);
          if (!verifyRes.ok || String(tx?.status).toUpperCase() !== "PAID") {
            console.warn("FreePay webhook: pagamento não confirmado", txid);
            return new Response("not paid", { status: 202 });
          }
        } catch (err) {
          console.error("FreePay webhook: falha ao verificar transação", err);
          return new Response("verification failed", { status: 500 });
        }

        try {
          const { supabaseAdmin } = await import(
            "@/integrations/supabase/client.server"
          );
          const { data: order, error } = await supabaseAdmin
            .from("pagouai_orders")
            .select(
              "created_at, amount_cents, customer, products, tracking, paid_notified",
            )
            .eq("transaction_id", txid)
            .maybeSingle();

          if (error) throw error;
          if (!order) {
            console.warn("FreePay webhook: pedido não encontrado", txid);
            return new Response("order not found", { status: 202 });
          }

          const customer = order.customer as {
            name: string;
            email: string;
            phone?: string;
            document?: string;
            country?: string;
          };
          const tracking = order.tracking as Record<
            string,
            string | null | undefined
          >;
          const products = order.products as Array<{
            id: string;
            name: string;
            planId?: string | null;
            planName?: string | null;
            quantity: number;
            priceInCents: number;
          }>;

          const result = await sendUtmifyOrderCore({
            orderId: txid,
            status: "paid",
            createdAt: formatUtmifyDate(new Date(order.created_at)),
            approvedDate: formatUtmifyDate(new Date()),
            refundedAt: null,
            customer: {
              name: customer.name,
              email: customer.email,
              phone: customer.phone ?? null,
              document: customer.document ?? null,
              country: customer.country ?? "BR",
            },
            products,
            trackingParameters: tracking,
            commission: {
              totalPriceInCents: order.amount_cents,
              gatewayFeeInCents: 0,
              userCommissionInCents: order.amount_cents,
              currency: "BRL",
            },
            isTest: false,
          });

          if (!result.ok) {
            console.error("FreePay webhook: falha Utmify", result.error);
            return new Response("utmify failed", { status: 502 });
          }
        } catch (err) {
          console.error("FreePay webhook: falha ao notificar pagamento:", err);
          return new Response("processing failed", { status: 500 });
        }

        return new Response("ok", { status: 200 });
      },
    },
  },
});
