const db = require("../config/db");

/* ======================= EXECUTE SP ======================= */
const execute = async (
    action,
    slotId = null,
    societyId = null,
    slotNumber = null,
    level = null,
    slotTypeId = null,
    isCovered = null,
    isOccupied = null,
    hasCharger = null,
    statusId = null,
    monthlyCharge = null,
    notes = null,
    orgId = null
) => {

    const [rows] = await db.query(
        "CALL sp_parking_slot(?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [
            action,
            slotId,
            societyId,
            slotNumber,
            level,
            slotTypeId,
            isCovered,
            isOccupied,
            hasCharger,
            statusId,
            monthlyCharge,
            notes,
            orgId
        ]
    );

    return rows;
};

module.exports = {
    execute
};