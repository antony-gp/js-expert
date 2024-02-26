import Database from "../../utils/database.js";
import OrderRepository from "./order.repository.js";
import OrderService from "./order.service.js";

export default class OrderFacotry {
  static async build() {
    const connection = await new Database().connect();
    const orderRepository = new OrderRepository(connection);
    return new OrderService(orderRepository);
  }
}
