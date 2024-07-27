import { ApiError } from '../utils/apiError.js';

const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "Internal server error";
  err.statusCode = err.statusCode || 500;

  if (err.name === "CastError") {
    const message = `Resource not found. Invalid ${err.path}`;
    err = new ApiError(400, message);
  }
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ApiError(400, message);
  }
  if (err.name === "JsonWebTokenError") {
    const message = `JWT is invalid, try again`;
    err = new ApiError(400, message);
  }
  if (err.name === "TokenExpiredError") {
    const message = `JWT is expired, try again`;
    err = new ApiError(400, message);
  }

  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
    errors: err.errors || [],
  });
};

export { errorMiddleware };
