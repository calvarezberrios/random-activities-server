module.exports = {
  async authenticate(req, res, next) {
    if (req.session.user) {
      next();
    } else {
      next({ status: 403, message: "You must log in first." });
    }
  },
};
