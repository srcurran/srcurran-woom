import type { APIRoute } from "astro";

/**
 * srcurran.com/macthing/* is the MacThing site (github.com/srcurran/macthing-site), its own Vercel
 * project built with base /macthing/. This passes each request through to it. A vercel.json rewrite
 * can't do this: Vercel applies those after this site's routes, so [name] would answer first.
 */
export const prerender = false;

const origin = "https://macthing-site.vercel.app";
const passHeaders = ["content-type", "cache-control", "etag", "last-modified"];

const proxy: APIRoute = async ({ request, url }) => {
  const path = url.pathname.slice("/macthing".length) || "/";
  const upstream = await fetch(`${origin}${path}${url.search}`, {
    method: request.method,
    headers: { accept: request.headers.get("accept") ?? "*/*" },
  });

  const headers = new Headers();
  for (const name of passHeaders) {
    const value = upstream.headers.get(name);
    if (value) headers.set(name, value);
  }
  // Fingerprinted assets keep their long cache; pages are cached at the edge for a few minutes.
  if (!path.startsWith("/_astro/")) {
    headers.set("cache-control", "public, max-age=0, s-maxage=300, stale-while-revalidate=86400");
  }

  return new Response(upstream.body, { status: upstream.status, headers });
};

export const GET = proxy;
export const HEAD = proxy;
