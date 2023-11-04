const { RequestService } = require("./request.service");
const assert = require("assert");

const spec = [
  {
    mock: require("../../mocks/88535000.json"),
    url: "https://viacep.com.br/ws/88535000/json",
  },
  {
    mock: require("../../mocks/89256120.json"),
    url: "https://viacep.com.br/ws/89256120/json",
  },
];

(async () => {
  for (const { mock, url } of spec) {
    const result = await RequestService.get(url);
    assert.deepStrictEqual(result, mock);
  }
})();
