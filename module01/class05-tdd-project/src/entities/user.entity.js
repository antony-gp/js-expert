const { BaseEntity } = require("./base/base.entity");

exports.UserEntity = class extends BaseEntity {
  constructor({ id, name, document, age }) {
    super({ id, name });
    this.document = document;
    this.age = age;
  }
};
