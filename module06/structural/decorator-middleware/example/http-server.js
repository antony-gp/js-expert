import Http from "node:http";
import { InjectHttpInterceptor } from "../src/agent.js";

InjectHttpInterceptor({ header: ["X-Instrumented-By", "Example"] });

function requestHandler(request, response) {
  response.end("Hello world!");
}

const server = Http.createServer(requestHandler);

server.listen(3000, () =>
  console.log("Server listening at port", server.address().port)
);
