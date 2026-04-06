const app = require("./app");
const db = require("./config/db");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {

    // ✅ DB connection check
    const connection = await db.getConnection();
    connection.release();

    console.log("✅ Database connected successfully.");

    app.listen(PORT, () => {
      console.log("========================================");
      console.log(`🚀 Server running in ${process.env.NODE_ENV || "development"} mode`);
      console.log(`🌐 URL: http://localhost:${PORT}`);
      console.log(`📄 Swagger Docs: http://localhost:${PORT}/api-docs`);
      console.log("========================================");
    });

  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
};

startServer();
