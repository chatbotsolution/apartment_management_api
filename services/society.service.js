const db = require("../config/db");

/* ======================= EXECUTE SP ======================= */
const execute = async (
    action,
    societyId = null,
    name = null,
    address = null,
    city = null,
    state = null,
    pincode = null,
    registrationNo = null,
    establishedDate = null,
    contactEmail = null,
    contactPhone = null,
    totalBlocks = null,
    totalUnits = null,
    website = null
) => {

    const [rows] = await db.query(
        "CALL sp_society(?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [
            action,
            societyId,
            name,
            address,
            city,
            state,
            pincode,
            registrationNo,
            establishedDate,
            contactEmail,
            contactPhone,
            totalBlocks,
            totalUnits,
            website
        ]
    );

    return rows;
};

module.exports = {
    execute
};