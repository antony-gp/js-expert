import { describe, it, expect, beforeEach, jest } from "@jest/globals";
import axios from "axios";
import fs from "fs/promises";

import RickAndMortyBRL from "../../../src/services/integrations/rick-and-morty/brl.js";
import Character from "../../../src/entities/character.js";

const mocks = {
  valid: await fs.readFile("./test/mocks/json/valid.json"),
  empty: await fs.readFile("./test/mocks/json/empty.json"),
};

describe("RickAndMortyBRL", () => {
  beforeEach(jest.clearAllMocks.bind(jest));

  it("getCharactersJSON should return a list of Character Entity", async () => {
    const response = JSON.parse(mocks.valid);
    const expected = response.results.map((char) => new Character(char));

    jest.spyOn(axios, "get").mockResolvedValue({ data: response });

    const result = await RickAndMortyBRL.getCharactersJSON();

    expect(result).toStrictEqual(expected);
  });

  it("getCharactersJSON should return an empty list", async () => {
    const response = JSON.parse(mocks.empty);
    const expected = response.results;

    jest.spyOn(axios, "get").mockResolvedValue({ data: response });

    const result = await RickAndMortyBRL.getCharactersJSON();

    expect(result).toStrictEqual(expected);
  });
});
