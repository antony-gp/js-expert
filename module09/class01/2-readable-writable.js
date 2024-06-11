import { Readable, Writable } from "node:stream";

const readable = new Readable({
  read() {
    this.push("1");
    this.push("2");
    this.push("3");

    this.push(null);
  },
});

const writable = new Writable({
  write(chunk, encoding, cb) {
    console.log("msg", chunk.toString());

    cb();
  },
});

readable.pipe(writable);
