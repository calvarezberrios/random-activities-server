const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const Store = require("connect-session-knex")(session);
const usersRouter = require("./users/users-router");
const bookmarksRouter = require("./bookmarks/bookmarks-router");
const authRouter = require("./auth/auth-router");
const { errorResponse } = require("./global-middleware");

const server = express();

server.use(express.json());
server.use(
  session({
    name: "rasid",
    // eslint-disable-next-line no-undef
    secret: process.env.SECRET || "keep it secret",
    cookie: {
      maxAge: 1000 * 60 * 60,
      secure: false,
      httpOnly: false,
    },
    resave: false,
    saveUninitialized: false,
    store: new Store({
      knex: require("../data/db-config"),
      tablename: "sessions",
      sidfieldname: "rasid",
      createtable: true,
      clearInterval: 1000 * 60 * 60,
    }),
  })
);

server.use(morgan("dev"));

server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);
server.use("/api/bookmarks", bookmarksRouter);

server.get("/", (req, res) => {
  res.status(200).json({ message: "API status is Up!" });
});

server.use((req, res, next) => {
  next({
    status: 404,
    message: `${req.method} ${req.path} not found`,
  });
});

server.use(errorResponse);

module.exports = server;
