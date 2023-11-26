const { deepStrictEqual } = require("assert");

// Primitive type: creates a new reference in memory, with a copy of the value

let counter = 0;
let counter1 = counter;

counter++;

deepStrictEqual(counter, 1);
deepStrictEqual(counter1, 0);

counter1++;

deepStrictEqual(counter, 1);
deepStrictEqual(counter1, 1);

// Reference type: copies the reference address in memory, and points to the same value

let obj = { counter: 0 };
let obj1 = obj;

obj.counter++;

deepStrictEqual(obj, { counter: 1 });
deepStrictEqual(obj1, { counter: 1 });

obj1.counter++;

deepStrictEqual(obj, { counter: 2 });
deepStrictEqual(obj1, { counter: 2 });
