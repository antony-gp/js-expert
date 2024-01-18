"use strict";

import assert from "node:assert";

const obj = {
  add(value) {
    return this.a + this.b + value;
  },
};

// --------- Apply ---------

assert.strictEqual(obj.add.apply({ a: 1, b: 2 }, [3]), 6);

obj.add.apply = () => {
  throw new TypeError(":v");
};

assert.throws(() => obj.add.apply({ a: 1, b: 2 }, [3]), new TypeError(":v"));

assert.strictEqual(Reflect.apply(obj.add, { a: 1, b: 2 }, [3]), 6);

// --------- Define Property ---------

function fn() {}

// Using an Object method to define property on a function

Object.defineProperty(fn, "a", { value: 1 });

// Semantically better

Reflect.defineProperty(fn, "b", { value: 2 });

assert.strictEqual(fn.a, 1);
assert.strictEqual(fn.b, 2);

// --------- Delete / Has Own Prop ---------

const obj1 = { a: 1, b: 2 };

assert.strictEqual(obj1.hasOwnProperty("a"), true);
assert.strictEqual(delete obj1.a, true);
assert.strictEqual(obj1.hasOwnProperty("a"), false);

assert.deepStrictEqual(Reflect.getOwnPropertyDescriptor(obj1, "b"), {
  configurable: true,
  enumerable: true,
  value: 2,
  writable: true,
});
assert.strictEqual(Reflect.deleteProperty(obj1, "b"), true);
assert.strictEqual(Reflect.getOwnPropertyDescriptor(obj1, "b"), undefined);

// --------- Get ---------

// Throws when trying to read a key from a non-object value
assert.strictEqual((1)["toFixed"](2), "1.00");
assert.throws(() => Reflect.get(1, "toFixed")(2), TypeError);

// --------- Has ---------

obj1.a = 1;
const obj2 = { a: 2, __proto__: obj1 };

assert.strictEqual("a" in obj2, true);
assert.strictEqual(Reflect.has(obj2, "a"), true);

assert.strictEqual(Reflect.deleteProperty(obj2, "a"), true);

// Both take prototype chain into account
assert.strictEqual("a" in obj2, true);
assert.strictEqual(Reflect.has(obj2, "a"), true);

assert.strictEqual(Reflect.deleteProperty(obj1, "a"), true);

assert.strictEqual("a" in obj2, false);
assert.strictEqual(Reflect.has(obj2, "a"), false);

// --------- Own keys ---------

const field = Symbol("field");
const obj3 = {
  field: "string",
  [field]: "symbol",
  [Symbol.for("field")]: "symbol",
};

const expected = ["field", field, Symbol.for("field")];

assert.deepStrictEqual(
  [...Object.getOwnPropertyNames(obj3), ...Object.getOwnPropertySymbols(obj3)],
  expected
);

// Clean AF
assert.deepStrictEqual(Reflect.ownKeys(obj3), expected);
