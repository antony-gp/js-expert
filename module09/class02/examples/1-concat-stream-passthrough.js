import axios from "axios";
import { PassThrough, Transform } from "node:stream";

const API_00 = "http://localhost:3000";
const API_01 = "http://localhost:3001";

const requests = await Promise.all([
  axios({
    method: "GET",
    url: API_00,
    responseType: "stream",
  }),
  axios({
    method: "GET",
    url: API_01,
    responseType: "stream",
  }),
]);

const response = requests.map(({ data }) => data);

const transform = new Transform({
  transform(chunk, enc, cb) {
    const data = chunk.toString();
    const { name } = data.match(/:"(?<name>.*)(?=-)/).groups;
    cb(null, `[${name.toLowerCase().replace(/[^\w\d]/g, "")}] ${data}`);
  },
});

const mergedStreams = response.reduce((prev, current, i, items) => {
  current.pipe(prev, { end: false });

  current.on("end", () => items.every(({ ended }) => ended) && prev.end());

  return prev;
}, new PassThrough());

mergedStreams.pipe(transform).pipe(process.stdout);
