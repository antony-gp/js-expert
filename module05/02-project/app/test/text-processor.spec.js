const { describe, it } = require("mocha");
const { expect } = require("chai");

const TextProcessor = require("../src/text-processor");
const mocks = {
  valid: require("./mocks/textProcessor/valid"),
};

const expected = {
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
  mapPerson: [
    {
      name: "Xuxa da Silva",
      nationality: "Brasileira",
      maritalStatus: "Casada",
      document: "23574342012",
      address: "Rua dos bobos",
      number: "zero",
      neighborhood: "Alphaville",
      city: "São Paulo",
    },
  ],
};

describe("TextProcessor", () => {
  it("build", () => {
    const res = new TextProcessor(mocks.valid).build();

    expect(res).to.be.equal(mocks.valid);
  });

  it("extractPeopleData", () => {
    const res = new TextProcessor(mocks.valid).extractPeopleData().build();

    expect(res).to.be.deep.equal(expected.extractPeopleData);
  });

  it("peopleDataToColumns", () => {
    const res = new TextProcessor([expected.extractPeopleData[0]])
      .peopleDataToColumns()
      .build();

    expect(res).to.be.deep.equal(expected.peopleDataToColumns);
  });

  it("removeEmptyCharacters", () => {
    const res = new TextProcessor(expected.peopleDataToColumns)
      .removeEmptyCharacters()
      .build();

    expect(res).to.be.deep.equal(expected.removeEmptyCharacters);
  });

  it("mapPerson", () => {
    const res = new TextProcessor(expected.removeEmptyCharacters)
      .mapPerson()
      .build();

    expect(res).to.be.deep.equal(expected.mapPerson);
  });
});
