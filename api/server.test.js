const db = require("../data/db-config");
const request = require("supertest");
const server = require("./server");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db.seed.run();
});

describe("[GET] /api/users", () => {
  test("it responds with 200 OK", async () => {
    const { body } = await request(server).post("/api/auth/login").send({
      username: "admin",
      password: "C@33ag3321!!",
    });
    const res = await request(server)
      .get("/api/users")
      .set("Authorization", body.token);

    expect(res.status).toBe(200);
  });
});

describe("[GET] /random-activities", () => {
  test("resolves an array of 9 random activities", async () => {
    const res = await request(server).get("/random-activities");
    expect(res.body).toHaveLength(9);
  });
});
