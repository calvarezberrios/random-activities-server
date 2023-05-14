const express = require("express");
const Users = require("./users-model");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await Users.findAll();

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const user = await Users.findById(id);
    if (!user)
      res.status(404).json({ message: `User with id ${id} does not exist!` });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({
      message: `Error getting user ${req.params.id}: ${err.message}`,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, username, password } = req.body;

    if (!firstName || !lastName || !email || !username || !password) {
      res.status(422).json({
        message:
          "Missing all required fields: firstName, lastName, email, username, password.",
      });
    } else {
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
    }
  } catch (err) {
    res.status(500).json({
      message: `Error creating user: ${err.message}`,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { firstName, lastName, email, username, password, bookmarks } =
      req.body;

    if (!firstName || !lastName || !email || !username || !password) {
      res.status(422).json({
        message:
          "Missing all required fields: firstName, lastName, email, username, password.",
      });
    } else {
      const updatedUser = await Users.update(id, {
        firstName,
        lastName,
        email,
        username,
        password,
        bookmarks,
      });

      if (!updatedUser) {
        res.status(404).json({
          message: `No user with id ${id} was found!`,
        });
      } else {
        res.status(200).json({
          message: "Update Sucessful",
          data: updatedUser,
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      message: `Error updating user: ${err.message}`,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const deletedUser = await Users.delete(id);

    if (!deletedUser) {
      res.status(404).json({ message: `User with id ${id} not found!` });
    } else {
      res
        .status(200)
        .json({ message: "Deleted user successfully.", data: deletedUser });
    }
  } catch (err) {
    res.status(500).json({
      message: `Error deleting user: ${err.message}`,
    });
  }
});

module.exports = router;
