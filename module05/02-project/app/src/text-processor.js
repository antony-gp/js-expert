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
    const peopleDataRegex =
      /(?<=(?<=contratante|contratada):\s{1})(?!\s)(.*\n.*?)$/gim;

    this.#content = this.#content.match(peopleDataRegex);

    return this;
  }

  build() {
    return this.#content;
  }
}

module.exports = TextProcessor;
