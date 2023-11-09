const { describe, it } = require("mocha");
const { createSandbox } = require("sinon");
const supertest = require("supertest");
const assert = require("assert");

const users = require("../data/users.json");

describe("[API] Test suite", () => {
  let app, responses;

  const token = "test";

  before((done) => {
    const api = require("./api");
    app = api.app;
    responses = api.responses;
    api.tokens.push({ user: token, token });
    app.once("listening", done);
  });

  after((done) => app.close(done));

  describe("[POST] /login", () => {
    it("[200] should successfully log in", async () => {
      const { text } = await supertest(app)
        .post("/login")
        .send(users[0])
        .expect(200);

      const body = JSON.parse(text);

      assert.strictEqual(typeof body.token, "string");
    });

    it("[200] should replace token", async () => {
      const { text } = await supertest(app)
        .post("/login")
        .send(users[0])
        .expect(200);

      const body = JSON.parse(text);

      assert.strictEqual(typeof body.token, "string");
    });

    it("[401] should not log in", async () => {
      const { text } = await supertest(app).post("/login").send({}).expect(401);
      assert.strictEqual(text, "Unauthorized");
    });
  });

  describe("[GET] /users", () => {
    it("[200] should successfully retrieve users", async () => {
      const { text } = await supertest(app)
        .get("/users")
        .set("Authorization", token)
        .expect(200);

      const body = JSON.parse(text);

      assert.deepStrictEqual(
        body,
        users.map((user) => ({ ...user, password: "**********" }))
      );
    });

    it("[401] should not allow to retrieve users", async () => {
      const { text } = await supertest(app).get("/users").expect(401);
      assert.strictEqual(text, "Unauthorized");
    });
  });

  describe("[GET] /some-invalid-path", () => {
    const sinon = createSandbox();

    after(() => sinon.restore());

    it("[404] should return not found", async () => {
      const { text } = await supertest(app)
        .get("/some-invalid-path")
        .expect(404);

      assert.strictEqual(text, "Not found");
    });

    it("[500] should return internal server error", async () => {
      sinon.stub(responses, "notFound").throws();
      sinon.stub(console, "error").callsFake(() => undefined);

      const { text } = await supertest(app)
        .get("/some-invalid-path")
        .expect(500);

      assert.strictEqual(text, "Internal server error");
    });
  });
});
