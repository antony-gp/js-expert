const { describe, it, before, beforeEach, afterEach } = require("mocha");
const { expect } = require("chai");
const sinon = require("sinon");
const { join } = require("path");
const { RentService } = require("../../../src/resources/rent/rent.service");
const { UserService } = require("../../../src/resources/user/user.service");
const {
  CarCategoryService,
} = require("../../../src/resources/car-category/car-category.service");
const { CarService } = require("../../../src/resources/car/car.service");

const USER_FILE_PATH = join(__dirname, "../../../", "database", "user.json");

const CAR_FILE_PATH = join(__dirname, "../../../", "database", "cars.json");

const CAR_CATEGORY_FILE_PATH = join(
  __dirname,
  "../../../",
  "database",
  "car-categories.json"
);

const mocks = {
  carCategory: require("../../mocks/car-category.json"),
  car: require("../../mocks/car.json"),
  user: require("../../mocks/user.json"),
};

describe("[UNIT] Rent", () => {
  let service, sandbox;

  before(() => {
    service = new RentService({
      childServices: {
        carCategory: new CarCategoryService({
          filePath: CAR_CATEGORY_FILE_PATH,
          childServices: { car: new CarService({ filePath: CAR_FILE_PATH }) },
        }),
        user: new UserService({
          filePath: USER_FILE_PATH,
        }),
      },
    });
  });

  beforeEach(() => (sandbox = sinon.createSandbox()));

  afterEach(() => sandbox.restore());

  describe("[METH] getRentPrice", () => {
    it("should calculate rent price", async () => {
      const expected = `R$${String.fromCharCode(160)}244,40`;

      const result = await service.getRentPrice(1.3, 37.6, 5);

      expect(result).to.be.eq(expected);
    });

    it("should return undefined if any param is equivalent to NaN", async () => {
      const params = [1.3, 37.6, 5];

      for (const index of Object.keys(params)) {
        const currentParams = [...params];

        currentParams[index] = undefined;

        const result = await service.getRentPrice(...currentParams);

        expect(result).to.be.eq(undefined);
      }
    });
  });

  describe("[METH] getDueDate", () => {
    it("should return due date", async () => {
      const expected = `10 de novembro de 2020`;

      sandbox.useFakeTimers(+new Date(2020, 10, 5));

      const result = await service.getDueDate(5);

      expect(result).to.be.eq(expected);
    });

    it("should not return due date if no days are informed", async () => {
      const result = await service.getDueDate();

      expect(result).to.be.eq(undefined);
    });
  });

  describe("[METH] rent", () => {
    it("should return rent transaction", async () => {
      const tax = 1.3;

      sandbox
        .stub(
          service.childServices.user,
          service.childServices.user.getUserWithTax.name
        )
        .resolves({ ...mocks.user, tax });

      sandbox
        .stub(
          service.childServices.carCategory,
          service.childServices.carCategory.getAvailableCar.name
        )
        .resolves({ ...mocks.car, category: mocks.carCategory });

      sandbox.useFakeTimers(+new Date(2020, 10, 5));

      const expected = {
        customer: { ...mocks.user, tax },
        car: mocks.car,
        amount: `R$${String.fromCharCode(160)}244,40`,
        dueDate: "10 de novembro de 2020",
      };

      const result = await service.rent(mocks.user.id, mocks.carCategory.id, 5);

      expect(result).to.be.deep.eq(expected);
    });

    it("should return undefined if user is not found", async () => {
      const stub = sandbox
        .stub(
          service.childServices.user,
          service.childServices.user.getUserWithTax.name
        )
        .resolves(undefined);

      const spy = sandbox.spy(
        service.childServices.carCategory,
        service.childServices.carCategory.getAvailableCar.name
      );

      const result = await service.rent(mocks.user.id, mocks.carCategory.id, 5);

      expect(stub.callCount).to.be.eq(1);
      expect(spy.callCount).to.be.eq(0);
      expect(result).to.be.eq(undefined);
    });

    it("should return undefined if car category is not found", async () => {
      const userStub = sandbox
        .stub(
          service.childServices.user,
          service.childServices.user.getUserWithTax.name
        )
        .resolves(mocks.user);

      const carCategoryStub = sandbox
        .stub(
          service.childServices.carCategory,
          service.childServices.carCategory.getAvailableCar.name
        )
        .resolves(undefined);

      const result = await service.rent(mocks.user.id, mocks.carCategory.id, 5);

      expect(userStub.callCount).to.be.eq(1);
      expect(carCategoryStub.callCount).to.be.eq(1);
      expect(result).to.be.eq(undefined);
    });
  });
});
