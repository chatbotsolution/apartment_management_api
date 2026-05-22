const db = require("../config/db");


/* ======================= GET ALL ======================= */
const getAll = async (society_id) => {
    // Pass society_id directly (it will be a string like '1,2' or null)
    const param = society_id ? society_id : null;

    const [rows] = await db.query(
        "CALL sp_floor('GET_ALL', NULL, NULL, NULL, NULL, NULL, ?)",
        [param]
    );

    return rows[0];
};


/* ======================= GET BY ID ======================= */
const getById = async (id, society_id) => {

    const [rows] = await db.query(
        "CALL sp_floor('GET_BY_ID', ?, NULL, NULL, NULL, NULL, ?)",
        [id, society_id]
    );

    return rows[0];
};


/* ======================= CREATE ======================= */
const create = async (data) => {

    const {
        block_id,
        floor_number,
        floor_label,
        total_flats,
        society_id
    } = data;

    const [rows] = await db.query(
        "CALL sp_floor('INSERT', NULL, ?, ?, ?, ?, ?)",
        [
            block_id,
            floor_number,
            floor_label,
            total_flats,
            society_id
        ]
    );

    return rows[0];
};


/* ======================= UPDATE ======================= */
const update = async (data) => {

    const {
        floor_id,
        block_id,
        floor_number,
        floor_label,
        total_flats,
        society_id
    } = data;

    const [rows] = await db.query(
        "CALL sp_floor('UPDATE', ?, ?, ?, ?, ?, ?)",
        [
            floor_id,
            block_id,
            floor_number,
            floor_label,
            total_flats,
            society_id
        ]
    );

    return rows[0];
};


/* ======================= DELETE ======================= */
const remove = async (id, society_id) => {

    const [rows] = await db.query(
        "CALL sp_floor('DELETE', ?, NULL, NULL, NULL, NULL, ?)",
        [id, society_id]
    );

    return rows[0];
};


module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};