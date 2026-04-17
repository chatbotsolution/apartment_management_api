const db = require("../config/db");

/* ======================= GET ALL ======================= */
const getAll = async () => {
    const [rows] = await db.query(
        "CALL sp_ManageComplaintMaster(?, NULL, NULL, NULL)",
        ["GETALL"]
    );
    return rows[0];
};

/* ======================= GET BY ID ======================= */
const getById = async (id) => {
    const [rows] = await db.query(
        "CALL sp_ManageComplaintMaster(?, ?, NULL, NULL)",
        ["GETBYID", id]
    );
    return rows[0];
};

/* ======================= CREATE ======================= */
const create = async (data) => {
    const { complaintType, userId } = data;
    const [rows] = await db.query(
        "CALL sp_ManageComplaintMaster(?, NULL, ?, ?)",
        [
            "INSERT",
            complaintType,
            userId
        ]
    );

    if (!rows || !rows[0] || !rows[0][0]) {
        return { message: "Insert failed or no response from DB" };
    }

    return rows[0][0];
};

/* ======================= UPDATE ======================= */
const update = async (data) => {
    const { id, complaintType, userId } = data;
    const [rows] = await db.query(
        "CALL sp_ManageComplaintMaster(?, ?, ?, ?)",
        [
            "UPDATE",
            id,
            complaintType,
            userId
        ]
    );

    if (rows && rows[0] && Array.isArray(rows[0]) && rows[0].length > 0) {
        return rows[0][0];
    }
    return rows[0] || { message: "Update successful" };
};

/* ======================= DELETE ======================= */
const remove = async (id, userId) => {
    const [rows] = await db.query(
        "CALL sp_ManageComplaintMaster(?, ?, NULL, ?)",
        ["DELETE", id, userId]
    );

    if (rows && rows[0] && Array.isArray(rows[0]) && rows[0].length > 0) {
        return rows[0][0];
    }
    return rows[0] || { message: "Delete successful" };
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: remove
};
