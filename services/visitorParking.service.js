const db = require("../config/db");


/* ======================= EXECUTE SP ======================= */
const execute = async (
    action,
    visitorParkingId = null,
    visitorId = null,
    slotId = null,
    vehicleNumber = null,
    vehicleType = null,
    statusId = null
) => {

    const [rows] = await db.query(
        "CALL sp_visitor_parking(?,?,?,?,?,?,?)",
        [
            action,
            visitorParkingId,
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