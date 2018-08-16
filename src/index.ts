// @ts-ignore
import LRU from "lru-cache";

import { DEFAULT_LRU_CACHE_CONFIG } from "./constants";
import { isPromise } from "./utils";
import { loadCache, writeCache } from "./cache-localstorage-plugin";

let cacheInstance: null | typeof LRU = null;

export const initCache = (lruConfig = DEFAULT_LRU_CACHE_CONFIG) => {
  if (cacheInstance !== null) {
    return cacheInstance;
  }
  cacheInstance = new LRU(lruConfig);
  loadCache(cacheInstance);
  writeCache(cacheInstance);
  return cacheInstance;
};

export const clearCacheAt = (key: any) => {
  const cache = initCache();
  cache.del(key);
  writeCache(cache);
};

export const withLocalStorageCache = (
  key: any,
  method: any,
  {
    onCacheMiss,
    onCacheHit
  }: { onCacheMiss?: Function; onCacheHit?: Function } = {}
) => {
  const cache = initCache();
  if (cache.has(key)) {
    const val = cache.get(key);
    onCacheHit && onCacheHit({ val });
    writeCache(cache);
    return val;
  }
  const result = method();
  onCacheMiss && onCacheMiss({ val: result });
  if (isPromise(result)) {
    return result.then((val: any) => {
      cache.set(key, val);
      writeCache(cache);
      return val;
    });
  }
  cache.set(key, result);
  writeCache(cache);
  return result;
};
