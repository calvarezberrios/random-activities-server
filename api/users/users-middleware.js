const db = require("../../data/db-config");

module.exports = {
  checkId: async (req, res, next) => {
    const id = parseInt(req.params.id);

    const user = await db("users").where("user_id", id).first();

    if (!user) {
      next({ status: 404, message: `User Id: ${id} does not exist.` });
    } else {
      next();
    }
  },
  validateUser: (req, res, next) => {
    const { firstName, lastName, email, username, password } = req.body;

    if (!firstName || !lastName || !email || !username || !password) {
      next({
        status: 422,
        message:
          "Missing all required fields: firstName, lastName, email, username, password.",
      });
    } else {
      next();
    }
  },
  validateBookmark: (req, res, next) => {
    const { key, activity, type, participants } = req.body;

    if (!key || !activity || !type || !participants) {
      next({
        status: 422,
        message:
          "Bookmark missing one or more required fields: key, activity, type, and participants.",
      });
    } else {
      next();
    }
  },
};
