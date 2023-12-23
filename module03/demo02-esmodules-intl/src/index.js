import database from "../database/database.json";
import Person from "./person.js";
import TerminalController from "./terminal-controller.js";
import Repository from "./repository.js";

const DEFAULT_LANG = "pt-br";
const STOP_TERM = "exit";

const terminalController = new TerminalController(database, DEFAULT_LANG);

const repository = new Repository(
  new URL("./../database/database.json", import.meta.url)
);

async function main() {
  try {
    const prompt =
      "Fields: ID, Vehicles (separated by comma), Distance traveled, Unit ('metric' or 'imperial'), From (yyyy-MM-dd), To (yyyy-MM-dd)" +
      "\nInsert new entry (fields separated by space): ";

    const answer = await terminalController.question(prompt);

    if (answer === STOP_TERM) return terminalController.closeTerminal();

    const person = Person.parseFromText(answer);

    terminalController.updateTable(person.format(DEFAULT_LANG));

    await repository.save(person);
  } catch (error) {
    console.error(error);
  }

  return main();
}

await main();
