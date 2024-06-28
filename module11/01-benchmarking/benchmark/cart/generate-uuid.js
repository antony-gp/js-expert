import Benchmark from "benchmark";
import { v4 as uuid } from "uuid";
import { randomUUID } from "node:crypto";

class UUID {
  constructor() {
    this.id = uuid();
  }
}

class Crypto {
  constructor() {
    this.id = randomUUID();
  }
}

new Benchmark.Suite()
  .add("Cart#uuid", () => {
    new UUID();
  })
  .add("Cart#crypto", () => {
    new Crypto();
  })
  .on("cycle", (event) => console.log(String(event.target)))
  .on("complete", function () {
    console.log(`Fastest is ${this.filter("fastest").map("name")}`);
  })
  .run();
