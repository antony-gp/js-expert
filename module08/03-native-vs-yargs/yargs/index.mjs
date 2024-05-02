#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const hero = ({ name, age, power }) => ({ name, age, power, id: Date.now() });
const { argv } = yargs(hideBin(process.argv))
  .command("createHero", "create a hero", (builder) =>
    builder
      .option("name", {
        alias: "n",
        demandOption: true,
        describe: "hero name",
        type: "string",
      })
      .option("age", {
        alias: "a",
        demandOption: true,
        describe: "hero age",
        type: "number",
      })
      .option("power", {
        alias: "p",
        demandOption: true,
        describe: "hero power",
        type: "string",
      })
      .example(
        'createHero --name Flash --age 20 --power "Super speed"',
        "craete a hero"
      )
      .example(
        'createHero -n Flash -a 20 -p "Super speed"',
        "craete a hero using aliases"
      )
  )
  .epilog("This is a test");

console.log(hero(argv));
