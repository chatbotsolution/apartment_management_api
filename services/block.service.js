const db = require("../config/db");

/* ======================= MAIN SP EXECUTION ======================= */
const execute = async (...params) => {
    try {
        // Exactly 11 question marks to match the 11 parameters in sp_block
        const query = `
            CALL sp_block(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        // The params array is passed directly from the controller
        const [rows] = await db.query(query, params);

        return rows;

    } catch (error) {
        console.error("Database Error in sp_block:", error);
        throw error;
    }
};

module.exports = { 
    execute 
};