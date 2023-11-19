const { describe, it, before, beforeEach, afterEach } = require("mocha");
const { expect } = require("chai");
const sinon = require("sinon");
const { join } = require("path");
const {
  CarCategoryService,
} = require("../../../src/resources/car-category/car-category.service");
const { CarService } = require("../../../src/resources/car/car.service");

const CAR_FILE_PATH = join(__dirname, "../../../", "database", "cars.json");

const FILE_PATH = join(
  __dirname,
  "../../../",
  "database",
  "car-categories.json"
);

const mocks = {
  car: require("../../mocks/car.json"),
  carCategory: require("../../mocks/car-category.json"),
};

describe("[UNIT] Car category", () => {
  let service, sandbox;

  before(() => {
    service = new CarCategoryService({
      filePath: FILE_PATH,
      childServices: { car: new CarService({ filePath: CAR_FILE_PATH }) },
    });
  });

  beforeEach(() => (sandbox = sinon.createSandbox()));

  afterEach(() => sandbox.restore());

  describe("[METH] getAvailableCar", () => {
    it("should find an available car from it's category", async () => {
      sandbox
        .stub(service.repository, service.repository.find.name)
        .resolves(mocks.carCategory);

      sandbox
        .stub(
          service.childServices.car.repository,
          service.childServices.car.repository.find.name
        )
        .resolves(mocks.car);

      const result = await service.getAvailableCar(mocks.carCategory.id);

      const { carIds, ...category } = mocks.carCategory;

      expect(result).to.be.deep.eq({ ...mocks.car, category });
    });

    it("should not find car category", async () => {
      const stub = sandbox
        .stub(service.repository, service.repository.find.name)
        .resolves(undefined);

      const childSpy = sandbox.spy(
        service.childServices.car,
        service.childServices.car.getAvailableCar.name
      );

      const result = await service.getAvailableCar(mocks.carCategory.id);

      expect(stub.callCount).to.be.eq(1);
      expect(childSpy.callCount).to.be.eq(0);
      expect(result).to.be.eq(undefined);
    });

    it("should not find an available car from it's category", async () => {
      const stub = sandbox
        .stub(service.repository, service.repository.find.name)
        .resolves(mocks.carCategory);

      const childStub = sandbox
        .stub(
          service.childServices.car.repository,
          service.childServices.car.repository.find.name
        )
        .resolves(undefined);

      const result = await service.getAvailableCar(mocks.carCategory.id);

      expect(stub.callCount).to.be.eq(1);
      expect(childStub.callCount).to.be.eq(1);
      expect(result).to.be.eq(undefined);
    });
  });
});
