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
    hasCharger = null,
    statusId = null,
    monthlyCharge = null,
    notes = null
) => {

    const [rows] = await db.query(
        "CALL sp_parking_slot(?,?,?,?,?,?,?,?,?,?,?)",
        [
            action,
            slotId,
            societyId,
            slotNumber,
            level,
            slotTypeId,
            isCovered,
            hasCharger,
            statusId,
            monthlyCharge,
            notes
        ]
    );

    return rows;
};

module.exports = {
    execute
};