import NotImplementedException from "../exceptions/not-implemented.mjs";

export default class ViewFactory {
  createTable() {
    throw new NotImplementedException(this.createTable.name);
  }
}
