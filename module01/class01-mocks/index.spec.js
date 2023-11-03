const assert = require("assert");
const { File } = require("./src/file");
const { constants } = require("./src/constants");

(async () => {
  {
    const path = "./mocks/00-non-existent.csv";
    const expected = new Error(
      constants.error.NON_EXISTENT_FILE.replace("$path", path)
    );
    const result = File.csvToJSON(path);
    assert.rejects(result, expected);
  }
  {
    const path = "./mocks/01-empty-file.csv";
    const expected = new Error(constants.error.EMPTY_FILE);
    const result = File.csvToJSON(path);
    assert.rejects(result, expected);
  }
  {
    const path = "./mocks/02-partial-headers.csv";
    const expected = new Error(
      constants.error.PARTIAL_HEADERS.replace("$headers", "id, age")
    );
    const result = File.csvToJSON(path);
    assert.rejects(result, expected);
  }
  {
    const path = "./mocks/03-empty-entries.csv";
    const expected = new Error(constants.error.NO_ENTRIES);
    const result = File.csvToJSON(path);
    assert.rejects(result, expected);
  }
  {
    const path = "./mocks/04-exceed-entries.csv";
    const expected = new Error(
      constants.error.TOO_MANY_ENTRIES.replace("$amount", 10)
    );
    const result = File.csvToJSON(path);
    assert.rejects(result, expected);
  }
  {
    const path = "./mocks/05-empty-required-values.csv";
    const expected = new Error(
      constants.error.REQUIRED_VALUES.replace("$line", 1).replace(
        "$header",
        "firstName"
      )
    );
    const result = File.csvToJSON(path);
    assert.rejects(result, expected);
  }
  {
    const path = "./mocks/06-invalid-id.csv";
    const expected = new Error(constants.error.INVALID_ID.replace("$line", 1));
    const result = File.csvToJSON(path);
    assert.rejects(result, expected);
  }
  {
    const path = "./mocks/07-duplicate-id.csv";
    const expected = new Error(
      constants.error.DUPLICATE_ID.replace("$id", 1).replace("$line", 2)
    );
    const result = File.csvToJSON(path);
    assert.rejects(result, expected);
  }
  {
    const path = "./mocks/08-valid.csv";
    const expected = [
      {
        id: "1",
        firstName: "aaa",
        lastName: "bbb",
        role: "dev",
        age: "20",
      },
      {
        id: "2",
        firstName: "ccc",
        role: "tester",
        age: "21",
      },
      {
        id: "3",
        firstName: "eee",
        lastName: "fff",
        role: "manager",
        age: "22",
      },
      {
        id: "4",
        firstName: "ggg",
        role: "qa",
      },
    ];
    const result = await File.csvToJSON(path);
    assert.deepStrictEqual(result, expected);
  }
})();
