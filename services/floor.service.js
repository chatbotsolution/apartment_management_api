const db = require("../config/db");

/* ======================= GET ALL ======================= */
const getAll = async (societyId) => {
    const [rows] = await db.query(
        "CALL sp_floor('GET_ALL', NULL, NULL, NULL, NULL, NULL, ?)",
        [societyId]
    );
    return rows[0];
};


/* ======================= GET BY ID ======================= */
const getById = async (id) => {
    const [rows] = await db.query(
        "CALL sp_floor('GET_BY_ID', ?, NULL, NULL, NULL, NULL, NULL)",
        [id]
    );
    return rows[0];
};


/* ======================= CREATE ======================= */
const create = async (data) => {
    const {
        Block_Id,
        Floor_Number,
        Floor_Label,
        Total_Flats
    } = data;

    const [rows] = await db.query(
        "CALL sp_floor('INSERT', NULL, ?, ?, ?, ?, NULL)",
        [
            Block_Id,
            Floor_Number,
            Floor_Label,
            Total_Flats
        ]
    );

    return rows[0][0] || { Message: "Insert failed" };
};


/* ======================= UPDATE ======================= */
const update = async (data) => {
    const {
        Floor_Id,
        Block_Id,
        Floor_Number,
        Floor_Label,
        Total_Flats
    } = data;

    const [rows] = await db.query(
        "CALL sp_floor('UPDATE', ?, ?, ?, ?, ?, NULL)",
        [
            Floor_Id,
            Block_Id,
            Floor_Number,
            Floor_Label,
            Total_Flats
        ]
    );

    return rows[0][0];
};


/* ======================= DELETE ======================= */
const remove = async (id) => {
    const [rows] = await db.query(
        "CALL sp_floor('DELETE', ?, NULL, NULL, NULL, NULL, NULL)",
        [id]
    );
    return rows[0][0];
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};