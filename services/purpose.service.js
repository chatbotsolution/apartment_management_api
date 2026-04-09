const db = require("../config/db");

/**
 * Service to handle Purpose Master data operations using stored procedure.
 */
const getAll = async () => {
    const [rows] = await db.query(
        "CALL sp_PurposeMaster(?, NULL, NULL, NULL)",
        ["GET_ALL"]
    );
    return rows[0];
};

const getById = async (id) => {
    const [rows] = await db.query(
        "CALL sp_PurposeMaster(?, ?, NULL, NULL)",
        ["GET_BY_ID", id]
    );
    return rows[0][0];
};

const create = async (data) => {
    const { purpose, createdBy } = data;
    const [rows] = await db.query(
        "CALL sp_PurposeMaster(?, NULL, ?, ?)",
        ["INSERT", purpose, createdBy || 1]
    );
    return rows[0][0];
};

const update = async (data) => {
    const { id, purpose, updatedBy } = data;
    const [rows] = await db.query(
        "CALL sp_PurposeMaster(?, ?, ?, ?)",
        ["UPDATE", id, purpose, updatedBy || 1]
    );
    return rows[0][0];
};

const remove = async (id, userId) => {
    const [rows] = await db.query(
        "CALL sp_PurposeMaster(?, ?, NULL, ?)",
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
