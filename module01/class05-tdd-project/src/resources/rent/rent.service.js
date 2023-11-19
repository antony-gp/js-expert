const { TransactionEntity } = require("../../entities");
const { toBrlCurrency } = require("../../utils");

exports.RentService = class {
  constructor({ childServices: { user, carCategory } }) {
    this.childServices = { user, carCategory };
  }

  getRentPrice(userTax, carCategoryPrice, days) {
    const value = userTax * carCategoryPrice * days;

    if (isNaN(value)) return;

    return toBrlCurrency(value);
  }

  getDueDate(days) {
    const dueDate = new Date();

    dueDate.setDate(dueDate.getDate() + days);

    if (!isNaN(dueDate))
      return Intl.DateTimeFormat("pt-BR", { dateStyle: "long" }).format(
        dueDate
      );
  }

  async rent(userId, carCategoryId, days) {
    const customer = await this.childServices.user.getUserWithTax(userId);

    if (!customer) return;

    const carWithCategory =
      await this.childServices.carCategory.getAvailableCar(carCategoryId);

    if (!carWithCategory) return;

    const { category, ...car } = carWithCategory;

    const amount = this.getRentPrice(customer.tax, category.price, days);

    const dueDate = this.getDueDate(days);

    return new TransactionEntity({
      customer,
      car,
      amount,
      dueDate,
    });
  }
};
