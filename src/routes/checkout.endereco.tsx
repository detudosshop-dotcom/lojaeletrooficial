import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  Check,
  Loader2,
  Lock,
  ShieldCheck,
  User,
  MapPin,
  Mail,
  Phone,
  CreditCard,
  Truck,
} from "lucide-react";
import { z } from "zod";
import { checkoutStore, hydrateCheckoutStore, useCheckoutData } from "@/lib/checkout-store";
import { lookupCep, onlyDigits } from "@/lib/cep";
import { CheckoutSteps } from "@/components/checkout/CheckoutSteps";
import { WarrantyBadge } from "@/components/common/WarrantyBadge";
import { DeliveryDateBadge } from "@/components/common/DeliveryDateBadge";

import { ttqTrack } from "@/lib/ttq";
import { useActiveProductSlug } from "@/lib/active-product-store";
import { getProductBySlug, MAIN_PRODUCT_SLUG } from "@/lib/catalog";
import { computeOrderTotals } from "@/lib/pricing";
import { storeConfig, warrantyLabel } from "@/lib/store-config";

export const Route = createFileRoute("/checkout/endereco")({
  component: EnderecoPage,
  head: () => ({ meta: [{ title: "Endereço de entrega" }] }),
});

function isValidCpf(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(digits)) return false;

  const calc = (length: number) => {
    let sum = 0;
    for (let i = 0; i < length; i++) {
      sum += parseInt(digits[i], 10) * (length + 1 - i);
    }
    const rest = (sum * 10) % 11;
    return rest === 10 ? 0 : rest;
  };

  return calc(9) === parseInt(digits[9], 10) && calc(10) === parseInt(digits[10], 10);
}

const schema = z.object({
  fullName: z.string().trim().min(3, "Informe seu nome completo").max(100),
  cpf: z
    .string()
    .trim()
    .refine(isValidCpf, "CPF inválido"),
  email: z.string().trim().email("E-mail inválido").max(255),
  phone: z
    .string()
    .trim()
    .refine((v) => {
      const d = v.replace(/\D/g, "");
      return (d.length === 11 && d[2] === "9") || d.length === 10;
    }, "Telefone inválido. Ex: (11) 99999-9999"),
  cep: z.string().trim().regex(/^\d{5}-\d{3}$/, "CEP inválido"),
  street: z.string().trim().min(2, "Informe a rua").max(120),
  number: z.string().trim().min(1, "Informe o número").max(10),
  complement: z.string().trim().max(60).optional().or(z.literal("")),
  neighborhood: z.string().trim().min(2, "Informe o bairro").max(80),
  city: z.string().trim().min(2, "Informe a cidade").max(80),
  state: z
    .string()
    .trim()
    .length(2, "UF deve ter 2 letras")
    .transform((v) => v.toUpperCase()),
});

function maskCep(v: string) {
  const digits = v.replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
}

