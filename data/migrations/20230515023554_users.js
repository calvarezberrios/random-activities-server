/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable("users", (table) => {
    table.increments("user_id");
    table.string("firstName", 100).notNullable();
    table.string("lastName", 100).notNullable();
    table.string("email", 100).notNullable().unique();
    table.string("username", 100).notNullable().unique();
    table.string("password").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("users");
};
