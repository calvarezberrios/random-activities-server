const db = require("../../data/db-config");
const Users = require("./users-model");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db.seed.run();
});

test("environment is testing", () => {
  expect(process.env.NODE_ENV).toBe("testing");
});

describe("findAll", () => {
  test("resolves all the users in the table", async () => {
    const result = await Users.findAll();

    expect(result).toHaveLength(5);
    expect(result[0]).toMatchObject({ username: "admin" });
    expect(result[1]).toMatchObject({ username: "calvarez" });
    expect(result[2]).toMatchObject({ username: "ttester" });
    expect(result[3]).toMatchObject({ username: "sjohnson" });
    expect(result[4]).toMatchObject({ username: "jsmith" });
  });
});

describe("findById", () => {
  test("resolves the user by the given id", async () => {
    let result = await Users.findById(1);
    expect(result).toMatchObject({ username: "admin" });
    result = await Users.findById(2);
    expect(result).toMatchObject({ username: "calvarez" });
    result = await Users.findById(3);
    expect(result).toMatchObject({ username: "ttester" });
  });
});

describe("findUserBookmarks", () => {
  test("resolves an object with a bookmarks array property", async () => {
    let result = await Users.findUserBookmarks(1);

    expect(result).toHaveProperty("bookmarks");
    expect(result.bookmarks).toMatchObject([]);
  });
});

describe("create", () => {
  const newUser = {
    firstName: "Testa",
    lastName: "Tester",
    email: "ttester1@testmail.com",
    username: "ttester1",
  };

  test("resolves the newly created user", async () => {
    const result = await Users.create({ ...newUser, password: "password" });

    expect(result).toMatchObject(newUser);
  });

  test("adds new user to the users table", async () => {
    await Users.create({ ...newUser, password: "password" });
    const records = await db("users");
    expect(records).toHaveLength(6);
  });
});
