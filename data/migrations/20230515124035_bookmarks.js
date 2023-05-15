/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable("bookmarks", (table) => {
    table.string("key").primary();
    table.string("activity").notNullable().unique();
    table.string("type").notNullable();
    table.integer("participants").notNullable();
    table.double("price").defaultTo(0);
    table.string("link");
    table.float("accessibility").defaultTo(0);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("bookmarks");
};
