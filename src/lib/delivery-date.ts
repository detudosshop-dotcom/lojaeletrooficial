import { useEffect, useState } from "react";
import { storeConfig } from "@/lib/store-config";

/** Dias úteis padrão até a entrega — usado em todas as telas até o pagamento. */
export const DELIVERY_DAYS = storeConfig.shipping.standardDeliveryDays;
export const EXPRESS_DELIVERY_DAYS = storeConfig.shipping.expressDeliveryDays;

const MONTHS_SHORT = [
  "jan", "fev", "mar", "abr", "mai", "jun",
  "jul", "ago", "set", "out", "nov", "dez",
];

const MONTHS_LONG = [
  "janeiro", "fevereiro", "março", "abril", "maio", "junho",
  "julho", "agosto", "setembro", "outubro", "novembro", "dezembro",
];

const WEEKDAYS = [
  "domingo", "segunda-feira", "terça-feira", "quarta-feira",
  "quinta-feira", "sexta-feira", "sábado",
];

export function getDeliveryDate(daysFromNow: number = DELIVERY_DAYS, from: Date = new Date()): Date {
  const d = new Date(from);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + daysFromNow);
  return d;
}

/** "29 de mai" — compacto, ideal para badges. */
export function formatDeliveryShort(date: Date): string {
  return `${date.getDate()} de ${MONTHS_SHORT[date.getMonth()]}`;
}

/** "quinta-feira, 29 de maio" — formato longo, ideal para destaque. */
export function formatDeliveryLong(date: Date): string {
  return `${WEEKDAYS[date.getDay()]}, ${date.getDate()} de ${MONTHS_LONG[date.getMonth()]}`;
}

/** Hook que retorna a data prevista de entrega e atualiza se o dia virar. */
export function useDeliveryDate(daysFromNow: number = DELIVERY_DAYS) {
  const [date, setDate] = useState<Date | null>(null);

  useEffect(() => {
    // Recalcula ao voltar pra aba (caso o usuário tenha deixado aberta)
    function recompute() {
      setDate(getDeliveryDate(daysFromNow));
    }
    recompute();
    document.addEventListener("visibilitychange", recompute);
    window.addEventListener("focus", recompute);

    // Atualiza no próximo dia, à meia-noite
    const now = new Date();
    const nextMidnight = new Date(now);
    nextMidnight.setHours(24, 0, 5, 0);
    const msUntilMidnight = nextMidnight.getTime() - now.getTime();
    const timer = window.setTimeout(recompute, msUntilMidnight);

    return () => {
      document.removeEventListener("visibilitychange", recompute);
      window.removeEventListener("focus", recompute);
      window.clearTimeout(timer);
    };
  }, [daysFromNow]);

  return {
    date: date ?? getDeliveryDate(daysFromNow),
    short: date ? formatDeliveryShort(date) : "",
    long: date ? formatDeliveryLong(date) : "",
  };
}
