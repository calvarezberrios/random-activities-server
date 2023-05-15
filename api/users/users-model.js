// const { readFileSync, writeFile } = require("fs");
// const dataPath = "../../data/data.json";

// const data = JSON.parse(readFileSync(require.resolve(dataPath)));

// let users = data.users;

// let id = users[users.length - 1].user_id;

// function getId() {
//   return ++id;
// }

// function writeToFile(users) {
//   writeFile(
//     require.resolve(dataPath),
//     JSON.stringify({ ...data, users }, null, 2),
//     (err) => {
//       if (err) {
//         console.log("Failed to write to file");
//         return;
//       }
//       console.log("Updated file successfully");
//     }
//   );
// }
const db = require("../../data/db-config");

module.exports = {
  async findAll() {
    // SELECT * FROM users;
    // const users = await db.raw("SELECT * FROM users");
    const users = await db("users");
    return users;
  },

  async findById(id) {
    // SELECT * FROM users WHERE user_id = 1001;
    //return users.find((user) => user.user_id === id);
    return await db("users").where("user_id", id).first();
  },

  async create(newData) {
    // INSERT INTO users (id, firstName, lastName, email, username, password, bookmarks) VALUES ("1004", "Testa", "Tester", "testa@testmail.com", "test", "password")
    // const itExists = users.find(
    //   (user) =>
    //     user.username === newData.username || user.email === newUser.email
    // );

    // if (itExists) {
    //   return null;
    // }

    // const newUser = { user_id: getId(), ...newData, bookmarks: [] };
    // users.push(newUser);

    // writeToFile(users);
    const newUserId = await db("users").insert(newData).first();
    const newUser = await this.findById(newUserId);

    return newUser;
  },

  async update(id, changes) {
    // UPDATE users SET firstName = "John", username = "jsmith" WHERE id = 1004
    // const user = users.find((user) => user.user_id === id);
    // if (!user) return null;

    // const updatedUser = { user_id: id, ...changes };
    // users = users.map((user) => (user.user_id === id ? updatedUser : user));

    // writeToFile(users);
    const updatedUserId = await db("users")
      .update(changes)
      .where("user_id", id)
      .first();
    const updatedUser = await this.findById(updatedUserId);

    return updatedUser;
  },

  async delete(id) {
    // DELETE FROM users WHERE id = 1001
    // const user = users.find((user) => user.user_id === id);
    // if (!user) return null;

    // users = users.filter((u) => u.user_id !== id);

    // writeToFile(users);

    // return user;
    const deleted = await this.findById(id);
    await db("users").del().where("user_id", id);
    return deleted;
  },
};
