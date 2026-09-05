import { useState } from "react";
import { Star } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useProduct } from "./ProductContext";

export function Reviews() {
  const product = useProduct();
  const reviews = product.reviewsList;
  const remaining = Math.max(0, product.reviewsTotal - reviews.length);
  const [preview, setPreview] = useState<{ src: string; name: string } | null>(null);

  return (
    <section className="space-y-4 bg-card px-4 py-5">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold">
          Avaliações dos clientes ({product.reviewsTotal})
        </h2>
        <div className="flex items-center gap-1 text-sm">
          <Star className="h-4 w-4 fill-star text-star" />
          <span className="font-semibold">{product.rating}/5</span>
        </div>
      </div>

      <ul className="divide-y divide-border">
        {reviews.map((r, idx) => (
          <li key={idx} className="space-y-2 py-4 first:pt-0">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-sm font-semibold text-foreground">
                {r.initial}
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium">{r.name}</div>
                <div className="text-xs text-muted-foreground">{r.date}</div>
              </div>
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-star text-star" />
                ))}
              </div>
            </div>
            <p className="text-sm text-foreground">{r.text}</p>
            {r.photos.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {r.photos.map((src, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setPreview({ src, name: r.name })}
                    className="overflow-hidden rounded-md border border-border transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary"
                    aria-label={`Ampliar foto da avaliação de ${r.name}`}
                  >
                    <img
                      src={src}
                      alt={`Foto da avaliação de ${r.name}`}
                      className="h-20 w-20 object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="w-full rounded-md border border-border py-2.5 text-sm font-medium text-foreground hover:bg-muted"
      >
        Ver mais avaliações ({remaining} restantes)
      </button>

      <Dialog open={!!preview} onOpenChange={(open) => !open && setPreview(null)}>
        <DialogContent className="max-w-3xl border-none bg-transparent p-0 shadow-none">
          <DialogTitle className="sr-only">
            {preview ? `Foto da avaliação de ${preview.name}` : "Foto da avaliação"}
          </DialogTitle>
          {preview && (
            <img
              src={preview.src}
              alt={`Foto ampliada da avaliação de ${preview.name}`}
              className="mx-auto max-h-[85vh] w-auto rounded-lg object-contain"
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
