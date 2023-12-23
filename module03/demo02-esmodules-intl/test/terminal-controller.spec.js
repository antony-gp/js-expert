import mocha from "mocha";
import chai from "chai";
import sinon from "sinon";

import readline from "readline";
import chalk from "chalk";

import TerminalController from "../src/terminal-controller.js";
import Person from "../src/person.js";

const { describe, it, beforeEach, afterEach } = mocha;
const { expect } = chai;

describe("TerminalController", () => {
  /**
   * @type {sinon.SinonSandbox}
   */
  let sandbox;

  const lang = "pt-br";
  const database = [
    new Person({
      id: 1,
      vehicles: ["Truck"],
      distanceTraveled: 100000,
      distanceUnit: "metric",
      from: "2010-01-01",
      to: "2020-01-01",
    }),
  ];

  beforeEach(() => (sandbox = sinon.createSandbox()));

  afterEach(() => sandbox.restore());

  it("should instanciate a terminal", () => {
    const spies = [
      TerminalController.prototype.initTerminal.name,
      TerminalController.prototype.initTable.name,
    ].map((method) => sandbox.spy(TerminalController.prototype, method));

    const terminalController = new TerminalController(database, lang);

    spies.forEach((spy) => expect(spy.calledOnce).to.be.true);
    expect(console.draft).to.be.instanceOf(Function);
    expect(terminalController.print).to.be.instanceOf(Function);
    expect(terminalController.terminal).to.be.instanceOf(readline.Interface);
    expect(terminalController.data).to.be.deep.equal(
      database.map((person) => person.format(lang))
    );
  });

  it("should close a terminal", () => {
    const terminalController = new TerminalController(database, lang);

    const spy = sandbox.spy(terminalController.terminal, "close");

    terminalController.closeTerminal();

    expect(spy.calledOnce).to.be.true;
  });

  it("should update data", () => {
    const terminalController = new TerminalController(database, lang);

    const spy = sandbox.spy(terminalController, "print");

    const person = new Person({
      id: 3,
      vehicles: ["SUV", "Car", "Motorcycle"],
      distanceTraveled: 20000000,
      distanceUnit: "imperial",
      from: "1996-04-30",
      to: "2023-09-16",
    });

    terminalController.updateTable(person.format(lang));

    const expected = database
      .concat(person)
      .map((person) => person.format(lang));

    expect(terminalController.data).to.be.deep.equal(expected);
    expect(spy.calledOnce).to.be.true;
  });

  it("should read data from terminal", async () => {
    const terminalController = new TerminalController(database, lang);

    const data = "test";

    const stub = sandbox
      .stub(terminalController.terminal, "question")
      .callsFake((_, resolve) => resolve(data));

    expect(await terminalController.question()).to.be.equal(data);
    expect(stub.calledOnce).to.be.true;
  });

  it("should get table options", () => {
    const expected = {
      leftPad: 2,
      columns: [
        { field: "id", name: chalk.cyan("ID") },
        { field: "vehicles", name: chalk.cyan("Vehicles") },
        { field: "distanceTraveled", name: chalk.cyan("Distance traveled") },
        { field: "from", name: chalk.cyan("From") },
        { field: "to", name: chalk.cyan("To") },
      ],
    };

    const terminalController = new TerminalController(database, lang);

    expect(terminalController.getTableOptions()).to.be.deep.equal(expected);
  });
});
