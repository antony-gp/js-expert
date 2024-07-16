import { spawn } from "node:child_process";

const pythonFile = "index.py";
const pythonCommand = "python3";

async function requestPython({ url, headers, filePath }) {
  const py = spawn(pythonCommand, [
    pythonFile,
    JSON.stringify({ url, headers, filePath }),
  ]);

  const response = [];

  for await (const data of py.stdout) response.push(data);

  return response.join("");
}

const result = await requestPython({
  url: "http://localhost:3000",
  headers: { "content-type": "application/json" },
  filePath: "./data.csv",
});

console.log(result);
