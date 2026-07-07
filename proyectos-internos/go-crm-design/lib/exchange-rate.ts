export interface UsdArsRate {
  value: number;
  source: string;
}

export async function fetchUsdArsRate(): Promise<UsdArsRate> {
  const res = await fetch("https://dolarapi.com/v1/dolares/oficial");
  if (!res.ok) throw new Error("No se pudo obtener la cotización");

  const data = await res.json();
  const value = data.venta ?? data.compra;
  if (typeof value !== "number") throw new Error("Respuesta inválida");

  return { value, source: "Dólar oficial (dolarapi.com)" };
}
