import { deepStrictEqual } from "node:assert";
import { describe, it, mock, afterEach } from "node:test";

import Database from "../../utils/database.js";
import OrderFacotry from "./order.factory.js";

describe("Factory", () => {
  afterEach(mock.restoreAll.bind(mock));

  it("with mock", async () => {
    mock.method(Database.prototype, Database.prototype.find.name, () => [
      { product: "hat", price: 4, quantity: 5 },
    ]);

    const factory = await OrderFacotry.build();
    const result = await factory.find();

    const expected = [{ product: "hat", price: 4, quantity: 5, total: 20 }];

    deepStrictEqual(result, expected);
  });

  it("without mock", async () => {
    const factory = await OrderFacotry.build();
    const result = await factory.find();

    const expected = [
      { product: "shirt", price: 10, quantity: 3, total: 30 },
      { product: "pants", price: 7, quantity: 2, total: 14 },
      { product: "sneakers", price: 15, quantity: 1, total: 15 },
    ];

    deepStrictEqual(result, expected);
  });
});
