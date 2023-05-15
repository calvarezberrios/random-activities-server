const express = require("express");
const Users = require("./users-model");
const { checkId, validateData } = require("./users-middleware");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await Users.findAll();

    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", checkId, async (req, res) => {
  res.status(200).json(req.user);
});

router.post("/", validateData, async (req, res) => {
  try {
    const { firstName, lastName, email, username, password } = req.body;

    const newUser = await Users.create({
      firstName,
      lastName,
      email,
      username,
      password,
    });

    if (!newUser) {
      res.status(422).json({
        message: `User with username: ${username} or email: ${email} already exists!`,
      });
    } else {
      res
        .status(201)
        .json({ message: "Successfully Created User", data: newUser });
    }
  } catch (err) {
    next(err);
  }
});

router.put("/:id", [checkId, validateData], async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { firstName, lastName, email, username, password, bookmarks } =
      req.body;

    const updatedUser = await Users.update(id, {
      firstName,
      lastName,
      email,
      username,
      password,
      bookmarks,
    });

    res.status(200).json({
      message: "Update Sucessful",
      data: updatedUser,
    });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", checkId, async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const deletedUser = await Users.delete(id);

    res
      .status(200)
      .json({ message: "Deleted user successfully.", data: deletedUser });
  } catch (err) {
    next(err);
  }
});

router.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    message: error.message,
  });
});

module.exports = router;
