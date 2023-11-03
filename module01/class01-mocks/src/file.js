const { readFile } = require("fs/promises");
const { constants } = require("./constants");

exports.File = class {
  static async csvToJSON(
    path,
    { maxEntries = 10, headers = constants.headers } = {}
  ) {
    const csv = await readFile(path, "utf-8");
    this.#validate(csv, { maxEntries, headers: headers.all });
    return this.#parse(csv, { requiredHeaders: headers.required });
  }

  static #parse(csv, { requiredHeaders }) {
    const [header, ...entries] = csv.split(/\r?\n/);

    const receivedHeaders = header.split(",").map((header) => header.trim());

    const array = [];

    entries.forEach((entry, line) => {
      const json = {};

      entry.split(",").forEach((value, index) => {
        value = value.trim();

        if (!value && requiredHeaders.includes(receivedHeaders[index]))
          throw new Error(
            constants.error.REQUIRED_VALUES.replace("$line", line + 1).replace(
              "$header",
              receivedHeaders[index]
            )
          );

        if (receivedHeaders[index] === "id") {
          if (Number.isInteger(+value) && +value <= 0)
            throw new Error(
              constants.error.INVALID_ID.replace("$line", line + 1)
            );

          if (array.find(({ id }) => id === value))
            throw new Error(
              constants.error.DUPLICATE_ID.replace("$line", line + 1).replace(
                "$id",
                value
              )
            );
        }

        if (value.length) json[receivedHeaders[index]] = value;
      });

      array.push(json);
    });

    return array;
  }

  static #validate(csv, { maxEntries, headers }) {
    if (!csv.length) throw new Error(constants.error.EMPTY_FILE);

    const [header, ...entries] = csv.split(/\r?\n/);

    const receivedHeaders = header.split(",").map((header) => header.trim());

    const missingHeaders = headers.filter(
      (header) => !receivedHeaders.includes(header)
    );

    if (missingHeaders.length)
      throw new Error(
        constants.error.PARTIAL_HEADERS.replace(
          "$headers",
          missingHeaders.join(", ")
        )
      );

    if (entries.length < 1) throw new Error(constants.error.NO_ENTRIES);

    if (entries.length > maxEntries)
      throw new Error(
        constants.error.TOO_MANY_ENTRIES.replace("$amount", maxEntries)
      );
  }
};
