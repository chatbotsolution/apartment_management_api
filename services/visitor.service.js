const db = require("../config/db");

/* ======================= EXECUTE SP ======================= */
const execute = async (
    action,
    visitorId = null,
    hostFlatId = null,
    visitorName = null,
    visitorPhone = null,
    vehicleNumber = null,
    vehicleType = null,
    purpose = null,
    expectedCheckout = null,
    idProofTypeId = null,
    idProofNumber = null,
    approvedBy = null,
    entryStatusId = null,
    visitorTypeId = null,
    notes = null,
    createdBy = null,
    societyId = null
) => {

    const [rows] = await db.query(
        "CALL sp_visitor(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [
            action,
            visitorId,
            hostFlatId,
            visitorName,
            visitorPhone,
            vehicleNumber,
            vehicleType,
            purpose,
            expectedCheckout,
            idProofTypeId,
            idProofNumber,
            approvedBy,
            entryStatusId,
            visitorTypeId,
            notes,
            createdBy,
            societyId
        ]
    );

    return rows;
};

module.exports = {
    execute
};