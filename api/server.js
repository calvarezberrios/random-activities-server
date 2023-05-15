const express = require("express");
const morgan = require("morgan");
const usersRouter = require("./users/users-router");

const server = express();

server.use(express.json());
server.use(morgan("dev"));

server.use("/api/users", usersRouter);

server.get("/", (req, res) => {
  res.status(200).json({ message: "API status is Up!" });
});

module.exports = server;
