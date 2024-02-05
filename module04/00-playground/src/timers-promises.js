"use strict";

import timersPromises from "node:timers/promises";

const colors = {
  green(text) {
    return `\x1b[32m${text}\x1b[0m`;
  },
  blue(text) {
    return `\x1b[34m${text}\x1b[0m`;
  },
};

// default
setInterval(function () {
  const defaultValue = -1;
  const num = (Math.random() * 10) | 0;

  if (num < 5) {
    console.log(`[${colors.green("sync")}]`, defaultValue);
    clearInterval(this);
  } else {
    console.log(`[${colors.green("sync")}]`, num);
  }
}, 250);

// promisified
for await (const defaultValue of timersPromises.setInterval(250, -1)) {
  const num = (Math.random() * 10) | 0;

  if (num < 5) {
    console.log(`[${colors.blue("async")}]`, defaultValue);
    break;
  }

  console.log(`[${colors.blue("async")}]`, num);
}
