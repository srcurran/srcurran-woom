import type { APIRoute } from "astro";

export const prerender = false;

const UMAMI_SEND = "https://cloud.umami.is/api/send";
const FORWARD_HEADERS = ["content-type", "user-agent", "x-umami-cache"];

function withVisitorIp(body: string, ip: string): string {
  try {
    const event = JSON.parse(body);
    if (event?.payload && typeof event.payload === "object") event.payload.ip = ip;
    return JSON.stringify(event);
  } catch {
    return body;
  }
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const headers: Record<string, string> = {};
  for (const name of FORWARD_HEADERS) {
    const value = request.headers.get(name);
    if (value) headers[name] = value;
  }

  const upstream = await fetch(UMAMI_SEND, {
    method: "POST",
    headers,
    body: withVisitorIp(await request.text(), clientAddress),
  });

  return new Response(upstream.body, {
    status: upstream.status,
    headers: {
      "content-type": upstream.headers.get("content-type") ?? "application/json",
      "cache-control": "no-store",
    },
  });
};
