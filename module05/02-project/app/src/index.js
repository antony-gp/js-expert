"use strict";

const { readFile } = require("fs/promises");
const { join } = require("path");
const pdf = require("pdf-parse");

const TextProcessorFacade = require("./text-processor-facade");

(async () => {
  const dataBuffer = await readFile(
    join(__dirname, "../../../docs/contrato.pdf")
  );

  const data = await pdf(dataBuffer);

  const result = new TextProcessorFacade(data.text).getPeopleFromPDF();

  console.log(result);
})();
