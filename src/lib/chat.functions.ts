import { createServerFn } from "@tanstack/react-start";
import { computeOrderTotals, discountPercent } from "@/lib/pricing";
import { storeConfig, warrantyLabel } from "@/lib/store-config";
import { z } from "zod";
import { getProductBySlug, MAIN_PRODUCT_SLUG, type Product } from "@/lib/catalog";

const messageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(2000),
});

const inputSchema = z.object({
  messages: z.array(messageSchema).min(1).max(30),
  productSlug: z.string().optional(),
});

export type ChatMessage = z.infer<typeof messageSchema>;

export type ChatResult = {
  ok: boolean;
  reply?: string;
  error?: string;
};

const STORE_INTRO = `Você é a Júlia, atendente virtual oficial da loja **Loja Eletro**.

INFORMAÇÕES DA LOJA:
- Nome: Loja Eletro
- Envio em até 24h
- Compra protegida em todos os produtos
- Frete grátis para a maioria dos produtos
- ${storeConfig.security.paymentLabel}

FORMAS DE PAGAMENTO:
- Pix (5% OFF, aprovação na hora)
- Cartão de crédito em até 12x

ENTREGA:
- Envio em 24h após a confirmação do pagamento
- Prazo médio de ${storeConfig.shipping.standardDeliveryDays} a 10 dias úteis (varia por região)
- ${storeConfig.shipping.trackingLabel}

POLÍTICA DE TROCA E GARANTIA:
- ${storeConfig.policies.returnDescription}
- **${warrantyLabel()}** — ${storeConfig.policies.warrantyDescription}`;

const RULES = `REGRAS DE ATENDIMENTO:
1. Seja simpática, breve e objetiva (máx 3-4 frases por resposta)
2. Use emojis com moderação (1 por mensagem no máximo)
3. Sempre tente ajudar a fechar a venda — destaque benefícios (frete grátis, desconto Pix, garantia)
4. Se não souber algo específico, diga que vai verificar e oriente o cliente a finalizar a compra que o suporte entra em contato
5. NUNCA invente preços, prazos ou políticas diferentes das listadas acima
6. Responda SEMPRE em português brasileiro
7. Se o cliente quiser comprar, oriente clicar no botão "Comprar agora" na parte inferior da tela
8. Mantenha o foco no produto que o cliente está visualizando (descrito abaixo)`;

function productContext(p: Product): string {
  const totals = computeOrderTotals({ unitPrice: p.price });
  const pixPrice = totals.pixTotalCents / 100;
  const fmt = (n: number) => `R$ ${n.toFixed(2).replace(".", ",")}`;
  return `PRODUTO QUE O CLIENTE ESTÁ VENDO AGORA:
- Nome: ${p.name}
- Resumo: ${p.tagline}
- Preço: ${fmt(p.price)} (de ${fmt(p.oldPrice)} — ${discountPercent(p.price, p.oldPrice)}% OFF)
- No Pix: ${fmt(pixPrice)} (${Math.round(totals.pixDiscountRate * 100)}% de desconto)
- ${p.freeShipping ? "Frete grátis" : "Frete a calcular"}
- ${warrantyLabel()} contra defeitos de fabricação
- Avaliações publicadas na página: ${p.reviewsList.length}
${p.voltageOptions?.length ? `- Voltagens disponíveis: ${p.voltageOptions.join(", ")}` : ""}
${p.colorOptions?.length ? `- Cores disponíveis: ${p.colorOptions.map((c) => c.label).join(", ")}` : ""}

PRINCIPAIS BENEFÍCIOS:
${p.description.features.map(([t, d]) => `- ${t}: ${d}`).join("\n")}

INDICADO PARA:
${p.description.idealFor.map((i) => `- ${i}`).join("\n")}

ACOMPANHA NA EMBALAGEM:
${p.description.includes.map((i) => `- ${i}`).join("\n")}`;
}

function buildSystemPrompt(slug?: string): string {
  const product =
    (slug && getProductBySlug(slug)) || getProductBySlug(MAIN_PRODUCT_SLUG)!;
  return `${STORE_INTRO}\n\n${productContext(product)}\n\n${RULES}`;
}

export const sendChatMessage = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => inputSchema.parse(input))
  .handler(async ({ data }): Promise<ChatResult> => {
    const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
    if (!LOVABLE_API_KEY) {
      return { ok: false, error: "Serviço de chat indisponível no momento." };
    }

    try {
      const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: buildSystemPrompt(data.productSlug) },
            ...data.messages,
          ],
        }),
      });

      if (response.status === 429) {
        return { ok: false, error: "Muitas mensagens em pouco tempo. Tente novamente em instantes." };
      }
      if (response.status === 402) {
        return { ok: false, error: "Limite de uso atingido. Tente novamente mais tarde." };
      }
      if (!response.ok) {
        const txt = await response.text();
        console.error("AI gateway error:", response.status, txt);
        return { ok: false, error: "Não consegui responder agora. Tente novamente." };
      }

      const json = (await response.json()) as {
        choices?: Array<{ message?: { content?: string } }>;
      };
      const reply = json.choices?.[0]?.message?.content?.trim();
      if (!reply) {
        return { ok: false, error: "Resposta vazia do assistente." };
      }
      return { ok: true, reply };
    } catch (e) {
      console.error("chat error:", e);
      return { ok: false, error: "Erro ao conectar com o assistente." };
    }
  });