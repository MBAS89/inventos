const ErrorResponse = require("../utils/errorResponse");


//my error handler middleware
const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  //you can enter special code here for a specific status code and the message to disply 
  if (err.code === 11000) {
    const message = `Duplicate Field value entered`;
    error = new ErrorResponse(message, 400);
  }

  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  //this is how the error will be showning to the user
  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};

module.exports = errorHandler;