// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const common = {
  client: "sqlite3",
  useNullAsDefault: true,
  migrations: { directory: "./data/migrations" },
  seeds: { directory: "./data/seeds" },
};

module.exports = {
  development: {
    ...common,
    connection: {
      filename: "./data/activities.db3",
    },
  },
  testing: {
    ...common,
    connection: {
      filename: "./data/activities_test.db3",
    },
  },
  production: {
    ...common,
    connection: {
      filename: "./data/activities_prod.db3",
    },
  },
};
