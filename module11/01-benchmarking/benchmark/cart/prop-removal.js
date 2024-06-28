import Benchmark from "benchmark";
import Product from "../../src/product/product.entity.js";

class MapFilterJSON {
  constructor({ products }) {
    this.products = this.#removeUndefinedProps(products);
  }

  #removeUndefinedProps(products) {
    const validProducts = products
      .filter((product) => Reflect.ownKeys(product).length)
      .map((product) => new Product(product));

    return JSON.parse(JSON.stringify(validProducts));
  }
}

class ForJSON {
  constructor({ products }) {
    this.products = this.#removeUndefinedProps(products);
  }

  #removeUndefinedProps(products) {
    const result = [];

    for (const product of products) {
      if (!Reflect.ownKeys(product).length) continue;

      result.push(JSON.parse(JSON.stringify(new Product(product))));
    }

    return result;
  }
}

class ForDelete {
  constructor({ products }) {
    this.products = this.#removeUndefinedProps(products);
  }

  #removeUndefinedProps(products) {
    const result = [];

    for (const product of products) {
      const keys = Reflect.ownKeys(product);

      if (!keys.length) continue;

      keys.forEach((key) => product[key] ?? delete product[key]);
      result.push(new Product(product));
    }

    return result;
  }
}

class ForReflectDelete {
  constructor({ products }) {
    this.products = this.#removeUndefinedProps(products);
  }

  #removeUndefinedProps(products) {
    const result = [];

    for (const product of products) {
      const keys = Reflect.ownKeys(product);

      if (!keys.length) continue;

      keys.forEach(
        (key) => product[key] ?? Reflect.deleteProperty(product, key)
      );

      result.push(new Product(product));
    }

    return result;
  }
}

class ReduceReflectDelete {
  constructor({ products }) {
    this.products = this.#removeUndefinedProps(products);
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
}

class ForNewObject {
  constructor({ products }) {
    this.products = this.#removeUndefinedProps(products);
  }

  #removeUndefinedProps(products) {
    const result = [];

    for (const product of products) {
      const keys = Reflect.ownKeys(product);

      if (!keys.length) continue;

      const newObj = {};

      keys.forEach(
        (key) =>
          [null, undefined].includes(product[key]) ||
          (newObj[key] = product[key])
      );

      result.push(new Product(newObj));
    }

    return result;
  }
}

class ReduceNewObject {
  constructor({ products }) {
    this.products = this.#removeUndefinedProps(products);
  }

  #removeUndefinedProps(products) {
    return products.reduce((arr, product) => {
      const keys = Reflect.ownKeys(product);

      if (keys.length) {
        const newObj = {};

        keys.forEach(
          (key) =>
            [null, undefined].includes(product[key]) ||
            (newObj[key] = product[key])
        );

        arr.push(new Product(newObj));
      }

      return arr;
    }, []);
  }
}

const data = {
  products: [
    {
      id: "1",
      a: undefined,
      b: null,
      c: "c",
      d: null,
      e: undefined,
    },
    {},
    {
      id: "2",
      f: undefined,
      g: null,
      h: "h",
      i: null,
      j: undefined,
    },
  ],
};

new Benchmark.Suite()
  .add("Cart#map->filter->JSON", () => {
    new MapFilterJSON(data);
  })
  .add("Cart#for->JSON", () => {
    new ForJSON(data);
  })
  .add("Cart#for->delete", () => {
    new ForDelete(data);
  })
  .add("Cart#for->Reflect.deleteProperty", () => {
    new ForReflectDelete(data);
  })
  .add("Cart#reduce->Reflect.deleteProperty", () => {
    new ReduceReflectDelete(data);
  })
  .add("Cart#for->newObject", () => {
    new ForNewObject(data);
  })
  .add("Cart#reduce->newObject", () => {
    new ReduceNewObject(data);
  })
  .on("cycle", (event) => console.log(String(event.target)))
  .on("complete", function () {
    console.log(`Fastest is ${this.filter("fastest").map("name")}`);
  })
  .run();
