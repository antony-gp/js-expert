import http from "node:http";

http
  .createServer(async (request, response) => {
    try {
      // await Promise.reject("inside handler");
      for await (const data of request) {
        // older versions (e.g. <= 16) will need another try catch block inside for await handle its errors
        // newer versions (e.g. >= 18) will sucessfully handle for await errors with the outer catch
        await Promise.reject("inside for");
      }
    } catch (error) {
      console.error("Unexpected error", error);
      response.writeHead(500);
      response.write(JSON.stringify({ message: "Internal server error" }));
    } finally {
      response.end();
    }
  })
  .listen(3000, () => console.log("Running at port 3000"));
