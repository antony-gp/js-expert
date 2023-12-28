import assert from "node:assert";

class Iterator extends Array {
  get [Symbol.isConcatSpreadable]() {
    return false;
  }

  *[Symbol.iterator]() {
    let index = 0;

    while (index < this.length)
      yield { array: this, index, value: this[index++] };
  }

  async *[Symbol.asyncIterator]() {
    let index = 0;

    while (index < this.length)
      yield { array: this, index, value: await this[index++] };
  }
}

const data = ["a", "b", "c"];

const dataArrayForEach = [];

data.forEach((value, index, array) => {
  dataArrayForEach.push(value, index, array);
});

const dataIteratorForOf = [];

for (const { value, index, array } of new Iterator(...data))
  dataIteratorForOf.push(value, index, array);

assert.deepStrictEqual(
  dataIteratorForOf.flat(Infinity),
  dataArrayForEach.flat(Infinity)
);

assert.strictEqual([1, 2, 3].concat(new Iterator(4, 5, 6)).length, 4);

for await (const { value, index } of new Iterator(
  new Promise((res) => res(1)),
  new Promise((res) => res(2)),
  new Promise((res) => res(3))
))
  assert.strictEqual(value, index + 1);
