/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("users").truncate();
  await knex("users").insert([
    {
      firstName: "Mannie",
      lastName: "Alvarez",
      email: "carlos.alvarezberrio@gmail.com",
      username: "calvarez",
      password: "password",
    },
    {
      firstName: "Test",
      lastName: "Tester",
      email: "tester@testmail.com",
      username: "ttester",
      password: "password",
    },
    {
      firstName: "Sara",
      lastName: "Johnson",
      email: "sara_alvarez321@yahoo.com",
      username: "sjohnson",
      password: "password",
    },
    {
      firstName: "John",
      lastName: "Smith",
      email: "jsmith@testmail.com",
      username: "jsmith",
      password: "password",
    },
  ]);
};
