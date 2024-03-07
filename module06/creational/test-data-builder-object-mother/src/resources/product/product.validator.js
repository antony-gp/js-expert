import Validator from "../../utils/validator.js";

export default class ProductValidator extends Validator {
  set id(value) {
    const validations = [this.isString, this.inRange({ min: 2, max: 20 })];
    this.exec("id", value, validations);
  }

  set name(value) {
    const validations = [
      this.isString,
      this.inRange({ min: 3, max: 100 }),
      this.match(/^[A-z\s]*$/g, "must contain words only"),
    ];

    this.exec("name", value, validations);
  }

  set price(value) {
    const validations = [this.isNumber, this.inRange({ min: 0, max: 1000 })];
    this.exec("price", value, validations);
  }

  set category(value) {
    const validations = [this.isString, this.isIn(["electronic", "organic"])];
    this.exec("category", value, validations);
  }
}
