exports.TransactionEntity = class {
  constructor({ customer, car, amount, dueDate }) {
    this.customer = customer;
    this.car = car;
    this.amount = amount;
    this.dueDate = dueDate;
  }
};
