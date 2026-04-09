const db = require("../config/db");

/* ======================= GET ALL ======================= */
const getAll = async () => {
    const [rows] = await db.query(
        "CALL SP_UserRequestType(?, NULL, NULL, NULL, NULL)",
        ["GETALL"]
    );
    return rows[0];
};

/* ======================= GET BY ID ======================= */
const getById = async (id) => {
    const [rows] = await db.query(
        "CALL SP_UserRequestType(?, ?, NULL, NULL, NULL)",
        ["GETBYID", id]
    );
    return rows[0];
};

/* ======================= CREATE ======================= */
const create = async (data) => {
    console.log("UserRequestType Data = ", data);

    const { complaintType, createdBy } = data;

    const [rows] = await db.query(
        "CALL SP_UserRequestType(?, NULL, ?, ?, NULL)",
        [
            "INSERT",
            complaintType,
            createdBy
        ]
    );

    if (!rows || !rows[0] || !rows[0][0]) {
        return { message: "Insert failed or no response from DB" };
    }

    return rows[0][0];
};

/* ======================= UPDATE ======================= */
const update = async (data) => {
    const { id, complaintType, updatedBy } = data;

    const [rows] = await db.query(
        "CALL SP_UserRequestType(?, ?, ?, NULL, ?)",
        [
            "UPDATE",
            id,
            complaintType,
            updatedBy
        ]
    );

    return rows[0][0];
};

/* ======================= DELETE ======================= */
const remove = async (id) => {
    const [rows] = await db.query(
        "CALL SP_UserRequestType(?, ?, NULL, NULL, ?)",
        ["DELETE", id, 1] // updatedBy = 1 (or pass dynamically if needed)
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