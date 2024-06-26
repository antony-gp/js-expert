export default class ValidationContext {
  constructor() {
    this.errors = [];
  }

  hasErrors() {
    return !!this.errors.length;
  }

  addError(error) {
    this.errors.push(error);
  }
}
