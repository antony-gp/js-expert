const { Fibonacci } = require("./fibonacci");
const { createSandbox } = require("sinon");
const assert = require("assert");
const sinon = createSandbox();

(async () => {
  {
    const value = 8;

    const fibonacci = new Fibonacci();
    const spy = sinon.spy(fibonacci, fibonacci.execute.name);

    const exec = fibonacci.execute(value);

    while (!exec.next().done);

    assert.strictEqual(spy.callCount, value + 1);
  }
  {
    const value = 6;

    const fibonacci = new Fibonacci();
    const spy = sinon.spy(fibonacci, fibonacci.execute.name);

    const spec = {
      results: [0, 1, 1, 2, 3, 5],
      calls: [
        [6], // [6, 0, 1] ->  yield 0
        [5, 1, 1], // yield 1
        [4, 1, 2], // yield 1
        [3, 2, 3], // yield 2
        [2, 3, 5], // yield 3
        [1, 5, 8], // yield 5
        [0, 8, 13], // return
      ],
    };

    const results = [...fibonacci.execute(value)];

    assert.strictEqual(spy.callCount, value + 1);
    assert.deepStrictEqual(results, spec.results);

    spy.getCalls().forEach(({ args }, index) => {
      assert.deepStrictEqual(args, spec.calls[index]);
    });
  }
})();