function maskCpf(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `${d.slice(0, 3)}.${d.slice(3)}`;
  if (d.length <= 9) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`;
  return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;
}

function maskPhone(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

function Field({
  label,
  error,
  icon: Icon,
  children,
  hint,
}: {
  label: string;
  error?: string;
  icon?: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-foreground">
        {Icon && <Icon className="h-3.5 w-3.5 text-muted-foreground" />}
        {label}
      </span>
      {children}
      {hint && !error && (
        <span className="mt-1 block text-[11px] text-muted-foreground">{hint}</span>
      )}
      {error && (
        <span className="mt-1 flex items-center gap-1 text-xs font-medium text-destructive">
          {error}
        </span>
      )}
    </label>
  );
}

function EnderecoPage() {
  const data = useCheckoutData();
  const navigate = useNavigate();
  const slug = useActiveProductSlug();
  const product = getProductBySlug(slug) ?? getProductBySlug(MAIN_PRODUCT_SLUG)!;
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [cepLoading, setCepLoading] = useState(false);
  const [cepNotFound, setCepNotFound] = useState(false);

  const fieldRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const setRef = (k: string) => (el: HTMLInputElement | null) => {
    fieldRefs.current[k] = el;
  };
  const cepAbort = useRef<AbortController | null>(null);
  const lastCepLookup = useRef<string>("");

  // Não apaga dados já preenchidos ao voltar uma etapa / recarregar
  useEffect(() => {
    hydrateCheckoutStore();
  }, []);

  const inputCls =
    "w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-all placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/15";

  const clearError = (k: string) =>
    setErrors((prev) => (prev[k] ? { ...prev, [k]: "" } : prev));

  const update = (k: keyof typeof data) => (e: React.ChangeEvent<HTMLInputElement>) => {
    checkoutStore.set({ [k]: e.target.value } as Partial<typeof data>);
    clearError(k as string);
  };

  const runCepLookup = async (digits: string) => {
    if (lastCepLookup.current === digits) return;
    lastCepLookup.current = digits;
    cepAbort.current?.abort();
    const controller = new AbortController();
    cepAbort.current = controller;
    setCepLoading(true);
    setCepNotFound(false);
    const found = await lookupCep(digits, controller.signal);
    if (controller.signal.aborted) return;
    setCepLoading(false);
    if (!found) {
      setCepNotFound(true);
      return;
    }
    checkoutStore.set({
      street: found.street || checkoutStore.get().street,
      neighborhood: found.neighborhood || checkoutStore.get().neighborhood,
      city: found.city || checkoutStore.get().city,
      state: found.state || checkoutStore.get().state,
    });
    setErrors((prev) => ({ ...prev, street: "", neighborhood: "", city: "", state: "" }));
    // leva o usuário direto ao próximo campo manual
    requestAnimationFrame(() => fieldRefs.current.number?.focus());
  };

  const onCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const masked = maskCep(e.target.value);
    checkoutStore.set({ cep: masked });
    clearError("cep");
    const digits = onlyDigits(masked);
    if (digits.length < 8) {
      setCepNotFound(false);
      lastCepLookup.current = "";
      cepAbort.current?.abort();
      setCepLoading(false);
      return;
    }
    void runCepLookup(digits);
  };

  const focusNext = (key: string) => (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    fieldRefs.current[key]?.focus();
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(data);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((i) => {
        const key = String(i.path[0]);
        if (!fieldErrors[key]) fieldErrors[key] = i.message;
      });
      setErrors(fieldErrors);
      const order = [
        "fullName",
        "cpf",
        "email",
        "phone",
        "cep",
        "street",
        "number",
        "neighborhood",
        "city",
        "state",
      ];
      const firstKey = order.find((k) => fieldErrors[k]);
      setTimeout(() => {
        const el = firstKey ? fieldRefs.current[firstKey] : null;
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
          el.focus({ preventScroll: true });
        } else {
          document
            .querySelector("[data-error='true']")
            ?.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 50);
      return;
    }
    setErrors({});
    checkoutStore.set(result.data);
    ttqTrack("AddPaymentInfo", {
      content_id: product.id,
      currency: "BRL",
      value:
        computeOrderTotals({
          unitPrice: product.price,
          quantity: data.quantity || 1,
          express: data.shipping === "expresso",
        }).totalCents / 100,
    });
    navigate({ to: "/checkout/pagamento" });
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col bg-muted">
      <header className="sticky top-0 z-40 flex items-center gap-2 border-b border-border bg-background px-3 py-3 shadow-sm">
        <Link
          to="/checkout"
          aria-label="Voltar"
          className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-muted"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="flex-1 text-center text-base font-semibold">Endereço de entrega</h1>
        <div className="flex h-9 w-9 items-center justify-center">
          <Lock className="h-4 w-4 text-success" />
        </div>
      </header>

      <form
        onSubmit={onSubmit}
        className="flex flex-1 flex-col gap-2"
        style={{ paddingBottom: "calc(7rem + env(safe-area-inset-bottom))" }}
      >
        <CheckoutSteps current={2} />

        <DeliveryDateBadge />

        {/* Faixa de segurança */}
        <div className="flex items-center justify-center gap-2 bg-success/10 px-4 py-2.5 text-[11px] font-semibold text-success">
          <Lock className="h-3.5 w-3.5" />
          <span>{storeConfig.security.sslLabel}</span>
        </div>


        <section className="space-y-4 bg-card px-4 py-5">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
              <User className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h2 className="text-sm font-bold leading-tight">Dados pessoais</h2>
              <p className="text-[11px] text-muted-foreground">
                {storeConfig.policies.invoice ? "Para emissão da nota fiscal" : "Para identificação do pedido"}
              </p>
            </div>
          </div>

          <Field label="Nome completo" error={errors.fullName} icon={User}>
            <input
              className={inputCls}
              value={data.fullName}
              onChange={update("fullName")}
              placeholder="Como aparece no seu documento"
              data-error={!!errors.fullName}
              autoComplete="name"
              ref={setRef("fullName")}
              enterKeyHint="next"
              onKeyDown={focusNext("cpf")}
            />
          </Field>
          <Field label="CPF" error={errors.cpf} icon={CreditCard}>
            <div className="relative">
              <input
                className={inputCls}
                value={data.cpf}
                onChange={(e) => {
                  checkoutStore.set({ cpf: maskCpf(e.target.value) });
                  clearError("cpf");
                }}
                placeholder="000.000.000-00"
                inputMode="numeric"
                maxLength={14}
                data-error={!!errors.cpf}
                autoComplete="off"
                ref={setRef("cpf")}
                enterKeyHint="next"
                onKeyDown={focusNext("email")}
              />
              {isValidCpf(data.cpf) && (
                <span className="absolute right-3 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full bg-success">
                  <Check className="h-3 w-3 text-primary-foreground" strokeWidth={3} />
                </span>
              )}
            </div>
          </Field>
          <Field
            label="E-mail"
            error={errors.email}
            icon={Mail}
            hint="Enviaremos a confirmação e o código de rastreio"
          >
            <input
              className={inputCls}
              type="email"
              value={data.email}
              onChange={update("email")}
              placeholder="seu@email.com"
              data-error={!!errors.email}
              autoComplete="email"
              inputMode="email"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              ref={setRef("email")}
              enterKeyHint="next"
              onKeyDown={focusNext("phone")}
            />
          </Field>
          <Field label="Telefone / WhatsApp" error={errors.phone} icon={Phone}>
            <input
              className={inputCls}
              value={data.phone}
              onChange={(e) => {
                checkoutStore.set({ phone: maskPhone(e.target.value) });
                clearError("phone");
              }}
              placeholder="(11) 99999-9999"
              inputMode="numeric"
              maxLength={15}
              data-error={!!errors.phone}
              autoComplete="tel"
              ref={setRef("phone")}
              enterKeyHint="next"
              onKeyDown={focusNext("cep")}
            />
          </Field>
        </section>

        <section className="space-y-4 bg-card px-4 py-5">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
              <MapPin className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h2 className="text-sm font-bold leading-tight">Endereço de entrega</h2>
              <p className="text-[11px] text-muted-foreground">Onde devemos entregar seu pedido</p>
            </div>
          </div>

          <Field
            label="CEP"
            error={errors.cep}
            hint={
              cepLoading
                ? "Buscando endereço..."
                : cepNotFound
                  ? "Não localizamos esse CEP. Preencha o endereço manualmente."
                  : "Preenchemos o endereço automaticamente"
            }
          >
            <div className="relative">
              <input
                className={inputCls}
                value={data.cep}
                onChange={onCepChange}
                placeholder="00000-000"
                inputMode="numeric"
                maxLength={9}
                data-error={!!errors.cep}
                autoComplete="postal-code"
                ref={setRef("cep")}
                enterKeyHint="next"
                onKeyDown={focusNext("number")}
              />
              {cepLoading && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                </span>
              )}
              {!cepLoading && onlyDigits(data.cep).length === 8 && !cepNotFound && data.city && (
                <span className="absolute right-3 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full bg-success">
                  <Check className="h-3 w-3 text-primary-foreground" strokeWidth={3} />
                </span>
              )}
            </div>
          </Field>
          <Field label="Rua / Logradouro" error={errors.street}>
            <input
              className={inputCls}
              value={data.street}
              onChange={update("street")}
              placeholder="Ex: Av. Paulista"
              data-error={!!errors.street}
              autoComplete="address-line1"
              ref={setRef("street")}
              enterKeyHint="next"
              onKeyDown={focusNext("number")}
            />
          </Field>
          <div className="grid grid-cols-[110px_1fr] gap-3">
            <Field label="Número" error={errors.number}>
              <input
                className={inputCls}
                value={data.number}
                onChange={update("number")}
                inputMode="numeric"
                placeholder="123"
                data-error={!!errors.number}
                autoComplete="address-line2"
                ref={setRef("number")}
                enterKeyHint="next"
                onKeyDown={focusNext("complement")}
              />
            </Field>
            <Field label="Complemento" error={errors.complement}>
              <input
                className={inputCls}
                value={data.complement}
                onChange={update("complement")}
                placeholder="Apto, bloco (opcional)"
                ref={setRef("complement")}
                enterKeyHint="done"
              />
            </Field>
          </div>
          <Field label="Bairro" error={errors.neighborhood}>
            <input
              className={inputCls}
              value={data.neighborhood}
              onChange={update("neighborhood")}
              placeholder="Ex: Centro"
              data-error={!!errors.neighborhood}
              autoComplete="address-level3"
              ref={setRef("neighborhood")}
              enterKeyHint="next"
              onKeyDown={focusNext("city")}
            />
          </Field>
          <div className="grid grid-cols-[1fr_90px] gap-3">
            <Field label="Cidade" error={errors.city}>
              <input
                className={inputCls}
                value={data.city}
                onChange={update("city")}
                placeholder="Ex: São Paulo"
                data-error={!!errors.city}
                autoComplete="address-level2"
                ref={setRef("city")}
                enterKeyHint="next"
                onKeyDown={focusNext("state")}
              />
            </Field>
            <Field label="UF" error={errors.state}>
              <input
                className={`${inputCls} text-center uppercase`}
                value={data.state}
                onChange={update("state")}
                maxLength={2}
                placeholder="SP"
                data-error={!!errors.state}
                autoComplete="address-level1"
                autoCapitalize="characters"
                ref={setRef("state")}
                enterKeyHint="done"
              />
            </Field>
          </div>
        </section>

        {/* Selos de confiança */}
        <section className="space-y-3 bg-card px-4 py-4">
          <WarrantyBadge variant="compact" />
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2 rounded-md border border-border bg-background px-2.5 py-2">
              <Truck className="h-4 w-4 shrink-0 text-primary" />
              <div className="leading-tight">
                <p className="text-[11px] font-bold">Envio rastreado</p>
                <p className="text-[10px] text-muted-foreground">{storeConfig.shipping.trackingLabel}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-md border border-border bg-background px-2.5 py-2">
              <ShieldCheck className="h-4 w-4 shrink-0 text-success" />
              <div className="leading-tight">
                <p className="text-[11px] font-bold">Dados protegidos</p>
                <p className="text-[10px] text-muted-foreground">{storeConfig.security.lgpdLabel}</p>
              </div>
            </div>
          </div>
          <p className="flex items-start gap-1.5 text-[10.5px] leading-relaxed text-muted-foreground">
            <Lock className="mt-0.5 h-3 w-3 shrink-0 text-success" />
            Seus dados são usados apenas para processar e entregar o seu pedido. Não compartilhamos
            com terceiros.
          </p>
        </section>

        <div
          className="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-md border-t border-border bg-card p-3 shadow-[0_-4px_12px_rgba(0,0,0,0.06)]"
          style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
        >
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#fe2c55] hover:bg-[#e02449] py-3.5 text-base font-bold text-white shadow-md shadow-[#fe2c55]/25 transition active:scale-[0.99]"
          >
            <Lock className="h-4 w-4" />
            Continuar para pagamento
          </button>
          <p className="mt-1.5 text-center text-[10.5px] text-muted-foreground">
            {storeConfig.security.sslLabel} · {warrantyLabel()}
          </p>
        </div>
      </form>
    </div>
  );
}
