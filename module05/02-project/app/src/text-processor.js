const Person = require("./person");
const { evaluateExpression } = require("./utils");

// FluentAPI: allows chaining methods until a "done" method is called
class TextProcessor {
  #content = "";

  constructor(content) {
    this.#content = content;
  }

  extractPeopleData() {
    // (?<=contratante|contratada) macthes what comes after exactly "contratante" or "contratada"
    // (?<=(?<=contratante|contratada):\s{1}) macthes what comes after exactly group previouly mentioned followed by a colon and one space
    // (?!\s) does not match if following character is space
    // (.*\n.*?) matches anything until linebreak, then matches linebreak, then matches anything until linebreak again, stopping at first occurence
    // $ matches only if previous serach ends at line end
    // Modifiers: g (global), i (case insensitive), m (multiline)
    const peopleDataRegex = evaluateExpression(
      /(?<=(?<=contratante|contratada):\s{1})(?!\s)(.*\n.*?)$/gim
    );

    this.#content = this.#content.match(peopleDataRegex);

    return this;
  }

  peopleDataToColumns() {
    const splitRegex = evaluateExpression(/,/);

    this.#content = this.#content.map((line) => line.split(splitRegex));

    return this;
  }

  removeEmptyCharacters() {
    const replaceRegex = evaluateExpression(/^\s|\s+$|\n/g);

    this.#content = this.#content.map((line) =>
      line.map((text) => text.replace(replaceRegex, ""))
    );

    return this;
  }

  mapPerson() {
    this.#content = this.#content.map((args) => new Person(args));

    return this;
  }

  build() {
    return this.#content;
  }
}

module.exports = TextProcessor;
