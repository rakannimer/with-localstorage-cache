import store from "store2";

import { LS_CACHE_KEY } from "./constants";

export const loadCache = (cache: { load: (dump: any) => any }) => {
  const cacheDump = store.get(LS_CACHE_KEY);
  if (cacheDump === null) {
    cache.load("");
    return "";
  }
  cache.load(cacheDump);
  return cache;
};

export const writeCache = (cache: { dump: () => any }) => {
  return store.set(LS_CACHE_KEY, cache.dump());
};
