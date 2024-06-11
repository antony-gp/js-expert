import { Duplex, Transform } from "node:stream";

let count = 0;

const server = new Duplex({
  objectMode: true, // uses more memory, but automatically converts chunks to string
  encoding: "utf-8",
  read() {
    const push = this.push.bind(this);

    setInterval(function () {
      if (count++ < 5) return push(`iteration ${count}\n`);

      clearInterval(this);
      push(null);
    }, 1000);
  },

  write(chunk, encoding, cb) {
    process.stdout.write(`[writable] ${chunk}`);
    cb();
  },
});

const transform = new Transform({
  objectMode: true,
  transform(chunk, encoding, cb) {
    cb(null, chunk.toUpperCase());
  },
});

// transform is also a duplex (but not independant), this will call the transform function
transform.write("[transform] wrote via transform\n");

// this will ignore the transform function
transform.push("[transform] sent via transform\n");

server.write("wrote via duplex\n");

server.on("data", (msg) => process.stdout.write(`[readable] ${msg}`));

server.push(`sent via duplex\n`);

server.pipe(server).pipe(transform).pipe(process.stdout);
