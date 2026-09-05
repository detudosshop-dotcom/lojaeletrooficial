import { Link } from "@tanstack/react-router";
import { storeProducts } from "@/lib/store-products";
import { useProduct } from "./ProductContext";

const BRL = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function StoreGallery() {
  const product = useProduct();
  // Mostra apenas produtos compráveis e exclui o produto atual
  const items = storeProducts.filter(
    (p) => p.href && p.slug !== product.slug,
  );

  if (items.length === 0) return null;

  return (
    <section className="bg-card py-4">
      <div className="mb-3 flex items-center justify-between px-4">
        <h3 className="text-sm font-semibold">Mais produtos da loja</h3>
        <Link to="/loja" className="text-xs font-semibold text-primary">
          Ver tudo
        </Link>
      </div>
      <div className="flex gap-3 overflow-x-auto scroll-smooth px-4 pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory">
        {items.map((item) => (
          <Link
            key={item.id}
            to={item.href!}
            className="group flex w-36 shrink-0 snap-start flex-col overflow-hidden rounded-xl border border-border bg-background"
          >
            <div className="aspect-square w-full overflow-hidden bg-white">
              <img
                src={item.image}
                alt={item.name}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-contain transition-transform group-hover:scale-105"
              />
            </div>
            <div className="flex flex-1 flex-col gap-1 p-2">
              <p className="line-clamp-2 text-xs leading-tight text-foreground">
                {item.name}
              </p>
              <div className="mt-auto">
                <p className="text-sm font-bold text-primary">
                  {BRL.format(item.price)}
                </p>
                {item.oldPrice > item.price && (
                  <p className="text-[10px] text-muted-foreground line-through">
                    {BRL.format(item.oldPrice)}
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
