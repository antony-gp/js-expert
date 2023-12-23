import fs from "fs/promises";

export default class Repository {
  constructor(path) {
    this.path = path;
  }

  async save(item) {
    const database = JSON.parse(await fs.readFile(this.path));

    database.push(item);

    await fs.writeFile(this.path, JSON.stringify(database, null, 2));
  }
}
