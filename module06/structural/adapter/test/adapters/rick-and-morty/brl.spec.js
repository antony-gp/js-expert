import { describe, it, expect, beforeEach, jest } from "@jest/globals";

import RickAndMortyBRL from "../../../src/services/integrations/rick-and-morty/brl.js";
import RickAndMortyBRLAdapter from "../../../src/services/adpters/rick-and-morty/brl.js";

describe("RickAndMortyBRLAdapter", () => {
  beforeEach(jest.clearAllMocks.bind(jest));

  it("getCharacters should adapt response from RickAndMortyBRLAdapter.getCharactersJSON", async () => {
    const brlIntegration = jest
      .spyOn(RickAndMortyBRL, RickAndMortyBRL.getCharactersJSON.name)
      .mockResolvedValue([]);

    const result = await RickAndMortyBRLAdapter.getCharacters();

    expect(result).toStrictEqual([]);
    expect(brlIntegration).toBeCalled();
  });
});
