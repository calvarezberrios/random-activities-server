const express = require("express");
const Bookmarks = require("./bookmarks-model");
const { errorResponse } = require("../global-middleware");
const { checkKey } = require("./bookmarks-middleware");

const router = express.Router();

router.get("/", (req, res, next) => {
  Bookmarks.findAll()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch(next);
});

router.get("/:key", checkKey, (req, res, next) => {
  const { key } = req.params;

  Bookmarks.findByKey(key)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch(next);
});

router.get("/:key/users", checkKey, (req, res, next) => {
  const { key } = req.params;

  Bookmarks.findBookmarkUsers(key)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch(next);
});

router.delete("/:key", checkKey, (req, res, next) => {
  const { key } = req.params;

  Bookmarks.deleteBookmark(key)
    .then((result) => {
      res
        .status(200)
        .json({ message: `Bookmark key: ${key} deleted.`, bookmark: result });
    })
    .catch(next);
});

router.use(errorResponse);

module.exports = router;
