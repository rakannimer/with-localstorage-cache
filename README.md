## with-localstorage-cache

Wrap any method, sync or async with a local storage cache.

## Usage

```typescript
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const myID = await withFsCache(
  // Can be anything
  "my-id",
  async () => {
    await sleep(500);
    functionCallCount += 1;
    return { someData: "1" };
  }
);

// If called again it will return without waiting.
```
