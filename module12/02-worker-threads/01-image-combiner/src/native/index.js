import { createServer } from "node:http";
import { parse } from "node:url";
import { Worker } from "node:worker_threads";

// with worker threads, sharp library must be imported in the main thread as well
import "sharp";

const WORKER_FILE = "worker.js";

async function joinImages(images) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(`${import.meta.dirname}/${WORKER_FILE}`);

    worker.postMessage(images);

    worker.once("message", resolve);
    worker.once("error", reject);
    worker.once("exit", (code) => {
      if (code !== 0)
        return reject(
          new Error(`Thread ${worker.threadId} has sttoped with code ${code}`)
        );

      console.log(`Thread ${worker.threadId} has exited`);
    });
  });
}

createServer(async (req, res) => {
  if (req.url.includes("join-images")) {
    const { query } = parse(req.url, true);

    const base64Image = await joinImages(query);

    res.writeHead(200, {
      "content-type": "text/html",
    });

    return res.end(`<img src="data:image/jpeg;base64, ${base64Image}" />`);
  }

  res.end("ok");
}).listen(3000, () => console.log("Listening on port 3000"));
