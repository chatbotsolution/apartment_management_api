const db = require("../config/db");

/**
 * Service to handle Payment operations using stored procedure SP_Payments.
 */
const getAll = async () => {
    const [rows] = await db.query(
        "CALL SP_Payments(?, NULL, NULL, NULL, NULL, NULL, NULL)",
        ["GET_ALL"]
    );
    return rows[0];
};

const getById = async (id) => {
    const [rows] = await db.query(
        "CALL SP_Payments(?, ?, NULL, NULL, NULL, NULL, NULL)",
        ["GET_BY_ID", id]
    );
    return rows[0][0];
};

const getByBillId = async (billId) => {
    const [rows] = await db.query(
        "CALL SP_Payments(?, NULL, ?, NULL, NULL, NULL, NULL)",
        ["GET_BY_BILL", billId]
    );
    return rows[0];
};

const create = async (data) => {
    const { Bill_Id, Paid_Amount, Payment_Date, Payment_Mode, Transaction_Id } = data;
    const [rows] = await db.query(
        "CALL SP_Payments(?, NULL, ?, ?, ?, ?, ?)",
        ["INSERT", Bill_Id, Paid_Amount, Payment_Date, Payment_Mode, Transaction_Id]
    );
    
    if (!rows || !rows[0] || !rows[0][0]) {
        return { message: "Failed to record payment" };
    }
    return rows[0][0];
};

const update = async (data) => {
    const { Payment_Id, Bill_Id, Paid_Amount, Payment_Date, Payment_Mode, Transaction_Id } = data;
    const [rows] = await db.query(
        "CALL SP_Payments(?, ?, ?, ?, ?, ?, ?)",
        ["UPDATE", Payment_Id, Bill_Id, Paid_Amount, Payment_Date, Payment_Mode, Transaction_Id]
    );

    return rows[0][0];
};

const remove = async (id) => {
    const [rows] = await db.query(
        "CALL SP_Payments(?, ?, NULL, NULL, NULL, NULL, NULL)",
        ["DELETE", id]
    );

    return rows[0][0];
};

module.exports = {
    getAll,
    getById,
    getByBillId,
    create,
    update,
    delete: remove
};
