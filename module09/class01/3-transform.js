import { Readable, Transform } from "node:stream";
import { createWriteStream } from "node:fs";

const readable = new Readable({
  read() {
    for (let i = 0; i < 1e3; i++)
      this.push(
        JSON.stringify({ id: i, name: Math.random().toString(36).slice(2) })
      );

    this.push(null);
  },
});

const json2Csv = new Transform({
  transform(chunk, encoding, cb) {
    const { id, name } = JSON.parse(chunk);

    cb(null, `${id},${name}\n`);
  },
});

const addHeaders = new Transform({
  transform(chunk, encoding, cb) {
    if (this.headers) return cb(null, chunk);

    this.headers = true;
    cb(null, `id,name\n${chunk}`);
  },
});

readable.pipe(json2Csv).pipe(addHeaders).pipe(createWriteStream("file.csv"));
