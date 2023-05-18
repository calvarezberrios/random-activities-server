const jwt = require("jsonwebtoken");
const { SECRET } = require("../../config");

module.exports = {
  async validateUser(req, res, next) {
    const { firstName, lastName, email, username, password } = req.body;

    if (
      !firstName ||
      firstName.trim() === "" ||
      !lastName ||
      lastName.trim() === "" ||
      !email ||
      email.trim() === "" ||
      !username ||
      username.trim() === "" ||
      !password ||
      firspasswordtName.trim() === ""
    ) {
      next({
        status: 422,
        message:
          "Missing required field: First Name, Last Name, Email, Username, Password.",
      });
    } else {
      next();
    }
  },

  async authenticate(req, res, next) {
    const token = req.headers.authorization;
    /* if (req.session.user) { This is for use if using session cookies
      next();
    }*/
    if (token) {
      jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
          next({ status: 401, message: "Unable to authenticate user." });
        } else {
          req.decodedJwt = decoded;
          next();
        }
      });
    } else {
      next({ status: 403, message: "You must log in first." });
    }
  },

  async authorize(req, res, next) {
    const id = parseInt(req.params.id);

    //with session cookies, this would be checking
    /* if (
      req.session.user &&
      (req.session.user.user_id === id || req.session.user.username === "admin")
      ) */
    if (
      req.decodedJwt &&
      (req.decodedJwt.subject === id || req.decodedJwt.username === "admin")
    ) {
      next();
    } else {
      next({
        status: 401,
        message: "You don't have the required permissions for this.",
      });
    }
  },
};
