const db = require("../config/db");

/* ======================= EXECUTE SP ======================= */
const execute = async (
    action,
    vehicleId = null,
    flatId = null,
    ownerId = null,
    tenantId = null,
    vehicleNumber = null,
    vehicleTypeId = null,
    vehicleModel = null,
    vehicleBrand = null,
    vehicleColor = null,
    yearOfPurchase = null,
    insuranceExpiry = null,
    rcUrl = null,
    isActive = null,
    societyId = null
) => {

    const [rows] = await db.query(
        "CALL sp_vehicle(?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [
            action,
            vehicleId,
            flatId,
            ownerId,
            tenantId,
            vehicleNumber,
            vehicleTypeId,
            vehicleModel,
            vehicleBrand,
            vehicleColor,
            yearOfPurchase,
            insuranceExpiry,
            rcUrl,
            isActive,
            societyId
        ]
    );

    return rows;
};

module.exports = {
    execute
};