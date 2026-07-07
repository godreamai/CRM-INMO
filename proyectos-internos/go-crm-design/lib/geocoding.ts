export interface AddressSuggestion {
  id: string;
  label: string;
}

export async function searchAddress(query: string): Promise<AddressSuggestion[]> {
  const params = new URLSearchParams({
    format: "json",
    q: query,
    limit: "5",
    countrycodes: "ar",
  });

  const res = await fetch(`https://nominatim.openstreetmap.org/search?${params}`, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("No se pudo buscar la direccion");

  const data: Array<{ place_id: number; display_name: string }> = await res.json();
  return data.map((item) => ({ id: String(item.place_id), label: item.display_name }));
}
