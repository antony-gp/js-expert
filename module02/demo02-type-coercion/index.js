// boolean as number
console.assert(true + 2 === 3, "true + 2 = 3");
console.assert(false - 1 === -1, "false - 1 = -1");

// boolean as string
console.assert("1" + true === "1true", '"1" + true = "1true"');
console.assert(false + "1" === "false1", 'true + "1" = "false1"');

// boolean and string as number
console.assert(true - "1" === 0, 'true - "1" = 0');
console.assert(false - -"1" === 1, 'true - - "1" = 0');

// number imprecision
console.assert(
  9999999999999999 === 10000000000000000,
  "9999999999999999 = 10000000000000000"
);

console.assert(0.1 + 0.2 === 0.30000000000000004, "0.1 + 0.2 != 0.3");

// number as boolean as number as boolean
console.assert(3 > 2 > 1 === false, "3 > 2 > 1 = false");

// string as number
console.assert("2" - -1 === 3, "'2' - -1 = 3");

// Why not :v
console.assert("B" + "a" + +"a" + "a" === "BaNaNa", "BaNaNa");

// -------------------------------------------------------------------------

// Implicit
console.assert(123 + "" === "123", "implicit number to string conversion");

// Explicit
console.assert(String(123) === "123", "explicit number to string conversion");

// && and || short circuits will always return the value

console.assert((0 && 1) === 0, "returns first value");
console.assert((0 || 1) === 1, "returns last value");
console.assert((1 || "") === 1, "returns first value");
console.assert((0 || "") === "", "returns last value");
console.assert((true && "" && 2) === "", "returns mid value");

// -------------------------------------------------------------------------

let obj = {
  a: "aaa",
  b: 2,
};

// object to string
console.assert(obj + "!" === "[object Object]!", "object -> string, default");

obj.toString = function () {
  return this.a;
};

console.assert(obj + "!" === "aaa!", "object -> string, overload");

// object to number

// without valueOf, fallbacks to toString
console.assert(obj + 1 === "aaa1", "object -> number, fallback");

obj.valueOf = function () {
  return this.b;
};

console.assert(obj + 1 === 3, "object -> number, overload");

// instead of implict coercion
console.assert("!".concat(obj) === "!aaa", "object -> string, overload");

// calls toString
console.assert(String(obj) === "aaa", "object -> string, overload");
// calls valueOf
console.assert(Number(obj) === 2, "object -> number, overload");

const ogToString = obj.toString;

obj.toString = function () {
  return {};
};

// if valueOf does not return a primitive value, fallbacks to toString
console.assert(String(obj) === "2", "object -> string -> number, fallback");

obj.toString = ogToString;

obj.valueOf = function () {
  return {};
};

// if toString does not return a primitive value, fallbacks to valueOf
console.assert(isNaN(Number(obj)), "object -> number -> string, fallback");

obj.toString = function () {
  return {};
};

// if both valueOf and toString do not return a primitive value, throws a TypeError
new Promise(() => String(obj)).catch(({ name }) => {
  console.assert(name === "TypeError", "object -> string -> number, TypeError");
});

new Promise(() => Number(obj)).catch(({ name }) => {
  console.assert(name === "TypeError", "object -> number -> string, TypeError");
});

console.assert(!!obj && Boolean(obj), "boolean does not call");

let usedCoercion;

// toPrimitive ignores toString and valueOf
obj[Symbol.toPrimitive] = function (coercion) {
  usedCoercion = coercion;
};

console.assert(!!obj && Boolean(obj), "boolean does not call");

console.assert(
  String(obj) === "undefined" && usedCoercion === "string",
  "object -> toPrimitive(string)?"
);

console.assert(
  isNaN(Number(obj)) && usedCoercion === "number",
  "object -> toPrimitive(number)?"
);

console.assert(
  new Date(obj).toString() === "Invalid Date" && usedCoercion === "default",
  "object -> toPrimitive(default)?"
);

coercion = null;

obj[Symbol.toPrimitive] = function (coercion) {
  usedCoercion = coercion;

  const to = {
    string: this.a,
    number: this.b,
  };

  return to[coercion] || to.string;
};

console.assert(
  String(obj) === "aaa" && usedCoercion === "string",
  "object -> toPrimitive(string)"
);

console.assert(
  Number(obj) === 2 && usedCoercion === "number",
  "object -> toPrimitive(number)"
);

console.assert(
  obj + 0 === "aaa0" && usedCoercion === "default",
  "object -> toPrimitive(default)"
);

let obj2 = { ...obj, a: "bbb", b: 1 };

console.assert(
  String(obj2) === "bbb" && usedCoercion === "string",
  "object -> shallow copy -> toPrimitive(string)"
);

console.assert(
  Number(obj2) === 1 && usedCoercion === "number",
  "object -> shallow copy -> toPrimitive(number)"
);

console.assert(
  obj2 + 0 === "bbb0" && usedCoercion === "default",
  "object -> shallow copy -> toPrimitive(default)"
);

// -------------------------------------------------------------------------

// https://www.freecodecamp.org/news/js-type-coercion-explained-27ba3d9a2839
