const { readFile } = require("fs/promises");

exports.BaseRespository = class {
  constructor({ filePath = "" } = {}) {
    this.filePath = filePath;
  }

  async find(id) {
    const data = JSON.parse(await readFile(this.filePath));
    return id ? data.find((item) => item.id === id) : data;
  }
};
