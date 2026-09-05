import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCheckoutData } from "@/lib/checkout-store";
import { useProduct } from "./ProductContext";

export function Gallery() {
  const product = useProduct();
  const { color } = useCheckoutData();
  const colorOpt = product.colorOptions?.find((c) => c.label === color);
  const colorImages = colorOpt?.images;
  // Se a cor selecionada tem 1 foto que já está na galeria principal,
  // usamos a galeria principal e pulamos pro índice da cor.
  const useMain =
    !!colorImages && colorImages.length === 1 && product.images.includes(colorImages[0]);
  const images = useMain ? product.images : (colorImages ?? product.images);
  const targetIndex = useMain && colorImages ? product.images.indexOf(colorImages[0]) : 0;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    dragFree: false,
    containScroll: "trimSnaps",
    duration: 22,
  });
  const [selected, setSelected] = useState(0);
  const total = images.length;

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.reInit();
    emblaApi.scrollTo(targetIndex, true);
    setSelected(targetIndex);
  }, [emblaApi, color, targetIndex]);

  useEffect(() => {
    const preloadIndexes = [
      (selected + 1) % total,
      (selected - 1 + total) % total,
    ];
    preloadIndexes.forEach((i) => {
      const image = new Image();
      image.src = images[i];
    });
  }, [selected, total, images]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  return (
    <div className="relative w-full select-none bg-white">
      <div
        ref={emblaRef}
        className="overflow-hidden cursor-grab active:cursor-grabbing [touch-action:pan-y_pinch-zoom]"
      >
        <div className="flex touch-pan-y">
          {images.map((src, i) => (
            <div
              key={src}
              className="relative aspect-square w-full min-w-0 flex-[0_0_100%]"
            >
              <img
                src={src}
                alt={`${product.shortName} - imagem ${i + 1}`}
                className="h-full w-full object-contain"
                loading={i <= 1 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : "auto"}
                decoding="async"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={scrollPrev}
        aria-label="Imagem anterior"
        className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow transition-transform hover:scale-105 hover:bg-white"
      >
        <ChevronLeft className="h-5 w-5 text-muted-foreground" />
      </button>
      <button
        type="button"
        onClick={scrollNext}
        aria-label="Próxima imagem"
        className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow transition-transform hover:scale-105 hover:bg-white"
      >
        <ChevronRight className="h-5 w-5 text-muted-foreground" />
      </button>

      <div className="absolute bottom-3 right-3 rounded-full bg-black/60 px-2.5 py-0.5 text-xs font-medium text-white">
        {selected + 1} / {total}
      </div>

      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => scrollTo(i)}
            aria-label={`Ir para imagem ${i + 1}`}
            className={cn(
              "h-1.5 rounded-full bg-white/60 shadow transition-all",
              selected === i ? "w-5 bg-white" : "w-1.5",
            )}
          />
        ))}
      </div>
    </div>
  );
}
