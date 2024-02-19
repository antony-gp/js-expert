const TextProcessor = require("./text-processor");

class TextProcessorFacade {
  #textProcessor;

  constructor(text) {
    this.#textProcessor = new TextProcessor(text);
  }

  getPeopleFromPDF() {
    return this.#textProcessor
      .extractPeopleData()
      .peopleDataToColumns()
      .removeEmptyCharacters()
      .mapPerson()
      .build();
  }
}

module.exports = TextProcessorFacade;
