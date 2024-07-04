import { createServer } from "node:http";
import Events from "node:events";
import { randomBytes } from "node:crypto";

const myEvent = new Events();

function getBytes() {
  return randomBytes(10000);
}

myEvent.on("data", function onData() {
  getBytes();

  const items = [];

  setInterval(function interval() {
    items.push(Date.now());
  });
});

createServer(function handler(req, res) {
  myEvent.emit("data", Date.now());
  res.end("ok");
}).listen(3000, () => console.log("Running at 3000"));
