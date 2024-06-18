import timers from "node:timers/promises";
const asyncTimeout = timers.setTimeout;

setTimeout(async () => {
  console.log("Starting process");

  await asyncTimeout(100);

  console.count("debug");
  console.log(await Promise.resolve("order"));

  await asyncTimeout(100);

  console.count("debug");

  await Promise.reject("Error on timeout");
}, 1000);

try {
  console.log("try");
  throw new Error("catch");
} catch (error) {
  console.error(error.message);
} finally {
  console.log("finally");
}

process.on("unhandledRejection", (error) => {
  console.error("unhandledRejection", error.message || error);
});

process.on("uncaughtException", (error) => {
  console.error("uncaughtException", error.message || error);
});

// this goes to unhandledRejection
Promise.reject("random reject");

// this goes to uncaughtException
//   await Promise.reject("random await exception");
// but if it is inside an async context, goes to unhandledRejection
(async () => await Promise.reject("random async/await reject"))();

// this goes to unhandledRejection
(async () => {
  throw new Error("random async error");
})();

// this goes to uncaughtException
throw new Error("random error");
