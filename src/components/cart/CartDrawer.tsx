import { Link } from "@tanstack/react-router";
import { X, Plus, Minus, Trash2, ShoppingBag, ShieldCheck, Truck } from "lucide-react";
import { cartStore, useCart, useCartTotal } from "@/lib/cart-store";
import { computeOrderTotals } from "@/lib/pricing";

export function CartDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const cart = useCart();
  const total = useCartTotal();
  const totalPix = computeOrderTotals({ unitPrice: total }).pixTotalCents / 100;
  const itemCount = cart.reduce((s, i) => s + i.quantity, 0);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex justify-end bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="flex h-full w-full max-w-md flex-col bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-border bg-card px-4 py-3">
          <ShoppingBag className="h-5 w-5 text-primary" />
          <h2 className="flex-1 text-base font-semibold">
            Meu carrinho{" "}
            <span className="text-sm font-normal text-muted-foreground">
              ({itemCount} {itemCount === 1 ? "item" : "itens"})
            </span>
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar carrinho"
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-muted"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto bg-muted/40">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <ShoppingBag className="h-7 w-7 text-muted-foreground" />
              </div>
              <p className="text-sm font-semibold text-foreground">
                Seu carrinho está vazio
              </p>
              <p className="text-xs text-muted-foreground">
                Adicione produtos para continuar com a compra.
              </p>
              <Link
                to="/loja"
                onClick={onClose}
                className="mt-2 rounded-full bg-primary px-5 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90"
              >
                Ver produtos
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {cart.map((item) => (
                <li key={item.id} className="flex gap-3 bg-card p-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-20 w-20 shrink-0 rounded-md border border-border bg-white object-contain"
                  />
                  <div className="flex flex-1 flex-col">
                    <p className="line-clamp-2 text-xs leading-snug text-foreground">
                      {item.name}
                    </p>
                    <p className="mt-1 text-sm font-bold text-price">
                      R$ {item.price.toFixed(2).replace(".", ",")}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center rounded-full border border-border">
                        <button
                          type="button"
                          onClick={() =>
                            cartStore.setQuantity(item.id, item.quantity - 1)
                          }
                          aria-label="Diminuir quantidade"
                          className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-muted"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="min-w-[24px] text-center text-sm font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            cartStore.setQuantity(item.id, item.quantity + 1)
                          }
                          aria-label="Aumentar quantidade"
                          className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-muted"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => cartStore.remove(item.id)}
                        aria-label="Remover item"
                        className="flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}

              {/* Mini-trust dentro da lista */}
              <li className="space-y-2 bg-card p-3">
                <div className="flex items-center gap-2 rounded-md bg-success/10 px-3 py-2 text-success">
                  <Truck className="h-3.5 w-3.5" />
                  <span className="text-[11px] font-semibold">
                    Frete grátis no seu pedido
                  </span>
                </div>
                <div className="flex items-center gap-2 rounded-md bg-primary/5 px-3 py-2 text-primary">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span className="text-[11px] font-semibold">
                    Compra protegida e pagamento seguro
                  </span>
                </div>
              </li>
            </ul>
          )}
        </div>

        {/* Footer com total + CTA */}
        {cart.length > 0 && (
          <div
            className="border-t border-border bg-card px-4 py-3"
            style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
          >
            <dl className="space-y-1 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="font-semibold">
                  R$ {total.toFixed(2).replace(".", ",")}
                </dd>
              </div>
              <div className="flex justify-between text-success">
                <dt>No Pix (5% OFF)</dt>
                <dd className="font-bold">
                  R$ {totalPix.toFixed(2).replace(".", ",")}
                </dd>
              </div>
            </dl>
            <Link
              to="/checkout"
              onClick={onClose}
              className="mt-3 flex w-full items-center justify-center rounded-full bg-[#fe2c55] hover:bg-[#e02449] py-3 text-base font-bold text-white shadow-md shadow-[#fe2c55]/25 transition-all active:scale-[0.99]"
            >
              Finalizar compra
            </Link>
            <p className="mt-2 text-center text-[10px] text-muted-foreground">
              Pagamento 100% seguro · SSL 256 bits
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
