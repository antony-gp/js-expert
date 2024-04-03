import FluentSQLBuilder from "@antony-gp/fluentsql";

import database from "./database/data.json" assert { type: "json" };

const result = FluentSQLBuilder.for(database)
  .where({ registered: /^(2020|2019)/ })
  .select(["category"])
  .countBy("category")
  .build();

console.log(result);
