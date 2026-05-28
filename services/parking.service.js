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
    isActive = null,
    societyId = null,
    orgId = null
) => {

    const [rows] = await db.query(
        "CALL sp_parking_allotment(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
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
            isActive,
            societyId,
            orgId
        ]
    );

    return rows;
};

module.exports = {
    execute
};