const safeRegex = require("safe-regex");

class UnsafeRegexError extends Error {
  constructor(regex) {
    super(`The expression ${regex} is unsafe.`);
    this.name = "UnsafeRegexError";
  }
}

const evaluateExpression = (regex) => {
  if (safeRegex(regex)) return regex;

  throw new UnsafeRegexError(regex);
};

module.exports = { evaluateExpression, UnsafeRegexError };
