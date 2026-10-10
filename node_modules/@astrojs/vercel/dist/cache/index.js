function cacheVercel() {
  return {
    name: "vercel",
    entrypoint: "@astrojs/vercel/cache/provider"
  };
}
export {
  cacheVercel
};
