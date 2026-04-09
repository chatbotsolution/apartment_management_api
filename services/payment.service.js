const db = require("../config/db");

/**
 * Service to handle Transaction operations using stored procedure sp_Transactions.
 */
const getAll = async () => {
    const [rows] = await db.query(
        "CALL sp_Transactions(?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)",
        ["GET_ALL"]
    );
    return rows[0];
};

const getById = async (id) => {
    const [rows] = await db.query(
        "CALL sp_Transactions(?, ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL)",
        ["GET_BY_ID", id]
    );
    return rows[0][0];
};

const create = async (data) => {
    const { Flat_Id, Transaction_Type, Invoice_No, Debit, Credit, Payment_Mode, Remarks } = data;
    const [rows] = await db.query(
        "CALL sp_Transactions(?, NULL, ?, ?, ?, ?, ?, ?, ?)",
        [
            "INSERT",
            Flat_Id,
            Transaction_Type,
            Invoice_No,
            Debit || 0,
            Credit || 0,
            Payment_Mode,
            Remarks
        ]
    );
    
    return rows[0][0];
};

const update = async (data) => {
    const { Transaction_Id, Flat_Id, Transaction_Type, Invoice_No, Debit, Credit, Payment_Mode, Remarks } = data;
    const [rows] = await db.query(
        "CALL sp_Transactions(?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
            "UPDATE",
            Transaction_Id,
            Flat_Id,
            Transaction_Type,
            Invoice_No,
            Debit || 0,
            Credit || 0,
            Payment_Mode,
            Remarks
        ]
    );

    return rows[0][0];
};

const remove = async (id) => {
    const [rows] = await db.query(
        "CALL sp_Transactions(?, ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL)",
        ["DELETE", id]
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
