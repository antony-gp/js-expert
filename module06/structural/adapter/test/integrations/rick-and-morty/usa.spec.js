import { describe, it, expect, beforeEach, jest } from "@jest/globals";
import { parseStringPromise } from "xml2js";
import axios from "axios";
import fs from "fs/promises";

import RickAndMortyUSA from "../../../src/services/integrations/rick-and-morty/usa.js";
import Character from "../../../src/entities/character.js";

const mocks = {
  valid: await fs.readFile("./test/mocks/xml/valid.xml"),
  empty: await fs.readFile("./test/mocks/xml/empty.xml"),
};

const xml2jsOptions = {
  explicitRoot: false,
  explicitArray: false,
};

describe("RickAndMortyBRL", () => {
  it("getCharactersXML should return a list of Character Entity", async () => {
    const parsed = await parseStringPromise(mocks.valid, xml2jsOptions);
    const expected = [new Character(parsed.results.element)];

    jest.spyOn(axios, "get").mockResolvedValue({ data: mocks.valid });

    const result = await RickAndMortyUSA.getCharactersXML();

    expect(result).toStrictEqual(expected);
  });

  it("getCharactersXML should return an empty list", async () => {
    const expected = [];

    jest.spyOn(axios, "get").mockResolvedValue({ data: mocks.empty });

    const result = await RickAndMortyUSA.getCharactersXML();

    expect(result).toStrictEqual(expected);
  });
});
