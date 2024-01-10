import assert from "node:assert";

const map1 = new Map()
  .set("a", 1)
  .set(2, "b")
  .set(false, () => "true")
  .set(assert, null);

assert.strictEqual(map1.get("a"), 1);
assert.strictEqual(map1.get(2), "b");
assert.strictEqual(map1.get(false)(), "true");
assert.strictEqual(map1.get(assert), null);

const map2 = new Map([
  [1, "a"],
  ["b", 2],
  [map1, null],
]);

const obj = { a: 1 };

map2.set(obj, true);

// Picks reference as key
assert.strictEqual(map2.get({ a: 1 }), undefined);
assert.strictEqual(map2.get(obj), true);

// Length
assert.strictEqual(map2.size, 4);

// Contains key
assert.strictEqual(map2.has(obj), true);

// Remove key
assert.strictEqual(map2.delete(obj), true);
assert.strictEqual(map2.get(obj), undefined);

// Implements generator
assert.deepStrictEqual(
  [...map2],
  [
    [1, "a"],
    ["b", 2],
    [map1, null],
  ]
);

// Clear keys
map2.clear();

assert.strictEqual(map2.size, 0);

// - - - - - - - - - - - - - - -

/* WeakMap

- Can be garbage collected after loosing its references
- Not iterable
- Only accepts reference keys
- Prevents memory leak

*/

const weakMap = new WeakMap();

// Only these methods are available
weakMap.set(obj);
weakMap.get(obj);
weakMap.has(obj);
weakMap.delete(obj);
