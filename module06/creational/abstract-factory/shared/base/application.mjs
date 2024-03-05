export default class Application {
  constructor(factory) {
    this.table = factory.createTable();
  }

  init(database) {
    this.table.render(database);
  }
}
