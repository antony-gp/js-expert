import { deepStrictEqual } from "node:assert";
import { describe, it } from "node:test";

import StringUtils from "./index.js";

describe("StringUtils", () => {
  describe("isEmpty", () => {
    it("should verify that string is empty", () => {
      const expected = true;
      const data = "";

      const result = StringUtils.isEmpty(data);

      deepStrictEqual(result, expected);
    });

    it("should verify that string is not empty", () => {
      const expected = false;
      const data = "aaa";

      const result = StringUtils.isEmpty(data);

      deepStrictEqual(result, expected);
    });
  });

  describe("removeEmptySpaces", () => {
    it("should remove all empty spaces", () => {
      const expected = "test";
      const data = " t e  s t  ";

      const result = StringUtils.removeEmptySpaces(data);

      deepStrictEqual(result, expected);
    });
  });
});
