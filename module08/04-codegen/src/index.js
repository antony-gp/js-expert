#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import Layer from "./layers.js";

const {
  argv: { folder, component, repository, service },
} = yargs(hideBin(process.argv))
  .command("create", "create one or more components", (builder) =>
    builder
      .option("component", {
        alias: "c",
        demandOption: true,
        describe: "components to be created",
        type: "array",
        array: true,
      })
      .option("repository", {
        alias: "r",
        describe: "creates components with repository layer only",
        type: "boolean",
      })
      .option("folder", {
        alias: "f",
        describe: "changes the folder where compnents will be created",
        type: "string",
      })
      .option("service", {
        alias: "s",
        describe: "creates components with service and repository layers only",
        type: "boolean",
      })
      .example(
        "create --component product",
        "creates a project with a single component with all layers (repository, service and factory)"
      )
      .example(
        "create -f main -r -c product order",
        "creates a project with a 'main' folder with multiple components with repository layer only"
      )
      .example(
        "create -s -c order",
        "creates a project with a single component with repository and service layers only"
      )
  )
  .epilog("created and maintained by antony-gp");

const defaultFolder =
  folder || (process.env.NODE_ENV === "dev" ? "tmp" : "src");

const layerOption = repository ? "repository" : service ? "service" : "factory";

await Promise.all(
  component.map((name) =>
    new Layer(name, ".", defaultFolder).create(layerOption)
  )
);
