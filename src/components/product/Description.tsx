import { useProduct } from "./ProductContext";

export function Description() {
  const { description } = useProduct();

  return (
    <section className="space-y-5 bg-card px-4 py-5">
      <h2 className="text-base font-semibold">Descrição</h2>

      <p className="text-sm font-medium text-foreground">{description.intro}</p>

      <ul className="space-y-3">
        {description.features.map(([title, desc]) => (
          <li key={title} className="text-sm">
            <span className="font-semibold text-foreground">✔ {title}</span>
            <p className="mt-0.5 text-muted-foreground">{desc}</p>
          </li>
        ))}
      </ul>

      <div>
        <h3 className="mb-2 text-sm font-semibold">Especificações Técnicas</h3>
        <ul className="space-y-1 text-sm text-muted-foreground">
          {description.specs.map((s) => (
            <li key={s}>• {s}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-semibold">Ideal para</h3>
        <ul className="space-y-1 text-sm text-muted-foreground">
          {description.idealFor.map((s) => (
            <li key={s}>✔ {s}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-semibold">O que você recebe</h3>
        <ul className="space-y-1 text-sm text-muted-foreground">
          {description.includes.map((s) => (
            <li key={s}>✔ {s}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
