import Application from "./shared/base/application.mjs";
import { database } from "./shared/database/database.mjs";

const path = globalThis.window ? "browser" : "terminal";

const { default: ViewFactory } = await import(
  `./environments/${path}/index.mjs`
);

const app = new Application(new ViewFactory());

app.init(database);
