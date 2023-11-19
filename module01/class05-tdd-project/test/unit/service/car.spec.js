const { describe, it, before, beforeEach, afterEach } = require("mocha");
const { expect } = require("chai");
const sinon = require("sinon");
const { join } = require("path");
const { CarService } = require("../../../src/resources/car/car.service");

const FILE_PATH = join(__dirname, "../../../", "database", "cars.json");

const mocks = {
  car: require("../../mocks/car.json"),
  carCategory: require("../../mocks/car-category.json"),
};

describe("[UNIT] Car", () => {
  let service, sandbox;

  before(() => {
    service = new CarService({ filePath: FILE_PATH });
  });

  beforeEach(() => (sandbox = sinon.createSandbox()));

  afterEach(() => sandbox.restore());

  describe("[METH] getAvailableCar", () => {
    it("should pick first item in the cars array", async () => {
      sandbox
        .stub(service.repository, service.repository.find.name)
        .resolves(mocks.car);

      const result = await service.getAvailableCar(mocks.carCategory.carIds);

      expect(result).to.be.deep.eq(mocks.car);
    });

    it("should not find any car", async () => {
      sandbox
        .stub(service.repository, service.repository.find.name)
        .resolves(undefined);

      const result = await service.getAvailableCar(mocks.carCategory.carIds);

      expect(result).to.be.eq(undefined);
    });
  });
});
