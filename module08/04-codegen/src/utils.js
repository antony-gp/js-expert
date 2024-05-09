export class StringUtils {
  static #validate(value) {
    if (typeof value !== "string")
      throw new TypeError("Value must be a string.");

    if (/[^A-z\s]/g.test(value))
      throw new Error("Only alphabetical characters and spaces are allowed.");
  }

  static #capitalize(value) {
    return value.slice(0, 1).toUpperCase() + value.slice(1);
  }

  static toPascalCase(value) {
    this.#validate(value);

    const names = value.toLowerCase().split(" ");

    return names.map(this.#capitalize).join("");
  }

  static toKebabCase(value) {
    this.#validate(value);

    const names = value.toLowerCase().split(" ");

    return names.join("-");
  }

  static toCamelCase(value) {
    this.#validate(value);

    const [name, ...names] = value.toLowerCase().split(" ");

    return name + names.map(this.#capitalize).join("");
  }
}
