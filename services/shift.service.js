const db = require("../config/db");

/**
 * Service to handle Shift Master data operations using stored procedure.
 */
const getAll = async () => {
    const [rows] = await db.query(
        "CALL sp_ShiftMaster(?, NULL, NULL, NULL, NULL)",
        ["GET_ALL"]
    );
    return rows[0];
};

const getById = async (id) => {
    const [rows] = await db.query(
        "CALL sp_ShiftMaster(?, ?, NULL, NULL, NULL)",
        ["GET_BY_ID", id]
    );
    return rows[0][0];
};

const create = async (data) => {
    const { shiftName, shiftHours, userId } = data;
    const [rows] = await db.query(
        "CALL sp_ShiftMaster(?, NULL, ?, ?, ?)",
        ["INSERT", shiftName, shiftHours, userId || 1]
    );
    return rows[0][0];
};

const update = async (data) => {
    const { id, shiftName, shiftHours, userId } = data;
    const [rows] = await db.query(
        "CALL sp_ShiftMaster(?, ?, ?, ?, ?)",
        ["UPDATE", id, shiftName, shiftHours, userId || 1]
    );
    return rows[0][0];
};

const remove = async (id, userId) => {
    const [rows] = await db.query(
        "CALL sp_ShiftMaster(?, ?, NULL, NULL, ?)",
        ["DELETE", id, userId || 1]
    );
    return rows[0][0];
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: remove
};
