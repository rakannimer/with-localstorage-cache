export const LS_CACHE_KEY = "with-ls-cache:store";
export const TTL = 60 * 60; // Seconds
export const MAX_SIZE = 1000;
export const DEFAULT_LRU_CACHE_CONFIG = {
  max: MAX_SIZE,
  length: () => 1,
  dispose: () => {},
  maxAge: TTL
};
