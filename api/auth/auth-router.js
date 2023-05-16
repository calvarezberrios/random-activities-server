const express = require("express");
const { errorResponse } = require("../global-middleware");
const bcrypt = require("bcryptjs");
const { validateUser } = require("../users/users-middleware");
const Users = require("../users/users-model");

const router = express.Router();

router.post("/register", validateUser, async (req, res, next) => {
  const { firstName, lastName, email, username, password } = req.body;
  const hash = bcrypt.hashSync(password, 8);
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
        res
          .status(201)
          .json({ message: "Successfully Created User", user: createdUser });
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
    req.session.user = user;
    res.status(200).json({ message: `Welcome back, ${user.firstName}` });
  }
});

router.get("/logout", async (req, res, next) => {
  if (req.session.user) {
    const { username } = req.session.user;
    req.session.destroy((err) => {
      if (err) {
        res
          .status(403)
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
    next({ status: 403, message: "No account logged in." });
  }
});

router.use(errorResponse);

module.exports = router;
