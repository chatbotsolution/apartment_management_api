const db = require("../config/db");


/* ======================= GET ALL ======================= */
const getAll = async () => {
    const [rows] = await db.query(
        "CALL SP_StaffType(NULL, NULL, NULL, NULL, NULL, NULL, NULL, ?)",
        ["GET"]
    );
    return rows[0];
};


/* ======================= GET BY ID ======================= */
const getById = async (id) => {
    const [rows] = await db.query(
        "CALL SP_StaffType(?, NULL, NULL, NULL, NULL, NULL, NULL, ?)",
        [id, "GET"]
    );
    return rows[0];
};


/* ======================= CREATE ======================= */
const create = async (data) => {
    const { StaffType, CreatedBy } = data;

    const [rows] = await db.query(
        "CALL SP_StaffType(NULL, ?, NULL, ?, NOW(), NULL, NULL, ?)",
        [
            StaffType,
            CreatedBy,
            "INSERT"
        ]
    );

    if (!rows || !rows[0] || !rows[0][0]) {
        return { StaffTypeId: 0, Message: "Insert failed" };
    }

    return rows[0][0];
};


/* ======================= UPDATE ======================= */
const update = async (data) => {
    const { StaffTypeId, StaffType, UpdatedBy } = data;

    const [rows] = await db.query(
        "CALL SP_StaffType(?, ?, NULL, NULL, NULL, ?, NOW(), ?)",
        [
            StaffTypeId,
            StaffType,
            UpdatedBy,
            "UPDATE"
        ]
    );

    return rows[0][0];
};


/* ======================= STATUS CHANGE ======================= */
const changeStatus = async (data) => {
    const { StaffTypeId, IsActive, UpdatedBy } = data;

    const [rows] = await db.query(
        "CALL SP_StaffType(?, NULL, ?, NULL, NULL, ?, NULL, ?)",
        [
            StaffTypeId,   // 1st
            IsActive,      // 3rd
            UpdatedBy,     // 6th
            "STATUS_CHNG"  // 8th
        ]
    );

    if (!rows || !rows[0] || !rows[0][0]) {
        return { Message: "Status change failed" };
    }

    return rows[0][0];
};


module.exports = {
    getAll,
    getById,
    create,
    update,
    changeStatus
};