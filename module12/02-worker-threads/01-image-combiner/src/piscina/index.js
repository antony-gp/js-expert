import { createServer } from "node:http";
import { parse } from "node:url";
import Piscina from "piscina";

// with worker threads, sharp library must be imported in the main thread as well
import "sharp";

const WORKER_FILE = "worker.js";

const threadPool = new Piscina({
  filename: new URL(WORKER_FILE, import.meta.url).href,
});

createServer(async (req, res) => {
  if (req.url.includes("join-images")) {
    const { query } = parse(req.url, true);

    const base64Image = await threadPool.run(query);

    res.writeHead(200, {
      "content-type": "text/html",
    });

    return res.end(`<img src="data:image/jpeg;base64, ${base64Image}" />`);
  }

  res.end("ok");
}).listen(3000, () => console.log("Listening on port 3000"));
