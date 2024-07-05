import os from "node:os";
import cluster from "node:cluster";

import { runServer } from "./server.js";

if (cluster.isPrimary) {
  const cpuCount = os.cpus().length;

  console.log(`[${process.pid}] Primary process is running`);
  console.log(`[${process.pid}] Forking servers for ${cpuCount} CPU(s)`);

  for (let index = 0; index < cpuCount; index++) cluster.fork();

  cluster.on("exit", (worker, code) => {
    if (code === 0 || worker.exitedAfterDisconnect) return;

    console.log(`[${worker.process.pid}] Worker has stopped abruptly`);
    cluster.fork();
  });
} else runServer();
