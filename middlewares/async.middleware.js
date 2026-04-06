/**
 * Async Handler Wrapper
 * Eliminates the need for try-catch blocks in controllers.
 * Errors are automatically passed to the next() middleware (the Global Error Handler).
 */
const asyncHandler = (fn) => {
    return (req, res, next) => {
        // Ensure the return is a Promise and catch any rejections
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

module.exports = asyncHandler;