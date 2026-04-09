const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Apartment Management API",
      version: "1.0.0",
      description: "API documentation for Apartment Management System",
    },

    servers: [
      {
        url: "http://localhost:5000/api", // match your app.js
        description: "Local server",
      },
    ],

    components: {
      schemas: {
        // 🔹 Common Response Format (Recommended)
        ApiResponse: {
          type: "object",
          properties: {
            status: {
              type: "boolean",
              example: true,
            },
            message: {
              type: "string",
              example: "Success",
            },
            data: {
              type: "object",
              example: {},
            },
          },
        },
      },
    },
  },

  // 🔍 Scan all files for Swagger comments
  apis: [
    "./routes/*.js",         // All route files
    "./controllers/*.js",    // Controllers (optional)
    "./models/*.js"          // DTOs (optional)
  ],
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;
