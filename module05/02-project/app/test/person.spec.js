const { describe, it } = require("mocha");
const { expect } = require("chai");

const { evaluateExpression, UnsafeRegexError } = require("../src/utils");
const Person = require("../src/person");

describe("Person", () => {
  it("should create person instace with given values", () => {
    const values = [
      "Xuxa da Silva",
      "brasileira",
      "casada",
      "CPF 235.743.420-12",
      "residente e domiciliada a Rua dos bobos",
      "zero",
      "bairro Alphaville",
      "São Paulo.",
    ];

    const person = new Person(values);

    expect(person).to.be.deep.equal({
      name: "Xuxa da Silva",
      nationality: "Brasileira",
      maritalStatus: "Casada",
      document: "23574342012",
      address: "Rua dos bobos",
      number: "zero",
      neighborhood: "Alphaville",
      city: "São Paulo",
    });
  });
});
