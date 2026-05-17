const db = require("../config/db");

/* ======================= MAIN SP EXECUTION ======================= */
const execute = async (...params) => {
    try {
        // Exactly 6 question marks to match the 6 parameters built in the controller
        const query = `CALL sp_bhk_master(?, ?, ?, ?, ?, ?)`;
        
        // The params array is passed directly from the controller to the database
        const [rows] = await db.query(query, params);
        
        return rows;

    } catch (error) {
        console.error("Database Error in sp_bhk_master:", error);
        throw error;
    }
};

module.exports = { 
    execute 
};