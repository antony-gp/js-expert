exports.Fibonacci = class {
  *execute(input, current = 0, next = 1) {
    if (input === 0) return;

    yield current;

    yield* this.execute(--input, next, current + next);
  }
};
