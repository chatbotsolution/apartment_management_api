const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "123",
    database: process.env.DB_NAME || "apartment_management",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test connection
(async () => {
    try {
        const connection = await pool.getConnection();
        console.log("✅ MySQL Connected...");
        connection.release();
    } catch (err) {
        console.error("❌ DB Connection Failed:", err.message);
    }
})();

module.exports = pool;
