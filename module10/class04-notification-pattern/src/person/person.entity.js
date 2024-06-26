import ValidationContext from "../utils/validation-context.js";

export default class Person extends ValidationContext {
  constructor({ name, age }) {
    super();
    this.name = name;
    this.age = age;
  }

  validate() {
    if (this.name === undefined) this.addError("field 'name' must exist");

    if (typeof this.name !== "string")
      this.addError("field 'name' must be a string");

    if (!this.name?.length) this.addError("field 'name' must not be empty");

    if (this.age !== undefined) {
      if (!Number.isInteger(this.age))
        this.addError("field 'age' must be an integer");

      if (this.age < 0)
        this.addError("field 'age' must be a equal or greater than 0");
    }

    return !this.hasErrors();
  }
}
