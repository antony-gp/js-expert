const { evaluateExpression } = require("./utils");

class Person {
  constructor([
    name,
    nationality,
    maritalStatus,
    document,
    address,
    number,
    neighborhood,
    city,
  ]) {
    this.name = name;
    this.nationality = this.#capitalizeName(nationality);
    this.maritalStatus = this.#capitalizeName(maritalStatus);
    this.document = document.replace(evaluateExpression(/\D/g), "");
    this.address = address.match(evaluateExpression(/(?<=\sa\s).*$/)).pop();
    this.number = number;
    this.neighborhood = neighborhood.match(/(?<=\s).*$/).pop();
    this.city = city.replace(/\.$/, "");
  }

  #capitalizeName(text) {
    return text.replace(evaluateExpression(/\w/), (match) =>
      match.toUpperCase()
    );
  }
}

module.exports = Person;
