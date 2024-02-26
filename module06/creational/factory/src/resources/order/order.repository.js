export default class OrderRepository {
  #connection;

  constructor(connection) {
    this.#connection = connection;
  }

  async find() {
    return await this.#connection.find();
  }
}
