import Benchmark from "benchmark";

import database from "../../database/index.js";

class CartMapReduce {
  constructor({ products }) {
    this.products = products;
    this.total = this.#getCartPrice();
  }

  #getCartPrice() {
    return this.products
      .map(({ price }) => price)
      .reduce((sum, value) => sum + value, 0);
  }
}

class CartReduce {
  constructor({ products }) {
    this.products = products;
    this.total = this.#getCartPrice();
  }

  #getCartPrice() {
    return this.products.reduce((sum, { price }) => sum + price, 0);
  }
}

class CartFor {
  constructor({ products }) {
    this.products = products;
    this.total = this.#getCartPrice();
  }

  #getCartPrice() {
    let price = 0;

    for (const product of this.products) price += product.price;

    return price;
  }
}

new Benchmark.Suite()
  .add("Cart#map->reduce", () => {
    new CartMapReduce(database);
  })
  .add("Cart#reduce", () => {
    new CartReduce(database);
  })
  .add("Cart#for", () => {
    new CartFor(database);
  })
  .on("cycle", (event) => console.log(String(event.target)))
  .on("complete", function () {
    console.log(`Fastest is ${this.filter("fastest").map("name")}`);
  })
  .run();
