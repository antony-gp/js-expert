export default class OrderService {
  #repository;

  constructor(repository) {
    this.#repository = repository;
  }

  async find() {
    const orders = await this.#repository.find();

    return orders.map(
      (order) => ((order.total = order.price * order.quantity), order)
    );
  }
}
