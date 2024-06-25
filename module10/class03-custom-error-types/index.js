import http from "node:http";
import ValidationError from "./errors/validation.error.js";
import { statusCodes } from "./utils/http-status-codes.js";

function validate(body) {
  if (!("name" in body)) throw new ValidationError("field 'name' must exist");

  if (typeof body.name !== "string")
    throw new ValidationError("field 'name' must be a string");

  if (!body.name) throw new ValidationError("field 'name' must not be empty");

  if ("age" in body) {
    if (!Number.isInteger(body.age))
      throw new ValidationError("field 'age' must be an integer");

    if (body.age < 0)
      throw new ValidationError(
        "field 'age' must be a equal or greater than 0"
      );
  }
}

http
  .createServer(async (request, response) => {
    let body;

    try {
      for await (const data of request) {
        body = JSON.parse(data);
        validate(body);
      }

      response.writeHead(statusCodes.OK);
    } catch (error) {
      body = {};

      if (error instanceof ValidationError) {
        response.writeHead(statusCodes.UNPROCESSABLE_ENTITY);
        body.message = error.message;
      } else {
        response.writeHead(statusCodes.INTERNAL_SERVER_ERROR);
        body.message = "Internal Server Error";
      }
    } finally {
      response.write(JSON.stringify(body, null, 2));
      response.end();
    }
  })
  .listen(3000, () => console.log("Listening on port 3000"));
