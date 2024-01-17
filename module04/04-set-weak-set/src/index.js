import assert from "node:assert";

const arr1 = [1, 2, 3];
const arr2 = [0, 2, 1];

const set1 = new Set([1, 2, 3]);
const set2 = new Set([0, 2, 1]);

const uniqueArr = [...new Set([...arr1, ...arr2])].sort();

assert.deepStrictEqual(uniqueArr, [0, 1, 2, 3]);

const set = new Set();

set.add(1);
set.add(1);
set.add(2);
set.add(3);
set.add(3);

assert.deepStrictEqual([...set], [1, 2, 3]);

// Both return values, for compatibility with Map
assert.deepStrictEqual(set.keys(), set.values());

// Contains value
assert.strictEqual(set.has(2), true);

// Find intersection
assert.deepStrictEqual(
  [...set1].filter((value) => set2.has(value)),
  [1, 2]
);

// Find difference
assert.deepStrictEqual(
  [...set1].filter((value) => !set2.has(value)),
  [3]
);

// - - - - - - - - - - - - - - -

/* WeakSet

- Same principle as WeakMap
- Can be garbage collected after loosing its references
- Not iterable
- Prevents memory leak

*/

const weakSet = new WeakSet();

const obj = { o: 1 };

// Only these methods are available
weakSet.add(obj);
weakSet.has(obj);
weakSet.delete(obj);
