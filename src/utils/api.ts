const API_URL = import.meta.env.VITE_API_URL;

export async function apiFetch<T>(
  url: string,
  { json, method }: { json?: Record<string, unknown>; method?: string } = {},
): Promise<T> {
  method ??= json ? "POST" : "GET";
  const body = json ? JSON.stringify(json) : undefined;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const request = await fetch(`${API_URL}/${url}`, {
    method,
    mode: "cors",
    credentials: "include",
    headers,
    body,
  });

  if (!request.ok) {
    throw new Error(await request.text());
  }

  return request.json() as Promise<T>;
}
