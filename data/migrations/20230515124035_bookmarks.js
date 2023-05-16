/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema
    .createTable("bookmarks", (table) => {
      table.string("key").primary();
      table.string("activity").notNullable().unique();
      table.string("type").notNullable();
      table.integer("participants").notNullable();
      table.double("price").defaultTo(0);
      table.string("link").defaultTo("");
      table.float("accessibility").defaultTo(0);
    })
    .createTable("user_bookmarks", (table) => {
      table.increments("user_bookmarks_id");
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("user_id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table
        .string("key")
        .notNullable()
        .references("key")
        .inTable("bookmarks")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");

      table.unique(["user_id", "key"]);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema
    .dropTableIfExists("user_bookmarks")
    .dropTableIfExists("bookmarks");
};
