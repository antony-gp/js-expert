export default class NotImplementedException extends Error {
  constructor(message) {
    super(`${message} was not implemented.`);
    this.name = "NotImplementedException";
  }
}
