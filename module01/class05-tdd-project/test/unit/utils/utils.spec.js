const { describe, it } = require("mocha");
const { expect } = require("chai");
const { pickRandomIndex, toBrlCurrency } = require("../../../src/utils");

describe("[UNIT] Utils", () => {
  describe("[FUNC] pickRandomIndex", () => {
    it("should return a random index from the array", () => {
      const array = [1, 2, 3];

      const result = pickRandomIndex(array);

      expect(typeof result).to.be.eq("number");
      expect(result).to.be.gte(0).and.to.be.lt(array.length);
    });

    it("should return a random index from the string", () => {
      const string = "abcdefgh";

      const result = pickRandomIndex(string);

      expect(typeof result).to.be.eq("number");
      expect(result).to.be.gte(0).and.to.be.lt(string.length);
    });

    it("should return undefined if param isn't informed", () => {
      const result = pickRandomIndex();

      expect(result).to.be.eq(undefined);
    });

    it("should return undefined if param isn't string or array", () => {
      const result = pickRandomIndex(1);

      expect(result).to.be.eq(undefined);
    });
  });
  describe("[FUNC] toBrlCurrency", () => {
    it("should convert number to formatted BRL currency", () => {
      const number = 123456.789;
      const expected = `R$${String.fromCharCode(160)}123.456,79`;

      const result = toBrlCurrency(number);

      expect(typeof result).to.be.eq("string");
      expect(result).to.be.eq(expected);
    });

    it("should return undefined if param is NaN", () => {
      const number = "abcdefghij";

      const result = toBrlCurrency(number);

      expect(result).to.be.eq(undefined);
    });

    it("should return undefined if param is not finite", () => {
      const number = Infinity;

      const result = toBrlCurrency(number);

      expect(result).to.be.eq(undefined);
    });
  });
});
