import mocha from "mocha";
import chai from "chai";
import sinon from "sinon";
import fs from "fs/promises";
import Repository from "../src/repository.js";

const { describe, it } = mocha;
const { expect } = chai;

describe("Repository", () => {
  /**
   * @type {sinon.SinonSandbox}
   */
  let sandbox;

  beforeEach(() => (sandbox = sinon.createSandbox()));

  afterEach(() => sandbox.restore());

  it("should save data to database", async () => {
    const path = "pathToDatabase";
    const repository = new Repository(path);

    sandbox.stub(fs, fs.readFile.name).resolves("[]");
    const stub = sandbox.stub(fs, fs.writeFile.name).resolves(undefined);

    const input = { test: 1 };

    await repository.save(input);

    const calls = stub.getCalls();
    const expected = JSON.stringify([input], null, 2);

    expect(calls.length).to.be.equal(1);
    expect(calls[0].args).to.be.deep.equal([path, expected]);
  });
});
