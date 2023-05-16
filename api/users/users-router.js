const express = require("express");
const Users = require("./users-model");
const Bookmarks = require("../bookmarks/bookmarks-model");
const {
  checkId,
  validateUser,
  validateBookmark,
} = require("./users-middleware");
const { errorResponse } = require("../global-middleware");
const { authenticate } = require("../auth/auth-middleware");

const router = express.Router();

router.get("/", (req, res, next) => {
  Users.findAll()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => next(err));
});

router.get("/:id", [authenticate, checkId], (req, res, next) => {
  const id = parseInt(req.params.id);
  Users.findById(id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch(next);
});

router.get("/:id/bookmarks", checkId, (req, res, next) => {
  const id = parseInt(req.params.id);

  Users.findUserBookmarks(id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch(next);
});

router.post("/:id/bookmark", [checkId, validateBookmark], (req, res, next) => {
  const id = parseInt(req.params.id);
  const { key, activity, type, participants, price, link, accessibility } =
    req.body;

  Bookmarks.saveBookmark(id, {
    key,
    activity,
    type,
    participants,
    price,
    link,
    accessibility,
  })
    .then((result) => {
      res.status(201).json({
        message: `Bookmarked activity: ${activity} successfully.`,
        bookmark: result,
      });
    })
    .catch(next);
});

router.put("/:id", [checkId, validateUser], (req, res, next) => {
  const id = parseInt(req.params.id);
  const { firstName, lastName, email, username, password } = req.body;

  Users.update(id, {
    firstName,
    lastName,
    email,
    username,
    password,
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
        .json({ message: "Deleted user successfully.", user: deletedUser });
    })
    .catch(next);
});

router.use(errorResponse);

module.exports = router;
