import { useEffect } from "react";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { ttqTrack } from "@/lib/ttq";
import { getProductBySlug } from "@/lib/catalog";
import { activeProductStore } from "@/lib/active-product-store";
import { ProductProvider } from "@/components/product/ProductContext";
import { TopBar } from "@/components/product/TopBar";
import { Gallery } from "@/components/product/Gallery";
import { PriceBanner } from "@/components/product/PriceBanner";
import { ProductInfo } from "@/components/product/ProductInfo";
import { Description } from "@/components/product/Description";
import { Store } from "@/components/product/Store";
import { Reviews } from "@/components/product/Reviews";
import { TrustBar } from "@/components/product/TrustBar";
import { BuyBar } from "@/components/product/BuyBar";
import { StoreGallery } from "@/components/product/StoreGallery";

export const Route = createFileRoute("/produto/$slug")({
  loader: ({ params }) => {
    const product = getProductBySlug(params.slug);
    if (!product) throw notFound();
    return product;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Produto" }] };
    return {
      meta: [
        { title: loaderData.meta.title },
        { name: "description", content: loaderData.meta.description },
        { property: "og:title", content: loaderData.meta.title },
        { property: "og:description", content: loaderData.meta.description },
        { property: "og:image", content: loaderData.images[0] },
        { property: "twitter:image", content: loaderData.images[0] },
      ],
    };
  },
  component: ProductPage,
  notFoundComponent: () => (
    <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center gap-3 bg-muted p-6 text-center">
      <h1 className="text-lg font-bold">Produto não encontrado</h1>
      <p className="text-sm text-muted-foreground">
        O produto que você procura não existe ou saiu de linha.
      </p>
      <a href="/loja" className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground">
        Ver loja
      </a>
    </div>
  ),
});

function ProductPage() {
  const product = Route.useLoaderData();

  useEffect(() => {
    activeProductStore.set(product.slug);
    ttqTrack("ViewContent", {
      content_id: product.id,
      content_type: "product",
      content_name: product.shortName,
      currency: "BRL",
      value: product.price,
    });
  }, [product]);

  return (
    <ProductProvider product={product}>
      <div className="mx-auto flex min-h-screen max-w-md flex-col bg-muted">
        <TopBar />
        <main
          className="flex flex-1 flex-col gap-2"
          style={{ paddingBottom: "calc(7rem + env(safe-area-inset-bottom))" }}
        >
          <Gallery />
          <PriceBanner />
          <ProductInfo />
          <Description />
          <Store />
          <TrustBar />
          <Reviews />
          <StoreGallery />
        </main>
        <BuyBar />
      </div>
    </ProductProvider>
  );
}
