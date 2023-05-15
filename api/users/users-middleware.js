const Users = require("./users-model");

module.exports = {
  checkUserId: async (req, res, next) => {
    const id = parseInt(req.params.id);
    try {
      const user = await Users.findById(id);

      if (!user) {
        next({ status: 404, message: `User ${id} not found!` });
      } else {
        req.user = user;
        next();
      }
    } catch (err) {
      next(err);
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
