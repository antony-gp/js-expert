import ViewFactory from "../../shared/base/view-factory.mjs";
import TerminalTableComponent from "./table.mjs";

export default class TerminalFactory extends ViewFactory {
  createTable() {
    return new TerminalTableComponent();
  }
}
