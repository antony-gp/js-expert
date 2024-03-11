import ContextStrategy from "./base/context.strategy.js";
import MongoDBStrategy from "./strategies/mongodb.strategy.js";
import PostgresStrategy from "./strategies/postgres.strategy.js";

const uris = {
  postgres: process.env.POSTGRES_URI,
  mongodb: process.env.MONGODB_URI,
};

const contextTypes = new Map()
  .set("transaction", new ContextStrategy(new PostgresStrategy(uris.postgres)))
  .set("log", new ContextStrategy(new MongoDBStrategy(uris.mongodb)));

for (const [, context] of contextTypes) await context.connect();

const data = [
  { name: `psql${Date.now()}`, type: "transaction" },
  { name: `mongo${Date.now()}`, type: "log" },
];

for (const { type, ...item } of data) {
  const context = contextTypes.get(type);

  await context.table("warriors").create(item);

  console.log(await context.read());
}
