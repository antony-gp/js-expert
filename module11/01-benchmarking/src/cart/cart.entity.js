import Product from "../product/product.entity.js";
import { randomUUID } from "node:crypto";

export default class Cart {
  constructor({ at, products }) {
    this.id = randomUUID();
    this.at = at;
    this.products = this.#removeUndefinedProps(products);
    this.total = this.#getCartPrice();
  }

  #removeUndefinedProps(products) {
    return products.reduce((arr, product) => {
      const keys = Reflect.ownKeys(product);

      if (keys.length) {
        keys.forEach(
          (key) => product[key] ?? Reflect.deleteProperty(product, key)
        );

        arr.push(new Product(product));
      }

      return arr;
    }, []);
  }

  #getCartPrice() {
    return this.products.reduce((sum, { price }) => sum + price, 0);
  }
}
