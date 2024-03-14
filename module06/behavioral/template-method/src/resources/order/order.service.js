import BaseService from "../base/base.service.js";

export default class OrderService extends BaseService {
  #orders = new Set();

  _validate(data) {
    return data.amount > 0 && data.products.length;
  }

  _create(data) {
    return this.#orders.add(data), true;
  }
}
