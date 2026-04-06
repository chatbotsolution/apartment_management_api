const { validationResult } = require("express-validator");

/**
 * Global Validation Result Handler
 * Maps express-validator errors into a clean, readable format.
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Professional Touch: Map errors to a clean "field: message" format
    // This makes it much easier for the Frontend to display errors.
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.path]: err.msg }));

    return res.status(400).json({
      success: false,
      message: "Validation Error",
      errors: extractedErrors,
    });
  }

  next();
};

module.exports = validate;