/* eslint-disable no-undef */
module.exports = {
  BCRYPT_ROUNDS: process.env.BCRYPT_ROUNDS || 8,
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 5001,
  SECRET: process.env.SECRET || "This is a secret!",
};
