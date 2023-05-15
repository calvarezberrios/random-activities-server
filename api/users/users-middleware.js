const db = require("../../data/db-config");

module.exports = {
  checkId: async (req, res, next) => {
    const id = parseInt(req.params.id);

    const user = await db("users").where("user_id", id).first();
    req.user = user;

    if (!user) {
      next({ status: 404, message: `User Id: ${id} does not exist.` });
    } else {
      next();
    }
  },
  validateData: (req, res, next) => {
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
};
