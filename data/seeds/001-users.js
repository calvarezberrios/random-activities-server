/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("users").truncate();
  await knex("users").insert([
    {
      firstName: "admin",
      lastName: "account",
      email: "admin@randomactivities.com",
      username: "admin",
      password: "$2a$08$fWP7yDOPVwVx2a6WTrItV.RfuQaI9eGqPkwoTOGdUcsQVaEoaJ.R6",
    },
    {
      firstName: "Mannie",
      lastName: "Alvarez",
      email: "carlos.alvarezberrio@gmail.com",
      username: "calvarez",
      password: "$2a$08$KyZ2CSYCLmIZ5dQfhWioPeOmRIp8FI9jn8ydKAH9StIaoW42RWcYG",
    },
    {
      firstName: "Test",
      lastName: "Tester",
      email: "ttester@testmail.com",
      username: "ttester",
      password: "$2a$08$KyZ2CSYCLmIZ5dQfhWioPeOmRIp8FI9jn8ydKAH9StIaoW42RWcYG",
    },
    {
      firstName: "Sara",
      lastName: "Johnson",
      email: "sara_alvarez321@yahoo.com",
      username: "sjohnson",
      password: "$2a$08$KyZ2CSYCLmIZ5dQfhWioPeOmRIp8FI9jn8ydKAH9StIaoW42RWcYG",
    },
    {
      firstName: "John",
      lastName: "Smith",
      email: "jsmith@testmail.com",
      username: "jsmith",
      password: "$2a$08$KyZ2CSYCLmIZ5dQfhWioPeOmRIp8FI9jn8ydKAH9StIaoW42RWcYG",
    },
  ]);
};
