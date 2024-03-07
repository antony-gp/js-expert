import { describe, it } from "node:test";
import assert from "node:assert";

import ProductBuilder from "./product.builder.js";
import ProductValidator from "../../../src/resources/product/product.validator.js";

describe("Test data builder", () => {
  it("should pass validation", () => {
    const product = new ProductBuilder().build();

    const result = new ProductValidator(product).run();

    assert.deepStrictEqual(result, {
      pass: true,
      errors: [],
    });
  });

  describe("Product rules", () => {
    describe("id", () => {
      it("should return type error", () => {
        const product = new ProductBuilder().withInvalidId("type").build();

        const result = new ProductValidator(product).run();

        assert.deepStrictEqual(result, {
          pass: false,
          errors: ["Value of 'id' must be a string"],
        });
      });

      it("should return min range error", () => {
        const product = new ProductBuilder().withInvalidId("minRange").build();

        const result = new ProductValidator(product).run();

        assert.deepStrictEqual(result, {
          pass: false,
          errors: ["Length of 'id' must be between 2 and 20"],
        });
      });

      it("should return max range error", () => {
        const product = new ProductBuilder().withInvalidId("maxRange").build();

        const result = new ProductValidator(product).run();

        assert.deepStrictEqual(result, {
          pass: false,
          errors: ["Length of 'id' must be between 2 and 20"],
        });
      });
    });

    describe("name", () => {
      it("should return type error", () => {
        const product = new ProductBuilder().withInvalidName("type").build();

        const result = new ProductValidator(product).run();

        assert.deepStrictEqual(result, {
          pass: false,
          errors: ["Value of 'name' must be a string"],
        });
      });

      it("should return min range error", () => {
        const product = new ProductBuilder()
          .withInvalidName("minRange")
          .build();

        const result = new ProductValidator(product).run();

        assert.deepStrictEqual(result, {
          pass: false,
          errors: ["Length of 'name' must be between 3 and 100"],
        });
      });

      it("should return max range error", () => {
        const product = new ProductBuilder()
          .withInvalidName("maxRange")
          .build();

        const result = new ProductValidator(product).run();

        assert.deepStrictEqual(result, {
          pass: false,
          errors: ["Length of 'name' must be between 3 and 100"],
        });
      });

      it("should return match error", () => {
        const product = new ProductBuilder().withInvalidName("match").build();

        const result = new ProductValidator(product).run();

        assert.deepStrictEqual(result, {
          pass: false,
          errors: ["Value of 'name' must contain words only"],
        });
      });
    });

    describe("price", () => {
      it("should return type error", () => {
        const product = new ProductBuilder().withInvalidPrice("type").build();

        const result = new ProductValidator(product).run();

        assert.deepStrictEqual(result, {
          pass: false,
          errors: ["Value of 'price' must be a number"],
        });
      });

      it("should return min range error", () => {
        const product = new ProductBuilder()
          .withInvalidPrice("minRange")
          .build();

        const result = new ProductValidator(product).run();

        assert.deepStrictEqual(result, {
          pass: false,
          errors: ["Value of 'price' must be between 0 and 1000"],
        });
      });

      it("should return max range error", () => {
        const product = new ProductBuilder()
          .withInvalidPrice("maxRange")
          .build();

        const result = new ProductValidator(product).run();

        assert.deepStrictEqual(result, {
          pass: false,
          errors: ["Value of 'price' must be between 0 and 1000"],
        });
      });
    });

    describe("category", () => {
      it("should return type and is in error", () => {
        const product = new ProductBuilder()
          .withInvalidCategory("type")
          .build();

        const result = new ProductValidator(product).run();

        assert.deepStrictEqual(result, {
          pass: false,
          errors: [
            "Value of 'category' must be a string",
            "Value of 'category' must be electronic or organic",
          ],
        });
      });

      it("should return is in error", () => {
        const product = new ProductBuilder()
          .withInvalidCategory("isIn")
          .build();

        const result = new ProductValidator(product).run();

        assert.deepStrictEqual(result, {
          pass: false,
          errors: ["Value of 'category' must be electronic or organic"],
        });
      });
    });
  });
});
