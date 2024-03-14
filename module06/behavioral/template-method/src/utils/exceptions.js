export class NotImplementedException extends Error {
  constructor(message) {
    super(`${message} was not implemented.`);
    this.name = this.constructor.name;
  }
}

export class UnprocessableContentException extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}
