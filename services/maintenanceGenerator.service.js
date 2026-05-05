const db = require("../config/db");

/* ======================= GENERATE MONTHLY ======================= */
const generate = async (month, dueDate, createdBy) => {

    const [rows] = await db.query(
        "CALL sp_generate_maintenance(?,?,?)",
        [month, dueDate, createdBy]
    );

    return rows;
};

module.exports = {
    generate
};