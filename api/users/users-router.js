const express = require("express");
const Users = require("./users-model");
const Bookmarks = require("../bookmarks/bookmarks-model");
const {
  checkId,
  validateUser,
  validateBookmark,
} = require("./users-middleware");
const { errorResponse } = require("../global-middleware");
const { authenticate, authorize } = require("../auth/auth-middleware");
const { checkKey } = require("../bookmarks/bookmarks-middleware");

const router = express.Router();

router.get("/", authenticate, authorize, (req, res, next) => {
  Users.findAll()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => next(err));
});

router.get("/:id", authenticate, checkId, authorize, (req, res, next) => {
  const id = parseInt(req.params.id);
  Users.findById(id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch(next);
});

router.get(
  "/:id/bookmarks",
  authenticate,
  checkId,
  authorize,
  (req, res, next) => {
    const id = parseInt(req.params.id);

    Users.findUserBookmarks(id)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch(next);
  }
);

router.post(
  "/:id/bookmark",
  authenticate,
  checkId,
  authorize,
  validateBookmark,
  (req, res, next) => {
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
      .catch((err) =>
        next({
          message: `'${activity}' - already bookmarked to account: ${req.session.user.username}`,
          error: err.message,
        })
      );
  }
);

router.put(
  "/:id",
  authenticate,
  checkId,
  authorize,
  validateUser,
  (req, res, next) => {
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
      .catch((err) =>
        next({
          message: "Username and/or Email already in use.",
          error: err.message,
        })
      );
  }
);

router.delete(
  "/:id/bookmark/:key",
  authenticate,
  authorize,
  checkId,
  checkKey,
  (req, res, next) => {
    const id = parseInt(req.params.id);
    const { key } = req.params;

    Bookmarks.removeUserBookmark({ id, key })
      .then((removed) => {
        if (removed === 0)
          throw new Error(`User ${id} does not have bookmark key ${key}`);
        res.status(200).json({
          message: `Successfully removed bookmark ${key} from user ${id}`,
          removed,
        });
      })
      .catch((error) =>
        next({ message: "Error removing bookmark", error: error.message })
      );
  }
);

router.delete(
  "/:id",
  authenticate,
  checkId,
  authorize,
  async (req, res, next) => {
    const id = parseInt(req.params.id);

    Users.delete(id)
      .then((deletedUser) => {
        /* This is for use with session cookies 
          res.set(
          "Set-Cookie",
          "rasid=; SameSite=Strict; Path=/; Expires=Thu, 01 Jan 1970 00:00:00"
        ); */
        res
          .status(200)
          .json({ message: "Deleted user successfully.", user: deletedUser });
      })
      .catch(next);
  }
);

router.use(errorResponse);

module.exports = router;
