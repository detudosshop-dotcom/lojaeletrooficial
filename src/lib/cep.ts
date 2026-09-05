export type CepAddress = {
  street: string;
  neighborhood: string;
  city: string;
  state: string;
};

export function onlyDigits(v: string) {
  return v.replace(/\D/g, "");
}

/**
 * Busca endereço pelo CEP usando ViaCEP com fallback para BrasilAPI.
 * Nunca lança: retorna null quando não consegue resolver.
 */
export async function lookupCep(
  cep: string,
  signal?: AbortSignal,
): Promise<CepAddress | null> {
  const digits = onlyDigits(cep);
  if (digits.length !== 8) return null;

  try {
    const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`, { signal });
    if (res.ok) {
      const json = (await res.json()) as Record<string, string> & { erro?: boolean | string };
      if (!json.erro) {
        return {
          street: json.logradouro ?? "",
          neighborhood: json.bairro ?? "",
          city: json.localidade ?? "",
          state: (json.uf ?? "").toUpperCase(),
        };
      }
      return null;
    }
  } catch (err) {
    if ((err as Error)?.name === "AbortError") return null;
  }

  try {
    const res = await fetch(`https://brasilapi.com.br/api/cep/v1/${digits}`, { signal });
    if (!res.ok) return null;
    const json = (await res.json()) as Record<string, string>;
    return {
      street: json.street ?? "",
      neighborhood: json.neighborhood ?? "",
      city: json.city ?? "",
      state: (json.state ?? "").toUpperCase(),
    };
  } catch {
    return null;
  }
}
