const { RequestService } = require("../request/request.service");
const { CepService } = require("./cep.service");
const { constants } = require("../constants");
const { createSandbox } = require("sinon");
const assert = require("assert");

const BASE_URL = "https://viacep.com.br/ws/:cep/json";

(async () => {
  const sinon = createSandbox();
  const stub = sinon.stub(RequestService, RequestService.get.name);

  const spec = ["88535000", "89256120"];
  const cepService = new CepService(BASE_URL);

  {
    const invalidUrl = "https://viacep.com.br/ws/cep/json";
    const expected = new Error(constants.error.INVALID_URL);
    assert.throws(() => new CepService(invalidUrl), expected);
  }

  for (const cep of spec) {
    const mock = require(`../../mocks/${cep}.json`);

    stub.withArgs(BASE_URL.replace(":cep", cep)).resolves(mock);

    const result = await cepService.findCity(cep);

    assert.deepStrictEqual(result, {
      city: mock.localidade,
      state: mock.uf,
    });
  }
})();
