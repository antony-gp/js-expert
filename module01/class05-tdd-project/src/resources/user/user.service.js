const { Tax } = require("../../entities");
const { UserRepository } = require("./user.repository");

exports.UserService = class {
  constructor({ filePath }) {
    this.repository = new UserRepository({ filePath });
  }

  async getUserWithTax(userId) {
    const user = await this.repository.find(userId);

    if (!user) return;

    const taxFromAge = Tax.fromAges.find(
      ({ from, to }) => user.age >= from && user.age <= to
    );

    if (!taxFromAge) return;

    return { ...user, tax: taxFromAge.tax };
  }
};
