import { createServer } from "node:http";
import { randomUUID } from "node:crypto";
import { pipeline } from "node:stream/promises";
import { createWriteStream } from "node:fs";

createServer(async (req, res) => {
  const fileName = `file-${randomUUID()}.csv`;

  await pipeline(req, createWriteStream(fileName));

  res.end("Succesfuly uploaded!");
}).listen(3000, () => console.log("Listening on port 3000"));
