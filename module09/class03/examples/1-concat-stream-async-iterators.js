import axios from "axios";
import { pipeline } from "node:stream/promises";

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

async function* transform(stream) {
  for await (const data of stream) {
    const { name } = data.match(/:"(?<name>.*)(?=-)/).groups;
    yield `[${name.toLowerCase().replace(/[^\w\d]/g, "")}] ${data}\n`;
  }
}

async function* merge(streams) {
  for (const readable of streams) {
    readable.setEncoding("utf8"); // use objectMode

    for await (const chunk of readable)
      for (const line of chunk.trim().split(/\n/)) yield line;
  }
}

await pipeline(merge(response), transform, process.stdout);
