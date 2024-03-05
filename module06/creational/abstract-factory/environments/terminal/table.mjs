import TableComponent from "../../shared/base/table-component.mjs";

export default class TerminalTableComponent extends TableComponent {
  render(data) {
    console.table(data);
  }
}
