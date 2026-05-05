const db = require("../config/db");

/* ======================= EXECUTE SP ======================= */
const execute = async (
    action,
    visitorId = null,
    slotId = null,
    vehicleNumber = null,
    vehicleType = null,
    statusId = null
) => {

    const [rows] = await db.query(
        "CALL sp_visitor_parking(?,?,?,?,?,?)",
        [
            action,
            visitorId,
            slotId,
            vehicleNumber,
            vehicleType,
            statusId
        ]
    );

    return rows;
};

module.exports = {
    execute
};