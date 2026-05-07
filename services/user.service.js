const db = require("../config/db");

/* ======================= EXECUTE SP ======================= */
const execute = async (
    action,
    userId = null,
    ownerId = null,
    tenantId = null,
    staffId = null,
    username = null,
    passwordHash = null,
    roleId = null,
    isActive = null
) => {

    const [rows] = await db.query(
        "CALL sp_user(?,?,?,?,?,?,?,?,?)",
        [
            action,
            userId,
            ownerId,
            tenantId,
            staffId,
            username,
            passwordHash,
            roleId,
            isActive
        ]
    );

    if (!rows || !rows[0]) {
        return [];
    }

    return rows[0];
};

module.exports = {
    execute
};