const { BaseEntity } = require("./base/base.entity");

exports.CarCategoryEntity = class extends BaseEntity {
  constructor({ id, name, carIds, price }) {
    super({ id, name });
    this.carIds = carIds;
    this.price = price;
  }
};
