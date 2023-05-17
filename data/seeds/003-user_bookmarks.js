/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("user_bookmarks").truncate();
  await knex("user_bookmarks").insert([
    { user_id: 2, key: "5881647" },
    { user_id: 2, key: "8779876" },
    { user_id: 2, key: "9072906" },
    { user_id: 2, key: "8033599" },
    { user_id: 2, key: "2850593" },
    { user_id: 2, key: "6613428" },
    { user_id: 3, key: "8081693" },
    { user_id: 3, key: "4296813" },
    { user_id: 3, key: "1129748" },
    { user_id: 4, key: "1592381" },
    { user_id: 3, key: "5881647" },
  ]);
};
