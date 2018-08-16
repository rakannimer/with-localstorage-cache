require("jsdom-global")();

const { clearCacheAt, withLocalStorageCache } = require("../dist/index.cjs");

const assert = (expectedToBeTrue: boolean, message = "Assertion Failed") => {
  if (expectedToBeTrue === false) {
    throw new Error(message);
  }
};

const testWithVoidReturningMethod = async () => {
  let functionCallCount = 0;
  await clearCacheAt("a");
  await withLocalStorageCache("a", async () => {
    functionCallCount += 1;
  });
  await withLocalStorageCache("a", async () => {
    functionCallCount += 1;
  });
  await clearCacheAt("a");
  assert(functionCallCount === 1);
};

const testWithNumberReturningMethod = async () => {
  let functionCallCount = 0;
  await clearCacheAt("a");
  const resultFromFirstCall = await withLocalStorageCache("a", async () => {
    functionCallCount += 1;
    return 1;
  });
  const resultFromSecondCall = await withLocalStorageCache("a", async () => {
    functionCallCount += 1;
    return 1;
  });
  await clearCacheAt("a");
  assert(functionCallCount === 1);
  assert(resultFromSecondCall === resultFromFirstCall);
};

const testWithStringReturningMethod = async () => {
  let functionCallCount = 0;
  await clearCacheAt("a");
  const resultFromFirstCall = await withLocalStorageCache("a", async () => {
    functionCallCount += 1;
    return "1";
  });
  const resultFromSecondCall = await withLocalStorageCache("a", async () => {
    functionCallCount += 1;
    return "1";
  });
  await clearCacheAt("a");
  assert(functionCallCount === 1);
  assert(resultFromSecondCall === resultFromFirstCall);
};

const testWithObjectReturningMethod = async () => {
  let functionCallCount = 0;
  await clearCacheAt("a");
  const resultFromFirstCall = await withLocalStorageCache("a", async () => {
    functionCallCount += 1;
    return { someData: "1" };
  });
  const resultFromSecondCall = await withLocalStorageCache("a", async () => {
    functionCallCount += 1;
    return { someData: "1" };
  });
  await clearCacheAt("a");
  const s = JSON.stringify;
  assert(functionCallCount === 1);
  assert(s(resultFromSecondCall) === s(resultFromFirstCall));
};

const testWithArrayReturningMethod = async () => {
  let functionCallCount = 0;
  await clearCacheAt("a");
  const resultFromFirstCall = await withLocalStorageCache("a", async () => {
    functionCallCount += 1;
    return [{ someData: "1" }, "b", 2];
  });
  const resultFromSecondCall = await withLocalStorageCache("a", async () => {
    functionCallCount += 1;
    return [{ someData: "1" }, "b", 2];
  });
  await clearCacheAt("a");
  const s = JSON.stringify;
  assert(functionCallCount === 1);
  assert(s(resultFromSecondCall) === s(resultFromFirstCall));
};

const testSyncMethod = () => {
  let functionCallCount = 0;
  clearCacheAt("a");
  const resultFromFirstCall = withLocalStorageCache("a", () => {
    functionCallCount += 1;
    return [{ someData: "1" }, "b", 2];
  });
  const resultFromSecondCall = withLocalStorageCache("a", () => {
    functionCallCount += 1;
    return [{ someData: "1" }, "b", 2];
  });
  clearCacheAt("a");
  const s = JSON.stringify;
  assert(functionCallCount === 1);
  assert(s(resultFromSecondCall) === s(resultFromFirstCall));
};

const log = (message: string) => {
  const root = document.body as HTMLElement;
  const content = root.innerHTML;
  root.innerHTML = `
    ${content}
    <li>${message}</li>
  `;
};

const clearLog = () => {
  const root = document.body as HTMLElement;
  root.innerHTML = ``;
};

const main = async () => {
  clearLog();
  testSyncMethod();
  console.log(`✅ Sync: Ok.`);
  await testWithVoidReturningMethod();
  console.log(`✅ Void: Ok.`);
  await testWithNumberReturningMethod();
  console.log(`✅ Number: Ok.`);
  await testWithStringReturningMethod();
  console.log(`✅ String: Ok.`);
  await testWithObjectReturningMethod();
  console.log(`✅ Object: Ok.`);
  await testWithArrayReturningMethod();
  console.log(`✅ Array: Ok.`);
};
(async () => {
  await main();
})();
