const db = require("../../data/db-config");

module.exports = {
  checkKey: async (req, res, next) => {
    const { key } = req.params;

    const bookmark = await db("bookmarks").where("key", key).first();

    if (!bookmark) {
      next({ status: 404, message: `Bookmark key: ${key} does not exist.` });
    } else {
      next();
    }
  },
};
