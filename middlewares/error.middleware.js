const errorHandler = (err, req, res, next) => {
    // 1. Log the error for the developer (Professional: use a logger like Winston here later)
    console.error(`[ERROR] ${req.method} ${req.url}:`, err.stack || err.message);

    // 2. Determine Status Code (Default to 500 if not set)
    const statusCode = err.statusCode || 500;

    // 3. Structured Response
    const errorResponse = {
        success: false,
        message: err.message || "Internal Server Error",
    };

    // 4. In Development mode, include the Stack Trace (Like ASP.NET Developer Page)
    if (process.env.NODE_ENV === 'development') {
        errorResponse.stack = err.stack;
        errorResponse.detail = err; 
    }

    // 5. Handle Specific common errors (Optional but professional)
    if (err.name === 'ValidationError') {
        return res.status(400).json({ ...errorResponse, message: "Validation Failed" });
    }

    res.status(statusCode).json(errorResponse);
};

module.exports = { errorHandler };