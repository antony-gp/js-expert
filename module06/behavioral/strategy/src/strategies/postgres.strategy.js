import knex from "knex";

export default class PostgresStrategy {
  #conenctionString;
  #table;
  #database;

  constructor(conenctionString) {
    this.#conenctionString = conenctionString;
  }

  set table(name) {
    this.#table = name;
  }

  async connect() {
    this.#database = knex({
      client: "pg",
      connection: this.#conenctionString,
    });

    return this.#database.raw("SELECT 1+1 AS result");
  }

  async create(data) {
    return this.#database.insert(data).into(this.#table);
  }

  async read() {
    return this.#database.select().from(this.#table);
  }
}
