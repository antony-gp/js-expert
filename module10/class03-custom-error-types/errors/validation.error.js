import BaseError from "./base.error.js";

export default class ValidationError extends BaseError {
  constructor(message) {
    super("ValidationError", message);
  }
}
