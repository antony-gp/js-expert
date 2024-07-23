import { fork } from "node:child_process";
import { createReadStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import csvtojson from "csvtojson";
import { Writable } from "node:stream";

const database = "./data/All_Pokemon.csv";

const PROCESS_COUNT = 25;

const backgroundTaskFile = "./src/bg-processor.js";

const processes = new Map();

const replications = [];

for (let index = 0; index < PROCESS_COUNT; index++) {
  const child = fork(backgroundTaskFile, [database]);

  child.on("exit", () => {
    console.log(`[${child.pid}] Process exited`);
    processes.delete(child.pid);
  });

  child.on("error", () => {
    console.log(`[${child.pid}] Process errored`);
    process.exit(1);
  });

  child.on("message", (message) => {
    if (message.Name && !replications.includes(message.Name)) {
      console.log(`[${child.pid}] ${message.Name} is replicated`);
      replications.push(message.Name);
    }
  });

  processes.set(child.pid, child);
}

function roundRobin(array, index = 0) {
  return function () {
    if (index >= array.length) index = 0;
    return array[index++];
  };
}

const getProcess = roundRobin([...processes.values()]);

console.log(`Starting with ${processes.size} processes`);

await pipeline(
  createReadStream(database),
  csvtojson(),
  Writable({
    write(chunk, encoding, callback) {
      const child = getProcess();
      child.send(JSON.parse(chunk));
      callback();
    },
  })
);
