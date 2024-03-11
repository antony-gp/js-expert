import { MongoClient } from "mongodb";

export default class MongoDBStrategy {
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
    const client = new MongoClient(this.#conenctionString);

    this.#database = await client.connect();

    this.#database = client.db();
  }

  async create(data) {
    return this.#database.collection(this.#table).insertOne(data);
  }

  async read() {
    return await this.#database.collection(this.#table).find().toArray();
  }
}
