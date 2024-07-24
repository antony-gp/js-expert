import { parentPort } from "node:worker_threads";
import sharp from "sharp";
import axios from "axios";

async function downloadFile(url) {
  const response = await axios.get(url, {
    responseType: "arraybuffer",
  });

  return response.data;
}

parentPort.on("message", async ({ foreground, background }) => {
  const foregroundImage = await sharp(await downloadFile(foreground))
    .resize(600)
    .flop(true)
    .toBuffer();

  const backgroundImage = await sharp(await downloadFile(background))
    .composite([{ input: foregroundImage, gravity: sharp.gravity.south }])
    .resize(1000)
    .toBuffer();

  parentPort.postMessage(backgroundImage.toString("base64"));
});
