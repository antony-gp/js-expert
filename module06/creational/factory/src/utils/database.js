export default class Database {
  async #sleep(ms) {
    await new Promise((resolve) => setInterval(resolve, ms));
  }

  async connect() {
    return await this.#sleep(100), this;
  }

  async find() {
    await this.#sleep(250);

    return [
      { product: "shirt", price: 10, quantity: 3 },
      { product: "pants", price: 7, quantity: 2 },
      { product: "sneakers", price: 15, quantity: 1 },
    ];
  }
}
