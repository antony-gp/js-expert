import { describe, it } from "node:test";
import assert from "node:assert";

import ProductFactory from "./product.factory.js";
import ProductValidator from "../../../src/resources/product/product.validator.js";

describe("Test mother object (factory)", () => {
  it("should pass validation", () => {
    const product = ProductFactory.valid();

    const result = new ProductValidator(product).run();

    assert.deepStrictEqual(result, {
      pass: true,
      errors: [],
    });
  });

  describe("Product rules", () => {
    describe("id", () => {
      it("should return type error", () => {
        const product = ProductFactory.withInvalidIdType();

        const result = new ProductValidator(product).run();

        assert.deepStrictEqual(result, {
          pass: false,
          errors: ["Value of 'id' must be a string"],
        });
      });

      it("should return min range error", () => {
        const product = ProductFactory.withInvalidIdMinRange();

        const result = new ProductValidator(product).run();

        assert.deepStrictEqual(result, {
          pass: false,
          errors: ["Length of 'id' must be between 2 and 20"],
        });
      });

      it("should return max range error", () => {
        const product = ProductFactory.withInvalidIdMaxRange();

        const result = new ProductValidator(product).run();

        assert.deepStrictEqual(result, {
          pass: false,
          errors: ["Length of 'id' must be between 2 and 20"],
        });
      });
    });

    describe("name", () => {
      it("should return type error", () => {
        const product = ProductFactory.withInvalidNameType();

        const result = new ProductValidator(product).run();

        assert.deepStrictEqual(result, {
          pass: false,
          errors: ["Value of 'name' must be a string"],
        });
      });

      it("should return min range error", () => {
        const product = ProductFactory.withInvalidNameMinRange();

        const result = new ProductValidator(product).run();

        assert.deepStrictEqual(result, {
          pass: false,
          errors: ["Length of 'name' must be between 3 and 100"],
        });
      });

      it("should return max range error", () => {
        const product = ProductFactory.withInvalidNameMaxRange();

        const result = new ProductValidator(product).run();

        assert.deepStrictEqual(result, {
          pass: false,
          errors: ["Length of 'name' must be between 3 and 100"],
        });
      });

      it("should return match error", () => {
        const product = ProductFactory.withInvalidNameMatch();

        const result = new ProductValidator(product).run();

        assert.deepStrictEqual(result, {
          pass: false,
          errors: ["Value of 'name' must contain words only"],
        });
      });
    });

    describe("price", () => {
      it("should return type error", () => {
        const product = ProductFactory.withInvalidPriceType();

        const result = new ProductValidator(product).run();

        assert.deepStrictEqual(result, {
          pass: false,
          errors: ["Value of 'price' must be a number"],
        });
      });

      it("should return min range error", () => {
        const product = ProductFactory.withInvalidPriceMinRange();

        const result = new ProductValidator(product).run();

        assert.deepStrictEqual(result, {
          pass: false,
          errors: ["Value of 'price' must be between 0 and 1000"],
        });
      });

      it("should return max range error", () => {
        const product = ProductFactory.withInvalidPriceMaxRange();

        const result = new ProductValidator(product).run();

        assert.deepStrictEqual(result, {
          pass: false,
          errors: ["Value of 'price' must be between 0 and 1000"],
        });
      });
    });

    describe("category", () => {
      it("should return type and is in error", () => {
        const product = ProductFactory.withInvalidCategoryType();

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
        const product = ProductFactory.withInvalidCategoryIsIn();

        const result = new ProductValidator(product).run();

        assert.deepStrictEqual(result, {
          pass: false,
          errors: ["Value of 'category' must be electronic or organic"],
        });
      });
    });
  });
});
