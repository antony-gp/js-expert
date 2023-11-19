const { CarCategoryRepository } = require("./car-category.repository");

exports.CarCategoryService = class {
  constructor({ filePath, childServices: { car } }) {
    this.repository = new CarCategoryRepository({ filePath });
    this.childServices = { car };
  }

  async getAvailableCar(carCategoryId) {
    const carCategory = await this.repository.find(carCategoryId);

    if (!carCategory) return;

    const { carIds, ...category } = carCategory;

    const car = await this.childServices.car.getAvailableCar(
      carCategory.carIds
    );

    if (!car) return;

    return { ...car, category };
  }
};
