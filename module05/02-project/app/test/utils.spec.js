const { describe, it } = require("mocha");
const { expect } = require("chai");

const { evaluateExpression, UnsafeRegexError } = require("../src/utils");

describe("Utils", () => {
  describe("evaluateExpression", () => {
    it("should throw an error with unsafe regex", () => {
      const unsafeRegex = /^(\w+\s?)+/gim;

      expect(() => evaluateExpression(unsafeRegex)).to.throw(
        UnsafeRegexError,
        `The expression ${unsafeRegex} is unsafe.`
      );
    });
    it("should not throw an error with safe regex", () => {
      const safeRegex = /(\w+\s?)/gim;

      expect(evaluateExpression(safeRegex)).to.be.equal(safeRegex);
    });
  });
});
