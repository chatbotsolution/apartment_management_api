const db = require("../config/db");

/**
 * Service to handle Maintenance Bills data operations using stored procedure.
 */
const getAll = async () => {
    const [rows] = await db.query(
        "CALL SP_Maintenance_Bills(?, NULL, NULL, NULL, NULL, NULL, NULL)",
        ["GET_ALL"]
    );
    return rows[0];
};

const getById = async (id) => {
    const [rows] = await db.query(
        "CALL SP_Maintenance_Bills(?, ?, NULL, NULL, NULL, NULL, NULL)",
        ["GET_BY_ID", id]
    );
    return rows[0][0]; // Should return the single object or undefined
};

const getByFlat = async (flatId) => {
    const [rows] = await db.query(
        "CALL SP_Maintenance_Bills(?, NULL, ?, NULL, NULL, NULL, NULL)",
        ["GET_BY_FLAT", flatId]
    );
    return rows[0];
};

const create = async (data) => {
    const { Flat_Id, Bill_Month, Amount, Due_Date, Status } = data;
    const [rows] = await db.query(
        "CALL SP_Maintenance_Bills(?, NULL, ?, ?, ?, ?, ?)",
        ["INSERT", Flat_Id, Bill_Month, Amount, Due_Date, Status]
    );
    
    if (!rows || !rows[0] || !rows[0][0]) {
        return { message: "Failed to generate bill" };
    }
    return rows[0][0];
};

const update = async (data) => {
    const { Bill_Id, Flat_Id, Bill_Month, Amount, Due_Date, Status } = data;
    const [rows] = await db.query(
        "CALL SP_Maintenance_Bills(?, ?, ?, ?, ?, ?, ?)",
        ["UPDATE", Bill_Id, Flat_Id, Bill_Month, Amount, Due_Date, Status]
    );

    return rows[0][0];
};

const updateStatus = async (billId, status) => {
    const [rows] = await db.query(
        "CALL SP_Maintenance_Bills(?, ?, NULL, NULL, NULL, NULL, ?)",
        ["UPDATE_STATUS", billId, status]
    );

    return rows[0][0];
};

const remove = async (id) => {
    const [rows] = await db.query(
        "CALL SP_Maintenance_Bills(?, ?, NULL, NULL, NULL, NULL, NULL)",
        ["DELETE", id]
    );

    return rows[0][0];
};

module.exports = {
    getAll,
    getById,
    getByFlat,
    create,
    update,
    updateStatus,
    delete: remove
};
