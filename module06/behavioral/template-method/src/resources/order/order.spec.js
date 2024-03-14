import { describe, beforeEach, it, expect, jest } from "@jest/globals";
import Order from "./order.entity.js";
import OrderService from "./order.service.js";

describe("OrderService", () => {
  beforeEach(jest.restoreAllMocks.bind(jest));

  it("should create an order", () => {
    const order = new Order({
      customerId: 1,
      amount: 10,
      products: [{ name: "test", price: 5 }],
    });

    const orderService = new OrderService();

    const spies = [
      OrderService.prototype._validate.name,
      OrderService.prototype._create.name,
    ].map((name) => jest.spyOn(OrderService.prototype, name));

    const result = orderService.create(order);

    expect(result).toBeTruthy();
    spies.forEach((spy) => {
      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith(order);
    });
  });
});
