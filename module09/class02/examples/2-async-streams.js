import { pipeline } from "node:stream/promises";
import { setTimeout } from "node:timers/promises";

async function* readable() {
  yield Buffer.from("This is a ");
  await setTimeout(100);
  yield Buffer.from("custom readable");
}

async function* transform(stream) {
  for await (const chunk of stream) yield chunk.toString().replace(/\s/g, "_");
}

async function* duplex(stream) {
  let fullText = "";

  for await (const chunk of stream) {
    console.log(`[duplex writable] ${chunk}`);
    fullText += chunk;
  }

  yield `[duplex readable] ${fullText}`;
}

async function writable(stream) {
  for await (const chunk of stream) console.log(`[writable] ${chunk}`);
}

try {
  const controller = new AbortController();

  setImmediate(() => controller.abort()); // forced error

  await pipeline(readable, transform, duplex, writable, {
    signal: controller.signal,
  });
} catch (err) {
  console.error(err.message);
}
