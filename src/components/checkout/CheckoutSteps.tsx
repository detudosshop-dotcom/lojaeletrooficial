import { Check } from "lucide-react";

type Step = 1 | 2 | 3;

const labels: Record<Step, string> = {
  1: "Resumo",
  2: "Endereço",
  3: "Pagamento",
};

export function CheckoutSteps({ current }: { current: Step }) {
  const steps: Step[] = [1, 2, 3];
  return (
    <div className="bg-card px-4 py-3">
      <div className="flex items-center justify-between">
        {steps.map((s, idx) => {
          const done = s < current;
          const active = s === current;
          return (
            <div key={s} className="flex flex-1 items-center">
              <div className="flex flex-col items-center gap-1">
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                    done
                      ? "bg-success text-primary-foreground"
                      : active
                      ? "bg-primary text-primary-foreground ring-4 ring-primary/15"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {done ? <Check className="h-4 w-4" strokeWidth={3} /> : s}
                </div>
                <span
                  className={`text-[10px] font-medium leading-none ${
                    active ? "text-primary" : done ? "text-success" : "text-muted-foreground"
                  }`}
                >
                  {labels[s]}
                </span>
              </div>
              {idx < steps.length - 1 && (
                <div
                  className={`mx-2 mt-[-14px] h-0.5 flex-1 rounded ${
                    s < current ? "bg-success" : "bg-muted"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
