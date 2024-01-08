import assert from "node:assert";

const symbol = Symbol("symbol");
const key = "key";

const obj = {
  [key]: "Normal property",
  [symbol]: "Symbol property",
  [Symbol.for("global")]: "Global symbol property",
};

assert.strictEqual(obj[key], "Normal property");
assert.strictEqual(obj[symbol], "Symbol property");
assert.strictEqual(obj[Symbol("symbol")], undefined);
assert.strictEqual(obj[Symbol.for("global")], "Global symbol property");

const expected = [key, symbol, Symbol.for("global")];

// keys only
assert.deepStrictEqual(Object.keys(obj), expected.slice(0, 1));

// symbols only
assert.deepStrictEqual(Object.getOwnPropertySymbols(obj), expected.slice(1));

// keys and symbols
assert.deepStrictEqual(Reflect.ownKeys(obj), expected);

// - - - - - - - - - - - - -

// Well known symbols

const it = {
  [Symbol.iterator]: () => ({
    items: [1, 2, 3],
    next() {
      return { done: !this.items.length, value: this.items.pop() };
    },
  }),
};

assert.deepStrictEqual([...it], [3, 2, 1]);

const kItems = Symbol("kItems");
const kDateFormatter = Symbol("kDateFormatter");
const kListFormatter = Symbol("kListFormatter");

class Dates {
  constructor(...dates) {
    this[kItems] = dates.map((date) => new Date(...date));

    this[kDateFormatter] = new Intl.DateTimeFormat("pt-br", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    });

    this[kListFormatter] = new Intl.ListFormat("pt-br", {
      type: "conjunction",
    });
  }

  *[Symbol.iterator]() {
    for (const item of this[kItems]) yield item;
  }

  *[Symbol.asyncIterator]() {
    for (const item of this[kItems]) yield item.toISOString();
  }

  [Symbol.toPrimitive](coersion) {
    if (coersion !== "string") throw TypeError();

    return this[kListFormatter].format(
      this[kItems].map((date) => this[kDateFormatter].format(date))
    );
  }

  get [Symbol.toStringTag]() {
    return "Dates";
  }
}

const dates = new Dates([2020, 1, 2], [2020, 5, 24]);
const expectedDates = [new Date(2020, 1, 2), new Date(2020, 5, 24)];

assert.deepStrictEqual(dates[kItems], expectedDates);

assert.deepStrictEqual([...dates], expectedDates);

assert.deepStrictEqual(dates.toString(), "[object Dates]");

const expectedString = "02 de fevereiro de 2020 e 24 de junho de 2020";

assert.throws(() => Number(dates), TypeError);

assert.strictEqual(String(dates), expectedString);

const expectedAsyncDates = [new Date(2020, 1, 2), new Date(2020, 5, 24)].map(
  (date) => date.toISOString()
);

for await (const date of dates)
  assert.strictEqual(date, expectedAsyncDates.shift());
