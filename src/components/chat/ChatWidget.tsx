import { useState, useRef, useEffect, useMemo } from "react";
import { useServerFn } from "@tanstack/react-start";
import { X, Send, MessageCircle, Loader2 } from "lucide-react";
import storeLogo from "@/assets/store-logo.jpg";
import { sendChatMessage, type ChatMessage } from "@/lib/chat.functions";
import { useActiveProductSlug } from "@/lib/active-product-store";
import { getProductBySlug, MAIN_PRODUCT_SLUG } from "@/lib/catalog";

function buildIntro(slug: string): { greeting: ChatMessage; quickReplies: string[] } {
  const product = getProductBySlug(slug) ?? getProductBySlug(MAIN_PRODUCT_SLUG)!;
  const firstName = product.shortName;
  return {
    greeting: {
      role: "assistant",
      content: `Oi! 👋 Sou a Júlia, atendente da Loja Eletro. Vi que você está olhando o ${firstName} — posso te ajudar com dúvidas sobre esse produto, prazo de entrega, formas de pagamento e mais!`,
    },
    quickReplies: [
      "Qual o prazo de entrega?",
      "Tem desconto no Pix?",
      "Como funciona a garantia?",
      `Quero comprar o ${firstName}`,
    ],
  };
}

export function ChatWidget({ open, onClose }: { open: boolean; onClose: () => void }) {
  const slug = useActiveProductSlug();
  const sendChat = useServerFn(sendChatMessage);
  const { greeting, quickReplies } = useMemo(() => buildIntro(slug), [slug]);

  const [messages, setMessages] = useState<ChatMessage[]>([greeting]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Reseta a conversa sempre que o produto ativo muda
  useEffect(() => {
    setMessages([greeting]);
  }, [greeting]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [open]);

  async function handleSend(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg: ChatMessage = { role: "user", content: trimmed };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await sendChat({
        data: { messages: next.slice(-20), productSlug: slug },
      });
      if (res.ok && res.reply) {
        setMessages((prev) => [...prev, { role: "assistant", content: res.reply! }]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: res.error ?? "Desculpe, não consegui responder. Tente novamente.",
          },
        ]);
      }
    } catch (e) {
      console.error(e);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Tive um problema de conexão. Pode tentar de novo?",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }


  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-black/40 backdrop-blur-sm sm:items-center"
      onClick={onClose}
    >
      <div
        className="flex h-[85vh] w-full max-w-md flex-col overflow-hidden rounded-t-2xl bg-card shadow-2xl sm:h-[600px] sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-border bg-card px-4 py-3">
          <div className="relative">
            <img
              src={storeLogo}
              alt="Loja Eletro"
              className="h-10 w-10 rounded-full border border-border object-cover"
            />
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-card bg-success" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold leading-tight">Júlia · Loja Eletro</p>
            <p className="text-[11px] text-success">Online · responde em segundos</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar chat"
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-muted"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-muted/40 px-3 py-4">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {m.role === "assistant" && (
                <img
                  src={storeLogo}
                  alt=""
                  className="mr-2 h-7 w-7 shrink-0 self-end rounded-full border border-border object-cover"
                />
              )}
              <div
                className={`max-w-[78%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm leading-snug shadow-sm ${
                  m.role === "user"
                    ? "rounded-br-sm bg-primary text-primary-foreground"
                    : "rounded-bl-sm bg-card text-foreground"
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <img
                src={storeLogo}
                alt=""
                className="mr-2 h-7 w-7 shrink-0 self-end rounded-full border border-border object-cover"
              />
              <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm bg-card px-3 py-2.5 shadow-sm">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground" />
              </div>
            </div>
          )}
        </div>

        {/* Quick replies (only on first message) */}
        {messages.length === 1 && !loading && (
          <div className="flex flex-wrap gap-1.5 border-t border-border bg-card px-3 py-2">
            {quickReplies.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => handleSend(q)}
                className="rounded-full border border-primary/30 bg-primary/5 px-2.5 py-1 text-[11px] font-medium text-primary hover:bg-primary/10"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(input);
          }}
          className="flex items-center gap-2 border-t border-border bg-card px-3 py-2.5"
          style={{ paddingBottom: "max(0.625rem, env(safe-area-inset-bottom))" }}
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite sua mensagem..."
            disabled={loading}
            maxLength={500}
            className="flex-1 rounded-full border border-border bg-background px-4 py-2 text-sm outline-none focus:border-primary disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            aria-label="Enviar mensagem"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity disabled:opacity-40"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

// Re-export icon for easy use elsewhere
export { MessageCircle };
