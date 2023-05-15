const express = require("express");
const Users = require("./users-model");
const { checkId, validateData } = require("./users-middleware");

const router = express.Router();

router.get("/", (req, res, next) => {
  Users.findAll()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => next(err));
});

router.get("/:id", checkId, (req, res) => {
  res.status(200).json(req.user);
});

router.post("/", validateData, (req, res, next) => {
  const { firstName, lastName, email, username, password } = req.body;

  Users.create({
    firstName,
    lastName,
    email,
    username,
    password,
  })
    .then((newUser) => {
      res
        .status(201)
        .json({ message: "Successfully Created User", user: newUser });
    })
    .catch(next);
});

router.put("/:id", [checkId, validateData], (req, res, next) => {
  const id = parseInt(req.params.id);
  const { firstName, lastName, email, username, password, bookmarks } =
    req.body;

  Users.update(id, {
    firstName,
    lastName,
    email,
    username,
    password,
    bookmarks,
  })
    .then((updatedUser) => {
      res.status(200).json({
        message: "Update Sucessful",
        user: updatedUser,
      });
    })
    .catch(next);
});

router.delete("/:id", checkId, async (req, res, next) => {
  const id = parseInt(req.params.id);

  Users.delete(id)
    .then((deletedUser) => {
      res
        .status(200)
        .json({ message: "Deleted user successfully.", data: deletedUser });
    })
    .catch(next);
});

// eslint-disable-next-line no-unused-vars
router.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    message: error.message,
  });
});

module.exports = router;
