import { createReadStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import csvtojson from "csvtojson";
import { Transform, Writable } from "node:stream";
import { setTimeout } from "node:timers/promises";

const database = process.argv[2];

async function onMessage(message) {
  const items = [];

  await pipeline(
    createReadStream(database),
    csvtojson(),
    Transform({
      transform(chunk, encoding, callback) {
        const data = JSON.parse(chunk);

        if (data.Name !== message.Name) return callback();

        if (items.includes(message.Name)) return callback(null, message.Name);

        items.push(message.Name);

        callback();
      },
    }),
    Writable({
      write(chunk, encoding, callback) {
        if (!chunk) return callback();

        process.send(message);

        callback();
      },
    })
  );
}

process.on("message", onMessage);

// console.log(`[${process.pid}] Child process has started`);

await setTimeout(10000);

process.channel.unref();
