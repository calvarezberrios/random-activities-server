/* eslint-disable no-unused-vars */
module.exports = {
  errorResponse: (error, req, res, next) => {
    res.status(error.status || 500).json(error);
  },
};
