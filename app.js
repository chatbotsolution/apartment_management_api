require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const swaggerUi = require("swagger-ui-express");

const routes = require("./routes");
const swaggerSpec = require("./config/swagger");
const { errorHandler } = require("./middlewares/error.middleware");

const app = express();

/* -------------------- APP SETTINGS -------------------- */
app.set("trust proxy", 1);

/* -------------------- MIDDLEWARE -------------------- */
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

/* -------------------- STATIC FILES -------------------- */
app.use("/uploads", express.static(path.join(process.cwd(), "public/uploads")));

/* -------------------- SWAGGER -------------------- */
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/* -------------------- ROUTES -------------------- */
app.use("/api", routes);

/* -------------------- ROOT CHECK -------------------- */
app.get("/", (req, res) => {
  res.json({
    status: true,
    message: "API is running successfully 🚀",
  });
});

/* -------------------- 404 HANDLER -------------------- */
app.use((req, res) => {
  res.status(404).json({
    status: false,
    message: `Resource not found: ${req.method} ${req.originalUrl}`,
  });
});

/* -------------------- GLOBAL ERROR HANDLER -------------------- */
app.use(errorHandler);

module.exports = app;
