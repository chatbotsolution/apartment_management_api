const db = require("../config/db");

/* ======================= EXECUTE SP ======================= */
const execute = async (
    action,
    ownerFlatId = null,
    ownerId = null,
    flatId = null,
    ownershipTypeId = null,
    ownershipFrom = null,
    ownershipTo = null,
    isResiding = null
) => {

    const [rows] = await db.query(
        "CALL sp_owner_flat(?,?,?,?,?,?,?,?)",
        [
            action,
            ownerFlatId,
            ownerId,
            flatId,
            ownershipTypeId,
            ownershipFrom,
            ownershipTo,
            isResiding
        ]
    );

    // Return actual result set
    return rows[0];
};

module.exports = {
    execute
};