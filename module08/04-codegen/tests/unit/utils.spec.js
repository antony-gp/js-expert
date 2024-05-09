import { expect, describe, it, jest, beforeEach } from "@jest/globals";

import { StringUtils } from "../../src/utils.js";

describe("Utils", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  describe("String", () => {
    const functions = [
      {
        name: "PascalCase",
        method: StringUtils.toPascalCase.name,
        expected: ["Abcd", "AbCd", "ABCD"],
      },
      {
        name: "kebab-case",
        method: StringUtils.toKebabCase.name,
        expected: ["abcd", "ab-cd", "a-b-c-d"],
      },
      {
        name: "camelCase",
        method: StringUtils.toCamelCase.name,
        expected: ["abcd", "abCd", "aBCD"],
      },
    ];

    const testStrings = ["abcd", "ab cd", "a b c d"];

    describe.each(functions)("$method", ({ name, method, expected }) => {
      it.each(testStrings)(`should return ${name} string`, (str) => {
        expect(StringUtils[method](str)).toStrictEqual(expected.shift());
      });

      it("should return empty string", () => {
        expect(StringUtils[method]("")).toStrictEqual("");
      });

      it("should throw an error with non string value", () => {
        expect(() => StringUtils[method]()).toThrow("Value must be a string.");
      });

      it("should throw an error with non alphabetical character other than space", () => {
        expect(() => StringUtils[method](".")).toThrow(
          "Only alphabetical characters and spaces are allowed."
        );
      });
    });
  });
});
