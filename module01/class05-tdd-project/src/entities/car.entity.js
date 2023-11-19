const { BaseEntity } = require("./base/base.entity");

exports.CarEntity = class extends BaseEntity {
  constructor({
    id,
    name,
    brand,
    releaseYear,
    manual,
    traction,
    fuelType,
    available,
  }) {
    super({ id, name });
    this.brand = brand;
    this.releaseYear = releaseYear;
    this.manual = manual;
    this.traction = traction;
    this.fuelType = fuelType;
    this.available = available;
  }
};
