import http from "node:http";
import { statusCodes } from "./utils/http-status-codes.js";
import Person from "./person/person.entity.js";

http
  .createServer(async (request, response) => {
    for await (const data of request) {
      let body = {};

      try {
        // to simulate unexpected error, just send an invalid JSON
        body = JSON.parse(data);

        const person = new Person(body);

        if (!person.validate()) {
          response.writeHead(statusCodes.UNPROCESSABLE_ENTITY);
          body = { message: person.errors };
          continue;
        }

        response.writeHead(statusCodes.OK);
      } catch (error) {
        console.error(error);
        response.writeHead(statusCodes.INTERNAL_SERVER_ERROR);
        body = { message: "Internal Server Error" };
      } finally {
        response.write(JSON.stringify(body, null, 2));
        response.end();
      }
    }
  })
  .listen(3000, () => console.log("Listening on port 3000"));
