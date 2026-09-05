import { createFileRoute } from "@tanstack/react-router";
import { formatUtmifyDate, sendUtmifyOrderCore } from "@/lib/utmify.server";

export const Route = createFileRoute("/api/public/flevopay-webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env.FLEVOPAY_API_KEY;

        let payload: any;
        try {
          payload = await request.json();
        } catch {
          return new Response("bad json", { status: 400 });
        }

        const txid: string | undefined =
          payload?.transaction_id || payload?.id || payload?.external_id;
        const rawStatus: string | undefined = payload?.status || payload?.raw_status;

        if (!txid || !rawStatus) {
          return new Response("missing fields", { status: 400 });
        }

        console.log("FlevoPay webhook:", { txid, status: rawStatus });

        const normalized = String(rawStatus).toLowerCase();
        if (normalized !== "approved" && normalized !== "completed" && normalized !== "paid") {
          return new Response("ok", { status: 200 });
        }

        // Validação adicional de segurança via API da FlevoPay
        if (apiKey) {
          try {
            const verifyRes = await fetch(
              `https://app.flevopay.com.br/api/v1/query?action=get_transaction&id=${encodeURIComponent(
                String(payload?.transaction_id || txid),
              )}`,
              { headers: { Accept: "application/json", "X-API-Key": apiKey } },
            );
            const verifyJson: any = await verifyRes.json().catch(() => null);
            const tx = Array.isArray(verifyJson) ? verifyJson[0] : (verifyJson?.data ?? verifyJson);
            const checkStatus = String(tx?.status || "").toLowerCase();
            if (verifyRes.ok && checkStatus && checkStatus !== "approved" && checkStatus !== "paid") {
              console.warn("FlevoPay webhook: status não aprovado na API", txid, checkStatus);
              return new Response("not approved", { status: 202 });
            }
          } catch (err) {
            console.error("FlevoPay webhook verificação falhou:", err);
          }
        }

        // Notificação e gravação no Supabase / UTMify
        try {
          const { supabaseAdmin } = await import(
            "@/integrations/supabase/client.server"
          );
          const externalId = payload?.external_id || txid;

          const { data: order, error } = await supabaseAdmin
            .from("pagouai_orders")
            .select(
              "created_at, amount_cents, customer, products, tracking, paid_notified",
            )
            .or(`transaction_id.eq.${txid},order_id.eq.${externalId}`)
            .maybeSingle();

          if (error) throw error;
          if (!order) {
            console.warn("FlevoPay webhook: pedido não encontrado", txid);
            return new Response("order not found", { status: 202 });
          }

          if (!order.paid_notified) {
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

            await sendUtmifyOrderCore({
              orderId: String(externalId || txid),
              status: "paid",
              createdAt: formatUtmifyDate(new Date(order.created_at)),
              approvedDate: formatUtmifyDate(new Date()),
              refundedAt: null,
              customer: {
                name: customer?.name || "Cliente",
                email: customer?.email || "cliente@email.com",
                phone: customer?.phone || "",
                document: customer?.document || "",
                country: customer?.country || "BR",
              },
              products: products || [],
              trackingParameters: tracking || {},
              commission: {
                totalPriceInCents: order.amount_cents,
                gatewayFeeInCents: 0,
                userCommissionInCents: order.amount_cents,
                currency: "BRL",
              },
              isTest: false,
            });

            await supabaseAdmin
              .from("pagouai_orders")
              .update({ paid_notified: true })
              .or(`transaction_id.eq.${txid},order_id.eq.${externalId}`);
          }
        } catch (err) {
          console.error("FlevoPay webhook: erro ao processar no Supabase/Utmify", err);
        }

        return new Response("ok", { status: 200 });
      },
    },
  },
});
