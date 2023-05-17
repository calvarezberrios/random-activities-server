const express = require("express");
const { errorResponse } = require("../global-middleware");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validateUser } = require("../users/users-middleware");
const Users = require("../users/users-model");
const router = express.Router();

const { BCRYPT_ROUNDS, SECRET } = require("../../config");

router.post("/register", validateUser, async (req, res, next) => {
  const { firstName, lastName, email, username, password } = req.body;
  const hash = bcrypt.hashSync(password, BCRYPT_ROUNDS);
  const newUser = { firstName, lastName, email, username, password: hash };

  const itExists = await Users.findAll()
    .then((result) =>
      result.find(
        (user) =>
          user.username === newUser.username || user.email === newUser.email
      )
    )
    .catch(next);

  if (itExists) {
    next({ status: 422, message: "Username and/or email already exists." });
  } else {
    Users.create(newUser)
      .then((createdUser) => {
        const token = buildToken(createdUser);
        res
          .status(201)
          .json({
            message: "Successfully Created User",
            user: createdUser,
            token,
          });
      })
      .catch(next);
  }
});

router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  const user = await Users.findBy({ username });

  if (!user || !bcrypt.compareSync(password, user.password)) {
    next({ status: 401, message: `Username and/or Password incorrect.` });
  } else {
    const token = buildToken(user);
    // req.session.user = user; For using Session Cookies
    res.status(200).json({ message: `Welcome back, ${user.firstName}`, token });
  }
});

// This is just here for training purposes using session cookies.
/* router.get("/logout", async (req, res, next) => {
  if (req.session.user) {
    const { username } = req.session.user;
    req.session.destroy((err) => {
      if (err) {
        res
          .status(400)
          .json({ message: `There was an error login out user: ${username}` });
      } else {
        res.set(
          "Set-Cookie",
          "rasid=; SameSite=Strict; Path=/; Expires=Thu, 01 Jan 1970 00:00:00"
        );
        res
          .status(200)
          .json({ message: `${username} successfully logged out.` });
      }
    });
  } else {
    next({ status: 404, message: "No account logged in." });
  }
}); */

router.use(errorResponse);

function buildToken(user) {
  const payload = {
    subject: user.user_id,
    username: user.username,
  };
  const options = {
    expiresIn: "1d",
  };
  return jwt.sign(payload, SECRET, options);
}

module.exports = router;
