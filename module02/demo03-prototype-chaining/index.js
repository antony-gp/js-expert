const { deepStrictEqual } = require("assert");

let obj = {};
let arr = [];
let fn = () => {};

// internally, object literals become explicit functions
deepStrictEqual(obj.__proto__, new Object().__proto__);

// __proto__ is the reference of the parent object
deepStrictEqual(obj.__proto__, Object.prototype);
deepStrictEqual(arr.__proto__, Array.prototype);
deepStrictEqual(fn.__proto__, Function.prototype);

// Object prototype is null
deepStrictEqual(obj.__proto__.__proto__, null);

// before ES6

function F1() {}
F1.prototype.a = () => "a";

function F2() {}
F2.prototype = Object.create(F1.prototype);
F2.prototype.b = () => "b";

function F3() {}
F3.prototype = Object.create(F2.prototype);
F3.prototype.c = () => "c";

deepStrictEqual(F3.prototype.__proto__, F2.prototype);
deepStrictEqual(F2.prototype.__proto__, F1.prototype);
deepStrictEqual(F3.prototype.__proto__.__proto__, F1.prototype);

// we can call via prototype, or directly with 'new'
deepStrictEqual(F3.prototype.a, new F3().a);

// when invoked with 'new', __proto__ will receive the prototype
const f = new F3();

deepStrictEqual(f.__proto__, F3.prototype);
deepStrictEqual(f.__proto__.__proto__, F2.prototype);
deepStrictEqual(f.__proto__.__proto__.__proto__, F1.prototype);
deepStrictEqual(f.__proto__.__proto__.__proto__.__proto__, Object.prototype);
deepStrictEqual(f.__proto__.__proto__.__proto__.__proto__.__proto__, null);

// since ES6 - syntax sugar

class C1 {
  a() {
    return "a";
  }
}

class C2 extends C1 {
  b() {
    return "b";
  }
}

class C3 extends C2 {
  c() {
    return "c";
  }
}

const c = new C3();

deepStrictEqual(C3.prototype.a, c.a);

deepStrictEqual(c.__proto__, C3.prototype);
deepStrictEqual(c.__proto__.__proto__, C2.prototype);
deepStrictEqual(c.__proto__.__proto__.__proto__, C1.prototype);
deepStrictEqual(c.__proto__.__proto__.__proto__.__proto__, Object.prototype);
deepStrictEqual(c.__proto__.__proto__.__proto__.__proto__.__proto__, null);
