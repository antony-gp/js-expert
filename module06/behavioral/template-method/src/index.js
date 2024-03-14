import Order from "./resources/order/order.entity.js";
import OrderService from "./resources/order/order.service.js";

const order = new Order({
  customerId: crypto.randomUUID(),
  amount: 10,
  products: [{ name: "pendrive", price: 5 }],
});

const orderService = new OrderService();

const created = orderService.create(order);

console.info("created order:", created);
