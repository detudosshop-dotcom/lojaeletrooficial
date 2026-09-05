// Wrapper seguro para o TikTok Pixel (ttq).
// Funciona em SSR (no-op) e no browser quando o pixel já carregou.
//
// Suporta múltiplos pixels:
// - Pixel global (carregado no __root.tsx) recebe TODOS os eventos
// - Pixels por produto (mapeados em PRODUCT_PIXELS) recebem eventos
//   apenas quando o evento é referente ao produto correspondente
//   (identificado via params.content_id).

type TTQInstance = {
  track: (event: string, params?: Record<string, unknown>) => void;
  page: () => void;
};

type TTQ = TTQInstance & {
  load: (pixelId: string) => void;
  instance: (pixelId: string) => TTQInstance;
};

declare global {
  interface Window {
    ttq?: TTQ;
  }
}

// Pixels específicos por produto (content_id -> pixelId TikTok)
const PRODUCT_PIXELS: Record<string, string> = {
  "lav-1300": "D7CJ4OJC77UA7GO31R9G",
};

const loadedPixels = new Set<string>();

function ensurePixelLoaded(pixelId: string) {
  if (typeof window === "undefined" || !window.ttq) return;
  if (loadedPixels.has(pixelId)) return;
  try {
    window.ttq.load(pixelId);
    window.ttq.instance(pixelId).page();
    loadedPixels.add(pixelId);
  } catch (err) {
    console.warn("ttq load failed", pixelId, err);
  }
}

export function ttqTrack(event: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  try {
    // Pixel global
    window.ttq?.track(event, params);

    // Pixel específico do produto (se houver)
    const contentId = params?.content_id;
    if (typeof contentId === "string") {
      const pixelId = PRODUCT_PIXELS[contentId];
      if (pixelId) {
        ensurePixelLoaded(pixelId);
        window.ttq?.instance(pixelId).track(event, params);
      }
    }
  } catch (err) {
    console.warn("ttq track failed", err);
  }
}

export function ttqPage() {
  if (typeof window === "undefined") return;
  try {
    window.ttq?.page();
    // dispara page() em todos os pixels já carregados
    for (const pixelId of loadedPixels) {
      window.ttq?.instance(pixelId).page();
    }
  } catch (err) {
    console.warn("ttq page failed", err);
  }
}
