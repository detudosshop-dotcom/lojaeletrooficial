// Captura e persiste parâmetros UTM/click IDs da URL para envio à Utmify.
const STORAGE_KEY = "lovable_utm_params_v1";

export type TrackingParameters = {
  src: string | null;
  sck: string | null;
  utm_source: string | null;
  utm_campaign: string | null;
  utm_medium: string | null;
  utm_content: string | null;
  utm_term: string | null;
};

const EMPTY: TrackingParameters = {
  src: null,
  sck: null,
  utm_source: null,
  utm_campaign: null,
  utm_medium: null,
  utm_content: null,
  utm_term: null,
};

const KEYS: (keyof TrackingParameters)[] = [
  "src",
  "sck",
  "utm_source",
  "utm_campaign",
  "utm_medium",
  "utm_content",
  "utm_term",
];

export function captureUtmFromUrl() {
  if (typeof window === "undefined") return;
  try {
    const params = new URLSearchParams(window.location.search);
    const stored = getTracking();
    let changed = false;
    const next: TrackingParameters = { ...stored };
    for (const k of KEYS) {
      const v = params.get(k);
      if (v && v !== next[k]) {
        next[k] = v;
        changed = true;
      }
    }
    if (changed) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    }
  } catch (err) {
    console.warn("captureUtmFromUrl failed", err);
  }
}

export function getTracking(): TrackingParameters {
  if (typeof window === "undefined") return { ...EMPTY };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...EMPTY };
    const parsed = JSON.parse(raw) as Partial<TrackingParameters>;
    return { ...EMPTY, ...parsed };
  } catch {
    return { ...EMPTY };
  }
}
