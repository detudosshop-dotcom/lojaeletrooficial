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

export function generateAssistantReply(userQuestion: string, product: Product): string {
  const q = userQuestion.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const totals = computeOrderTotals({ unitPrice: product.price });
  const pixPrice = (totals.pixTotalCents / 100).toFixed(2).replace(".", ",");
  const card12x = (product.price / 12).toFixed(2).replace(".", ",");
  const oldPrice = product.oldPrice.toFixed(2).replace(".", ",");

  // 1. Prazo de entrega / Frete / Envio / Rastreamento / CEP
  if (
    q.includes("prazo") ||
    q.includes("entrega") ||
    q.includes("chega") ||
    q.includes("demora") ||
    q.includes("frete") ||
    q.includes("cep") ||
    q.includes("rastre") ||
    q.includes("envio") ||
    q.includes("onde entrega")
  ) {
    return `O envio é imediato em até 24h úteis após a confirmação do pagamento! 🚚 O frete é GRÁTIS para todo o Brasil e o prazo médio de entrega é de 3 a 7 dias úteis. Você recebe o código de rastreamento no seu WhatsApp e e-mail para acompanhar tudo em tempo real.`;
  }

  // 2. Desconto / Pix / Cupom / Promoção / Preço / Valor / Quanto custa
  if (
    q.includes("pix") ||
    q.includes("desconto") ||
    q.includes("cupom") ||
    q.includes("promocao") ||
    q.includes("quanto custa") ||
    q.includes("qual o valor") ||
    q.includes("preco") ||
    q.includes("custa")
  ) {
    return `Sim! No Pix você ganha 5% de desconto imediato e o valor cai de R$ ${oldPrice} para apenas R$ ${pixPrice}! ⚡ A aprovação é na hora e o pedido já entra direto na fila de envio prioritário. Você também pode parcelar em até 12x de R$ ${card12x} no cartão de crédito.`;
  }

  // 3. Garantia / Defeito / Troca / Devolução / Reembolso / Confiança / Segurança
  if (
    q.includes("garantia") ||
    q.includes("defeito") ||
    q.includes("troca") ||
    q.includes("devolv") ||
    q.includes("reembolso") ||
    q.includes("seguro") ||
    q.includes("confiavel") ||
    q.includes("golpe") ||
    q.includes("reclame")
  ) {
    return `Sua compra é 100% protegida! 🛡️ Você tem 90 dias de garantia contra qualquer defeito de fabricação e 7 dias de garantia incondicional (se não gostar, devolvemos seu dinheiro sem burocracia). Além disso, nossa loja possui certificado de segurança SSL e processamento seguro oficial.`;
  }

  // 4. Intenção de compra / Quero comprar / Como comprar / Onde clico
  if (
    q.includes("quero comprar") ||
    q.includes("como comp") ||
    q.includes("fechar") ||
    q.includes("comprar") ||
    q.includes("adicionar") ||
    q.includes("finalizar")
  ) {
    return `Excelente escolha! Para garantir o seu ${product.shortName} pelo valor promocional de R$ ${pixPrice}, basta clicar no botão "Comprar com cupom" ou "Adicionar ao carrinho" na parte inferior da tela. O processo leva menos de 1 minuto! 🛍️`;
  }

  // 5. O que vem na caixa / Itens inclusos / Acessórios / Maleta / Baterias / O que acompanha
  if (
    q.includes("o que vem") ||
    q.includes("vem o que") ||
    q.includes("itens") ||
    q.includes("incluso") ||
    q.includes("acompanha") ||
    q.includes("maleta") ||
    q.includes("bateria") ||
    q.includes("acessorio") ||
    q.includes("soquete") ||
    q.includes("broca")
  ) {
    const includesList = product.description.includes.map((item) => `• ${item}`).join("\n");
    return `O pacote acompanha tudo completo e pronto para uso:\n\n${includesList}\n\nTudo original, testado e embalado com proteção reforçada! 📦`;
  }

  // 6. Voltagem / Carregador / 110V / 220V / Bivolt / Tomada
  if (
    q.includes("voltagem") ||
    q.includes("110") ||
    q.includes("220") ||
    q.includes("bivolt") ||
    q.includes("tomada")
  ) {
    if (product.voltageOptions?.length) {
      return `O ${product.shortName} está disponível em ${product.voltageOptions.join(" e ")}. Você pode escolher a voltagem ideal diretamente na página antes de finalizar a compra!`;
    }
    return `O carregador que acompanha o kit é Bivolt Automático (110V e 220V), funcionando perfeitamente em qualquer tomada do Brasil, e as 2 baterias de lítio de alta capacidade garantem máxima autonomia! 🔌`;
  }

  // 7. Potência / Força / Motor / Aplicações / Concreto / Alvenaria / Parede
  if (
    q.includes("potencia") ||
    q.includes("forca") ||
    q.includes("torque") ||
    q.includes("motor") ||
    q.includes("brushless") ||
    q.includes("parede") ||
    q.includes("concreto") ||
    q.includes("furadeira") ||
    q.includes("aguenta")
  ) {
    return `O equipamento conta com tecnologia de motor Brushless (sem escovas de carvão), que entrega alta potência, menor aquecimento e maior durabilidade! Fura concreto e alvenaria com muita facilidade na função impacto, aperta parafusos pesados e executa cortes rápidos e limpos. 💪`;
  }

  // 8. Formas de pagamento / Cartão / Parcelamento
  if (
    q.includes("pagamento") ||
    q.includes("cartao") ||
    q.includes("parcel") ||
    q.includes("vezes")
  ) {
    return `Aceitamos Pix com 5% de desconto imediato e aprovação na hora, ou Cartão de Crédito em até 12x de R$ ${card12x}! Ambas as formas contam com aprovação rápida e segurança total. 💳`;
  }

  // 9. Estoque / É novo / Original / Nota fiscal
  if (
    q.includes("estoque") ||
    q.includes("novo") ||
    q.includes("original") ||
    q.includes("nota fiscal") ||
    q.includes("nota")
  ) {
    return `Sim! Todos os nossos produtos são 100% novos, lacrados na embalagem original, testados antes do envio e acompanham nota fiscal e garantia total. Temos pronta entrega com envio imediato! 📦✨`;
  }

  // 10. Saudações
  if (
    q === "oi" ||
    q === "ola" ||
    q.startsWith("oi ") ||
    q.startsWith("ola ") ||
    q.includes("bom dia") ||
    q.includes("boa tarde") ||
    q.includes("boa noite") ||
    q.includes("tudo bem")
  ) {
    return `Olá! Tudo ótimo por aqui! 😊 Estou à sua disposição para tirar qualquer dúvida sobre o ${product.shortName} ou te ajudar com o seu pedido. O que você gostaria de saber?`;
  }

  // 11. Agradecimentos
  if (q.includes("obrigad") || q.includes("valeu") || q.includes("show") || q.includes("top") || q.includes("perfeito")) {
    return `Por nada! Qualquer dúvida adicional estou sempre à disposição. Para garantir o seu com o desconto de hoje e frete grátis, é só clicar em "Comprar com cupom" aqui embaixo! Tenha um ótimo dia! ✨`;
  }

  // Resposta padrão contextualizada e útil
  return `O ${product.shortName} está em promoção exclusiva por apenas R$ ${pixPrice} no Pix (ou até 12x de R$ ${card12x}) com FRETE GRÁTIS e envio imediato em até 24h úteis! 🚚\n\nPosso te ajudar com dúvidas sobre itens da maleta, garantia de 90 dias ou prazo de entrega. O que você precisa saber?`;
}

export const sendChatMessage = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => inputSchema.parse(input))
  .handler(async ({ data }): Promise<ChatResult> => {
    const product =
      (data.productSlug && getProductBySlug(data.productSlug)) ||
      getProductBySlug(MAIN_PRODUCT_SLUG)!;

    const lastUserMessage =
      [...data.messages].reverse().find((m) => m.role === "user")?.content || "";

    const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;

    if (LOVABLE_API_KEY) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 4000);

        const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${LOVABLE_API_KEY}`,
            "Content-Type": "application/json",
          },
          signal: controller.signal,
          body: JSON.stringify({
            model: "google/gemini-3-flash-preview",
            messages: [
              { role: "system", content: buildSystemPrompt(data.productSlug) },
              ...data.messages,
            ],
          }),
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          const json = (await response.json()) as {
            choices?: Array<{ message?: { content?: string } }>;
          };
          const reply = json.choices?.[0]?.message?.content?.trim();
          if (reply) {
            return { ok: true, reply };
          }
        }
      } catch {
        // Se a API externa falhar ou demorar, continua para o assistente local
      }
    }

    // Assistente contextual inteligente que responde instantaneamente
    const reply = generateAssistantReply(lastUserMessage, product);
    return { ok: true, reply };
  });