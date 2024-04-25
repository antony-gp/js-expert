$.verbose = false;

import { setTimeout } from "timers/promises";
import isSafe from "safe-regex";

await $`sudo docker run -p "8080:80" -d nginx`;

await setTimeout(500);

const req = await $`curl --silent localhost:8080`;

console.log(`req\n`, req.stdout);

const containers = await $`sudo docker ps`;
const expression = /(?<containerId>\w+)\W+(?=nginx)/;

if (!isSafe(expression)) throw new Error("Unsafe regex!");

const {
  groups: { containerId },
} = containers.toString().match(expression);

console.log("logs\n", (await $`sudo docker logs ${containerId}`).stdout);
console.log("rm\n", (await $`sudo docker rm -f ${containerId}`).stdout);
