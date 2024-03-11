export default class ContextStrategy {
  #strategy;

  constructor(strategy) {
    this.#strategy = strategy;
  }

  async connect() {
    return await this.#strategy.connect();
  }

  table(name) {
    this.#strategy.table = name;
    return this;
  }

  async create(data) {
    return await this.#strategy.create(data);
  }

  async read(query) {
    return await this.#strategy.read(query);
  }
}
