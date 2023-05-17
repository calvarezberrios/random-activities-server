const express = require("express");
const morgan = require("morgan");
//const session = require("express-session"); For the session cookies
//const Store = require("connect-session-knex")(session); For the session cookies
const usersRouter = require("./users/users-router");
const bookmarksRouter = require("./bookmarks/bookmarks-router");
const authRouter = require("./auth/auth-router");
const { errorResponse } = require("./global-middleware");
const { authorize, authenticate } = require("./auth/auth-middleware");
const axios = require("axios");
//const { SECRET } = require("../config"); currently used for the session cookie creation in this file

const server = express();

server.use(express.json());
/* 
This is to create session cookies
server.use(
  session({
    name: "rasid",
    // eslint-disable-next-line no-undef
    secret: SECRET,
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
); */

server.use(morgan("dev"));

server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);
server.use("/api/bookmarks", authenticate, authorize, bookmarksRouter);

server.get("/", (req, res) => {
  res.status(200).json({ message: "API status is Up!" });
});

server.get("/random-activities", async (req, res, next) => {
  const activities = [];
  for (let i = 0; i < 9; i++) {
    await axios
      .get("https://www.boredapi.com/api/activity")
      .then((res) => {
        if (!res.data.error) {
          if (
            !activities.some(
              (activity) => activity.activity === res.data.activity
            )
          ) {
            activities.push(res.data);
          } else {
            i--;
          }
        } else {
          next({ message: res.data.error });
        }
      })
      .catch((error) =>
        next({
          message: "There was an error getting random activities",
          error: error.message,
        })
      );
  }

  res.status(200).json(activities);
});

server.use((req, res, next) => {
  next({
    status: 404,
    message: `${req.method} ${req.path} not found`,
  });
});

server.use(errorResponse);

module.exports = server;
