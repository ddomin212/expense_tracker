const errorHandler = (err, req, res, next) => {
  //console.log(err.stack.red);
  res.status(500).json({
    success: false,
    error: err?.message,
  });
};
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

module.exports = { errorHandler, notFound };
