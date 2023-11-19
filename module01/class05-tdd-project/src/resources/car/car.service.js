const { pickRandomIndex } = require("../../utils");
const { CarRepository } = require("./car.repository");

exports.CarService = class {
  constructor({ filePath }) {
    this.repository = new CarRepository({ filePath });
  }

  async getAvailableCar(carIds) {
    const cars = await Promise.all(carIds.map(this.repository.find));

    const index = pickRandomIndex(cars.filter((car) => car?.available));

    return cars[index];
  }
};
