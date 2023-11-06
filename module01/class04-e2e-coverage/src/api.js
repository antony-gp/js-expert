const http = require("http");
const crypto = require("crypto");

const users = require("../data/users.json");

const responses = {
  success(response, data) {
    response.writeHead(200);
    response.end(JSON.stringify(data, null, 2));
  },
  unauthorized(response) {
    response.writeHead(401);
    response.end("Unauthorized");
  },
  notFound(response) {
    response.writeHead(404);
    response.end("Not found");
  },
  internalServerError(response) {
    response.writeHead(500);
    response.end("Internal server error");
  },
};

const tokens = [];

const routes = [
  {
    // curl -H "Authorization: {token}" localhost:3000/users
    method: "GET",
    path: "/users",
    handler: async (request, response) => {
      if (!tokens.find(({ token }) => token === request.headers.authorization))
        return responses.unauthorized(response);

      responses.success(
        response,
        users.map((user) => ({ ...user, password: "**********" }))
      );
    },
  },
  {
    // curl -X POST -d '{"username":"{username}","password":"{password}"}' localhost:3000/login
    method: "POST",
    path: "/login",
    handler: async (request, response) => {
      const data = await new Promise((resolve) => {
        const buffer = [];

        request
          .on("data", (chunk) => buffer.push(chunk))
          .on("end", () => resolve(buffer.toString()));
      });

      const user = data && JSON.parse(data);

      if (
        !users.find(({ username, password }) => {
          return user?.username === username && user?.password === password;
        })
      )
        return responses.unauthorized(response);

      const token = Buffer.from(crypto.randomUUID()).toString("base64");

      const index = tokens.findIndex((token) => token.user === user.username);

      index === -1
        ? tokens.push({ user: user.username, token })
        : (tokens[index].token = token);

      responses.success(response, { token });
    },
  },
];

http
  .createServer(async (request, response) => {
    try {
      const { url, method } = request;

      routes
        .find((route) => route.method === method && route.path === url)
        ?.handler(request, response) ?? responses.notFound(response);
    } catch (error) {
      console.error(error);
      responses.internalServerError(response);
    }
  })
  .listen(3000, () => {
    console.log("Listening on 3000");
  });
