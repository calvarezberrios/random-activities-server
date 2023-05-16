// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/activities.db3",
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
  },

  production: {
    client: "sqlite3",
    connection: {
      filename: "./data/activities_prod.db3",
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations",
    },
  },
};
