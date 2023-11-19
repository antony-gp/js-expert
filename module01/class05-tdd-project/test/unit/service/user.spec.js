const { describe, it, before, beforeEach, afterEach } = require("mocha");
const { expect } = require("chai");
const sinon = require("sinon");
const { join } = require("path");
const { UserService } = require("../../../src/resources/user/user.service");
const { Tax } = require("../../../src/entities");

const FILE_PATH = join(__dirname, "../../../", "database", "users.json");

const mocks = { user: require("../../mocks/user.json") };

describe("[UNIT] User", () => {
  let service, sandbox;

  before(() => {
    service = new UserService({ filePath: FILE_PATH });
  });

  beforeEach(() => (sandbox = sinon.createSandbox()));

  afterEach(() => sandbox.restore());
  describe("[METH] getUserWithTax", () => {
    it("should return user with tax", async () => {
      const tax = 1.3;

      sandbox
        .stub(service.repository, service.repository.find.name)
        .resolves(mocks.user);

      sandbox.stub(Tax, "fromAges").get(() => [{ from: 31, to: 100, tax }]);

      const result = await service.getUserWithTax(mocks.user.id);

      expect(result).to.be.deep.eq({ ...mocks.user, tax });
    });

    it("should not find user", async () => {
      sandbox
        .stub(service.repository, service.repository.find.name)
        .resolves(undefined);

      const result = await service.getUserWithTax(mocks.user.id);

      expect(result).to.be.eq(undefined);
    });

    it("should not find tax", async () => {
      sandbox
        .stub(service.repository, service.repository.find.name)
        .resolves(mocks.user);

      sandbox.stub(Tax, "fromAges").get(() => [{ from: 31, to: 49, tax: 1.3 }]);

      const result = await service.getUserWithTax(mocks.user.id);

      expect(result).to.be.eq(undefined);
    });
  });
});
