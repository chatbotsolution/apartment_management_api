const db = require("../config/db");


/* ======================= EXECUTE SP ======================= */
const execute = async (
    action,
    allotmentId = null,
    slotId = null,
    flatId = null,
    ownerId = null,
    tenantId = null,
    vehicleNumber = null,
    vehicleType = null,
    vehicleModel = null,
    vehicleColor = null,
    allotmentDate = null,
    validUntil = null,
    monthlyCharge = null,
    notes = null,
    isActive = null
) => {

    const [rows] = await db.query(
        "CALL sp_parking_allotment(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [
            action,
            allotmentId,
            slotId,
            flatId,
            ownerId,
            tenantId,
            vehicleNumber,
            vehicleType,
            vehicleModel,
            vehicleColor,
            allotmentDate,
            validUntil,
            monthlyCharge,
            notes,
            isActive
        ]
    );

    return rows;
};

module.exports = {
    execute
};