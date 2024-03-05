import ViewFactory from "../../shared/base/view-factory.mjs";
import BrowserTableComponent from "./table.mjs";

export default class BrowserFactory extends ViewFactory {
  createTable() {
    return new BrowserTableComponent();
  }
}
