import draftlog from "draftlog";
import chalk from "chalk";
import chalkTable from "chalk-table";
import readline from "readline";

import Person from "./person.js";

export default class TerminalController {
  constructor(database, lang) {
    this.database = database;
    this.lang = lang;

    this.initTerminal();
  }

  initTerminal() {
    draftlog(console).addLineListener(process.stdin);

    this.terminal = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    this.initTable();
  }

  closeTerminal() {
    this.terminal.close();
  }

  initTable() {
    this.data = this.database.map((item) => new Person(item).format(this.lang));

    const table = chalkTable(this.getTableOptions(), this.data);

    this.print = console.draft(table);
  }

  updateTable(item) {
    this.data.push(item);
    this.print(chalkTable(this.getTableOptions(), this.data));
  }

  question(question) {
    return new Promise((resolve) => this.terminal.question(question, resolve));
  }

  getTableOptions() {
    return {
      leftPad: 2,
      columns: [
        { field: "id", name: chalk.cyan("ID") },
        { field: "vehicles", name: chalk.cyan("Vehicles") },
        { field: "distanceTraveled", name: chalk.cyan("Distance traveled") },
        { field: "from", name: chalk.cyan("From") },
        { field: "to", name: chalk.cyan("To") },
      ],
    };
  }
}
