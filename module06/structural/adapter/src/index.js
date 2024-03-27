import RickAndMortyBRLAdapter from "./services/adpters/rick-and-morty/brl.js";
import RickAndMortyUSAAdapter from "./services/adpters/rick-and-morty/usa.js";

const data = await Promise.all(
  [RickAndMortyBRLAdapter, RickAndMortyUSAAdapter].map((integration) =>
    integration.getCharacters()
  )
);

console.table(data.flat());
