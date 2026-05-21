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
    isActive = null,
    orgId = null
) => {

    const [rows] = await db.query(
        "CALL sp_user(?,?,?,?,?,?,?,?,?,?)",
        [
            action,
            userId,
            ownerId,
            tenantId,
            staffId,
            username,
            passwordHash,
            roleId,
            isActive,
            orgId
        ]
    );

    if (!rows || !rows[0]) {
        return [];
    }

    return rows[0];
};

/* ======================= FORGOT PASSWORD ======================= */
const forgotPassword = async (username) => {
    const result = await execute(
        "FORGOT_PASSWORD",
        null,
        null,
        null,
        null,
        username
    );

    return result;
};

/* ======================= RESET PASSWORD ======================= */
const resetPassword = async (userId, passwordHash) => {
    const result = await execute(
        "RESET_PASSWORD",
        userId,
        null,
        null,
        null,
        null,
        passwordHash
    );

    return result;
};

module.exports = {
    execute,
    forgotPassword,
    resetPassword
};