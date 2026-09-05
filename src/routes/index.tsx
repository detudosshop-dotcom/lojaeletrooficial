import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ttqTrack } from "@/lib/ttq";
import { getProductBySlug, MAIN_PRODUCT_SLUG } from "@/lib/catalog";
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

const product = getProductBySlug(MAIN_PRODUCT_SLUG)!;

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: product.meta.title },
      { name: "description", content: product.meta.description },
    ],
  }),
});

function Index() {
  useEffect(() => {
    activeProductStore.set(product.slug);
    ttqTrack("ViewContent", {
      content_id: product.id,
      content_type: "product",
      content_name: product.shortName,
      currency: "BRL",
      value: product.price,
    });
  }, []);

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
