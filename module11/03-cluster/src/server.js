import { appendFile } from "node:fs/promises";
import { createServer } from "node:http";

export function runServer() {
  createServer(async (req, res) => {
    await appendFile("./log.txt", `processed by ${process.pid}\n`);

    const numbers = Array.from({ length: 1e3 }, () => ~~(Math.random() * 50));

    const result = numbers.reduce((sum, num) => sum + num, 0);

    res.end(result.toString());
  }).listen(3000, () => console.log(`[${process.pid}] Listening on port 3000`));

  setTimeout(() => process.exit(1), Math.random() * 1e4);
}
