export const notFound = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || "Internal Server Error";
  let errors = [];

  if (err.name === "ValidationError") {
    statusCode = 400;
    errors = Object.values(err.errors).map((val) => val.message);
    message = "Validation Failed";
  } else if (err.name === "CastError") {
    statusCode = 404;
    message = "Resource not found";
  } else if (err.code === 11000) {
    statusCode = 400;
    message = "Duplicate field value entered";
    errors = Object.keys(err.keyPattern).map((key) => `${key} already exists`);
  }

  res.status(statusCode).json({
    success: false,
    message,
    errors,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};
