"use strict";

import EventEmitter from "node:events";

const event = new EventEmitter();
const kCounter = Symbol("counter");

event.on(kCounter, console.log);

const observable = { [kCounter]: 0 };

const proxy = new Proxy(observable, {
  set(target, key, value) {
    event.emit(kCounter, target[key], value);
    target[key] = value;
    return true;
  },
  get(target, key) {
    return target[key];
  },
});

setInterval(function () {
  console.log("[3] interval");
  proxy[kCounter]++;
  if (proxy[kCounter] === 10) clearInterval(this);
}, 200);

setTimeout(() => {
  console.log("[2] timeout");
  proxy[kCounter] = 6;
}, 100);

// has priority over setTimeout and setInterval
setImmediate(() => {
  console.log("[1] immediate");
  proxy[kCounter] = 4;
});

// has priority over setImmediate
process.nextTick(() => {
  console.log("[0] nextTick");
  proxy[kCounter] = 2;
});
