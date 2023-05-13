const { readFileSync, writeFile } = require("fs");
const dataPath = "../data/data.json";

const data = JSON.parse(readFileSync(require.resolve(dataPath)));
let users = data.users;

let id = users[users.length - 1].id;

function getId() {
  return ++id;
}

function writeToFile(users) {
  writeFile(
    require.resolve(dataPath),
    JSON.stringify({ ...data, users }, null, 2),
    (err) => {
      if (err) {
        console.log("Failed to write to file");
        return;
      }
      console.log("Updated file successfully");
    }
  );
}

module.exports = {
  async findAll() {
    // SELECT * FROM users;
    return users;
  },

  async findById(id) {
    // SELECT * FROM users WHERE id = 1001;
    return users.find((user) => user.id === id);
  },

  async create(newData) {
    // INSERT INTO users (id, firstName, lastName, email, username, password, bookmarks) VALUES ("1004", "Testa", "Tester", "testa@testmail.com", "test", "password")
    const itExists = users.find(
      (user) =>
        user.username === newData.username || user.email === newData.email
    );

    if (itExists) {
      return null;
    }

    const newUser = { id: getId(), ...newData, bookmarks: [] };
    users.push(newUser);

    writeToFile(users);

    return newUser;
  },

  async update(id, changes) {
    // UPDATE users SET firstName = "John", username = "jsmith" WHERE id = 1004
    const user = users.find((user) => user.id === id);
    if (!user) return null;

    const updatedUser = { id, ...changes };
    users = users.map((user) => (user.id === id ? updatedUser : user));

    writeToFile(users);

    return updatedUser;
  },

  async delete(id) {
    // DELETE FROM users WHERE id = 1001
    const user = users.find((user) => user.id === id);
    if (!user) return null;

    users = users.filter((u) => u.id !== id);

    writeToFile(users);

    return user;
  },
};
