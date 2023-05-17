const db = require("../../data/db-config");

module.exports = {
  async findAll() {
    return await db("bookmarks");
  },
  async findByKey(key) {
    return await db("bookmarks").where("key", key).first();
  },
  async saveBookmark(user_id, activity) {
    const itExists = await this.findByKey(activity.key);

    if (!itExists) {
      await db("bookmarks").insert(activity);
    }
    await db("user_bookmarks").insert({ user_id, key: activity.key });
    const bookmark = await this.findByKey(activity.key);
    return bookmark;
  },
  async findBookmarkUsers(key) {
    const rows = await db("bookmarks as b")
      .leftJoin("user_bookmarks as ub", "b.key", "ub.key")
      .leftJoin("users as u", "u.user_id", "ub.user_id")
      .select(
        "b.key",
        "activity",
        "u.user_id",
        "firstName",
        "lastName",
        "email",
        "username"
      )
      .where("b.key", key);

    const users = rows.reduce(
      (acc, row) => {
        if (row.user_id) {
          acc.users.push({
            user_id: row.user_id,
            firstName: row.firstName,
            lastName: row.lastName,
            email: row.email,
            username: row.username,
          });
        }
        return acc;
      },
      { key: rows[0].key, activity: rows[0].activity, users: [] }
    );
    return users;
  },
  async removeUserBookmark({ id, key }) {
    return await db("user_bookmarks").delete().where({ key: key, user_id: id });
  },
  async deleteBookmark(key) {
    const bookmark = this.findByKey(key);
    await db("bookmarks").delete().where("key", key);
    await db("user_bookmarks").delete().where("key", key);
    return bookmark;
  },
};
