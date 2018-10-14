import store from "store2";

import { LS_CACHE_KEY } from "./constants";

export const loadCache = (cache: { load: (dump: any) => any }) => {
  const cacheDump = store.get(LS_CACHE_KEY);
  if (cacheDump === null) {
    cache.load("");
    return "";
  }
  const jsonCache = JSON.parse(cacheDump);
  for (let cacheItem of jsonCache) {
    if ("k" in cacheItem && "v" in cacheItem) {
      const { k, v } = cacheItem;
      store.set(k, v);
    }
  }
  return cache;
};

export const writeCache = (cache: { dump: () => any }) => {
  return store.set(LS_CACHE_KEY, cache.dump());
};
