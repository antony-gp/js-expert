const { describe, it } = require("mocha");
const { expect } = require("chai");

const TextProcessor = require("../src/text-processor");
const mocks = {
  valid: require("./mocks/textProcessor/valid"),
  extractPeopleData: [
    "Xuxa da Silva, brasileira, casada, CPF 235.743.420-12, residente e \n" +
      "domiciliada a Rua dos bobos, zero, bairro Alphaville, São Paulo. ",
    "Arya Robbin, belga, casado, CPF 884.112.200-52, residente e \n" +
      "domiciliada a Av. paulista, 1400, bairro Consolação, São Paulo. ",
    "Júlia Menezes, brasileira, solteira, CPF 297.947.800-81, residente e \n" +
      "domiciliada a Av. dos Estados, 99, bairro Jardins, São Paulo. ",
  ],
  peopleDataToColumns: [
    [
      "Xuxa da Silva",
      " brasileira",
      " casada",
      " CPF 235.743.420-12",
      " residente e \ndomiciliada a Rua dos bobos",
      " zero",
      " bairro Alphaville",
      " São Paulo. ",
    ],
  ],
  removeEmptyCharacters: [
    [
      "Xuxa da Silva",
      "brasileira",
      "casada",
      "CPF 235.743.420-12",
      "residente e domiciliada a Rua dos bobos",
      "zero",
      "bairro Alphaville",
      "São Paulo.",
    ],
  ],
};

describe("TextProcessor", () => {
  it("build", () => {
    const res = new TextProcessor(mocks.valid).build();

    expect(res).to.be.equal(mocks.valid);
  });

  it("extractPeopleData", () => {
    const res = new TextProcessor(mocks.valid).extractPeopleData().build();

    expect(res).to.be.deep.equal(mocks.extractPeopleData);
  });

  it("peopleDataToColumns", () => {
    const res = new TextProcessor([mocks.extractPeopleData[0]])
      .peopleDataToColumns()
      .build();

    expect(res).to.be.deep.equal(mocks.peopleDataToColumns);
  });

  it("removeEmptyCharacters", () => {
    const res = new TextProcessor(mocks.peopleDataToColumns)
      .removeEmptyCharacters()
      .build();

    expect(res).to.be.deep.equal(mocks.removeEmptyCharacters);
  });
});
