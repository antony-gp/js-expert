import { deepStrictEqual } from "node:assert";
import { describe, it } from "node:test";

import DateUtils from "./index.js";

describe("DateUtils", () => {
  describe("stringify", () => {
    it("should verify invalid date", () => {
      const format = "yyyy-mm-dd";
      const expected = new Error(`Invalid date '${format}'.`);

      const result = DateUtils.stringify(format);

      deepStrictEqual(result, expected);
    });

    it("should verify unavailable date format", () => {
      const format = "yyyy-mm-dd";
      const expected = new Error(`Format '${format}' is not yet available.`);

      const result = DateUtils.stringify(new Date(), format);

      deepStrictEqual(result, expected);
    });

    it("should stringfy date with specified format", () => {
      const format = "dd/MM/yyyy";
      const expected = "20/04/2020";

      const result = DateUtils.stringify(new Date(2020, 3, 20), format);

      deepStrictEqual(result, expected);
    });
  });

  describe("format", () => {
    it("should validate empty date string", () => {
      const expected = new Error("Empty date string.");
      const data = "";

      const result = DateUtils.format(data);

      deepStrictEqual(result, expected);
    });

    it("should validate verify unavailable input date format", () => {
      const expected = new Error("Format 'yyyy-mm-dd' is not yet available.");
      const data = ["2020-01-01", "yyyy-mm-dd"];

      const result = DateUtils.format(...data);

      deepStrictEqual(result, expected);
    });

    it("should validate verify unavailable output date format", () => {
      const expected = new Error("Format 'dd/mm/yyyy' is not yet available.");
      const data = ["2020-01-01", "yyyy-MM-dd", "dd/mm/yyyy"];

      const result = DateUtils.format(...data);

      deepStrictEqual(result, expected);
    });

    it("should parse date from input format to output format", () => {
      const expected = "01/01/2020";
      const data = ["2020-01-01", "yyyy-MM-dd", "dd/MM/yyyy"];

      const result = DateUtils.format(...data);

      deepStrictEqual(result, expected);
    });
  });
});
