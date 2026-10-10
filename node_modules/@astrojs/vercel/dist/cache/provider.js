import {
  buildCacheControlDirectives,
  collectInvalidationTags,
  pathTag,
  setConditionalHeaders
} from "astro/cache/provider-utils";
const factory = () => {
  return {
    name: "vercel",
    setHeaders(options, request) {
      const headers = new Headers();
      const directives = buildCacheControlDirectives(options, ["public"]);
      if (directives) {
        headers.set("Vercel-CDN-Cache-Control", directives);
      }
      const tags = [...options.tags ?? []];
      const { pathname } = new URL(request.url);
      tags.push(pathTag(pathname));
      headers.set("Vercel-Cache-Tag", tags.join(","));
      setConditionalHeaders(headers, options);
      return headers;
    },
    async invalidate(options) {
      const { invalidateByTag } = await import("@vercel/functions");
      const tags = collectInvalidationTags(options);
      await Promise.all(tags.map((tag) => invalidateByTag(tag)));
    }
  };
};
var provider_default = factory;
export {
  provider_default as default
};
