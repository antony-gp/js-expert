import { describe, it, expect, beforeEach, jest } from "@jest/globals";

import RickAndMortyUSA from "../../../src/services/integrations/rick-and-morty/usa.js";
import RickAndMortyUSAAdapter from "../../../src/services/adpters/rick-and-morty/usa.js";

describe("RickAndMortyUSAAdapter", () => {
  beforeEach(jest.clearAllMocks.bind(jest));

  it("getCharacters should adapt response from RickAndMortyUSAAdapter.getCharactersXML", async () => {
    const usaIntegration = jest
      .spyOn(RickAndMortyUSA, RickAndMortyUSA.getCharactersXML.name)
      .mockResolvedValue([]);

    const result = await RickAndMortyUSAAdapter.getCharacters();

    expect(result).toStrictEqual([]);
    expect(usaIntegration).toBeCalled();
  });
});
