import http from "node:http";
import { Readable } from "node:stream";

const getReadableStream = (prefix = "") => {
  let count = 0;

  return new Readable({
    read() {
      const push = this.push.bind(this);

      setInterval(function () {
        if (count++ < 100)
          return push(
            `${JSON.stringify({
              id: count,
              name: `${prefix}-${Math.random().toString(36).slice(2)}`,
            })}\n`
          );

        clearInterval(this);
        push(null);
      }, 1000);
    },
  });
};

[0, 1].forEach((id) => {
  const port = 3000 + id;

  http
    .createServer((req, res) => {
      getReadableStream(`API:${id}`).pipe(res);
    })
    .listen(port, () => console.log(`Server running on port ${port}`));
});
