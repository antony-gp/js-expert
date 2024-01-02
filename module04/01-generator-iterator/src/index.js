import assert from "node:assert";

function* sumThrough(...args) {
  let res = 0;
  while (args.length) yield (res += args.shift());
}

function* main() {
  yield* sumThrough(1, 2, 3, 4);
}

const generator = main();

assert.deepStrictEqual(generator.next(), { value: 1, done: false });
assert.deepStrictEqual(generator.next(), { value: 3, done: false });
assert.deepStrictEqual(generator.next(), { value: 6, done: false });
assert.deepStrictEqual(generator.next(), { value: 10, done: false });
assert.deepStrictEqual(generator.next(), { value: undefined, done: true });

assert.deepStrictEqual(Array.from(main()), [1, 3, 6, 10]);
assert.deepStrictEqual([...main()], [1, 3, 6, 10]);

async function* numberPromisifier(num) {
  let current = 0;
  while (current < num) yield Promise.resolve(++current);
}

const asyncGenerator = numberPromisifier(3);

assert.deepStrictEqual(await asyncGenerator.next(), { value: 1, done: false });
assert.deepStrictEqual(await asyncGenerator.next(), { value: 2, done: false });
assert.deepStrictEqual(await asyncGenerator.next(), { value: 3, done: false });
assert.deepStrictEqual(await asyncGenerator.next(), {
  value: undefined,
  done: true,
});

const expected = [1, 2, 3];

for await (const num of numberPromisifier(3))
  assert.deepStrictEqual(num, expected.shift());
