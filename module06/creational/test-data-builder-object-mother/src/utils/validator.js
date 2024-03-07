export default class Validator {
  #object;

  constructor(object) {
    this.errors = [];
    this.#object = object || {};
  }

  isString(key, value) {
    if (typeof value === "string") return true;

    this.errors.push(`Value of '${key}' must be a string`);
  }

  isNumber(key, value) {
    if (typeof value === "number") return true;

    this.errors.push(`Value of '${key}' must be a number`);
  }

  isIn(values) {
    return (key, value) => {
      if (values.includes(value)) return true;

      const formatter = new Intl.ListFormat("en", {
        style: "long",
        type: "disjunction",
      });

      this.errors.push(
        `Value of '${key}' must be ${formatter.format(values.map(String))}`
      );
    };
  }

  inRange({ min = -Infinity, max = Infinity } = {}) {
    return (key, value) => {
      const length = typeof value === "number" ? value : value?.length;

      if (isNaN(length) || (length >= min && length <= max)) return true;

      this.errors.push(
        `${
          typeof value === "number" ? "Value" : "Length"
        } of '${key}' must be ${
          min > -Infinity && max < Infinity
            ? `between ${min} and ${max}`
            : max === Infinity
            ? `greater than or equal ${min}`
            : `lesser than or equal ${max}`
        }`
      );
    };
  }

  match(expression, customMessage) {
    return (key, value) => {
      if (typeof value !== "string" || expression.test(value)) return true;

      this.errors.push(
        `Value of '${key}' ${
          customMessage ||
          `does not match with regular expression '${expression}'`
        }`
      );
    };
  }

  exec(key, value, validations = []) {
    return validations
      .map((validation) => validation.bind(this)(key, value))
      .every(Boolean);
  }

  run() {
    for (const key in this.#object) this[key] = this.#object[key];

    return {
      pass: !this.errors.length,
      errors: this.errors,
    };
  }
}
