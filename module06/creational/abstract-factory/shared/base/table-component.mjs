import NotImplementedException from "../exceptions/not-implemented.mjs";

export default class TableComponent {
  render(data) {
    throw new NotImplementedException(this.render.name);
  }
}
