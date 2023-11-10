/**
 * Middleware function to handle errors and send error response to client
 * @param {Error} err - Error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const errorHandler = (err, req, res, next) => {
  // Log error stack (commented out for production)
  //console.log(err.stack.red);

  // Send error response to client
  res.status(500).json({
    success: false,
    error: err?.message,
  });
};

/**
 * Middleware function to handle 404 errors and pass to error handler middleware
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @throws {Error} - Throws error with message "Not Found - {originalUrl}" to be handled by error handler middleware
 */
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Export the errorHandler and notFound functions for use in other modules
module.exports = { errorHandler, notFound };
