import Product from "../../../src/resources/product/product.entity.js";

export default class ProductBuilder {
  #data;

  constructor() {
    this.#data = {
      id: crypto.randomUUID().slice(0, 20),
      name: "test",
      price: 1000,
      category: "organic",
    };
  }

  withInvalidId(error) {
    const change = {
      type: () => (this.#data.id = {}),
      minRange: () => (this.#data.id = ""),
      maxRange: () => (this.#data.id = new Array(20 + 2).join("0")),
    }[error];

    return change?.(), this;
  }

  withInvalidName(error) {
    const change = {
      type: () => (this.#data.name = {}),
      minRange: () => (this.#data.name = ""),
      maxRange: () => (this.#data.name = new Array(100 + 2).join("a")),
      match: () => (this.#data.name = "abc1"),
    }[error];

    return change?.(), this;
  }

  withInvalidPrice(error) {
    const change = {
      type: () => (this.#data.price = {}),
      minRange: () => (this.#data.price = -1),
      maxRange: () => (this.#data.price = 1001),
    }[error];

    return change?.(), this;
  }

  withInvalidCategory(error) {
    const change = {
      type: () => (this.#data.category = {}),
      isIn: () => (this.#data.category = "abc"),
    }[error];

    return change?.(), this;
  }

  build() {
    return new Product(this.#data);
  }
}
