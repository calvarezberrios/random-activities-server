const db = require("../../data/db-config");

module.exports = {
  async findAll() {
    return await db("users").select(
      "user_id",
      "firstName",
      "lastName",
      "email",
      "username"
    );
  },

  async findBy(filter) {
    return await db("users").where(filter).first();
  },

  async findById(id) {
    return await db("users")
      .select("user_id", "firstName", "lastName", "email", "username")
      .where("user_id", id)
      .first();
  },

  async findUserBookmarks(id) {
    const results = await db("users as u")
      .leftJoin("user_bookmarks as ub", "u.user_id", "ub.user_id")
      .leftJoin("bookmarks as b", "ub.key", "b.key")
      .select(
        "u.user_id",
        "username",
        "b.key",
        "activity",
        "type",
        "participants",
        "price",
        "link",
        "accessibility"
      )
      .where("u.user_id", id);

    const users = results.reduce(
      (acc, user) => {
        if (user.activity) {
          acc.bookmarks.push({
            key: user.key,
            activity: user.activity,
            type: user.type,
            participants: user.participants,
            price: user.price,
            link: user.link,
            accessibility: user.accessibility,
          });
        }
        return acc;
      },
      {
        user_id: results[0].user_id,
        username: results[0].username,
        bookmarks: [],
      }
    );
    return users;
  },

  async create(newData) {
    // INSERT INTO users
    //    (firstName, lastName, email, username, password)
    // VALUES
    //    ("Testa", "Tester", "testa@testmail.com", "testa", "password")

    const [newUserId] = await db("users").insert(newData);
    const newUser = await this.findById(newUserId);

    return newUser;
  },

  async update(id, changes) {
    // UPDATE users SET firstName = "John", username = "jsmith" WHERE id = 4
    await db("users").update(changes).where("user_id", id);
    return await this.findById(id);
  },

  async delete(id) {
    // DELETE FROM users WHERE id = 1001
    const deleted = await this.findById(id);
    await db("users").delete().where("user_id", id);
    await db("user_bookmarks").delete().where("user_id", id);
    return deleted;
  },
};
