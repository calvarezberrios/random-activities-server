const db = require("../../data/db-config");

module.exports = {
  async findAll() {
    // SELECT * FROM users;
    const users = await db("users");
    return users;
  },

  async findById(id) {
    // SELECT * FROM users WHERE user_id = 1001;
    return await db("users").where("user_id", id).first();
  },

  async create(newData) {
    // INSERT INTO users
    //    (id, firstName, lastName, email, username, password, bookmarks)
    // VALUES
    //    ("1004", "Testa", "Tester", "testa@testmail.com", "test", "password")
    const [newUserId] = await db("users").insert(newData);
    const newUser = await this.findById(newUserId);

    return newUser;
  },

  async update(id, changes) {
    // UPDATE users SET firstName = "John", username = "jsmith" WHERE id = 1004
    const updatedUserId = await db("users")
      .update(changes)
      .where("user_id", id);
    const updatedUser = await this.findById(updatedUserId);

    return updatedUser;
  },

  async delete(id) {
    // DELETE FROM users WHERE id = 1001
    const deleted = await this.findById(id);
    await db("users").del().where("user_id", id);
    return deleted;
  },
};
