const { constants } = require("../constants");
const { RequestService } = require("../request/request.service");

exports.CepService = class {
  #url;

  constructor(url) {
    if (!url?.includes?.("/:cep")) throw new Error(constants.error.INVALID_URL);
    this.#url = url;
  }

  async findCity(cep) {
    const data = await RequestService.get(this.#url.replace(":cep", cep));

    return {
      city: data.localidade,
      state: data.uf,
    };
  }
};
