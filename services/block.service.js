const db = require("../config/db");

/* ======================= GET ALL ======================= */
const getAll = async (society_id) => {
    const [rows] = await db.query(
        "CALL sp_block('GET_ALL', NULL, ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL)",
        [society_id]
    );
    return rows[0];
};


/* ======================= GET BY ID ======================= */
const getById = async (id) => {
    const [rows] = await db.query(
        "CALL sp_block('GET_BY_ID', ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)",
        [id]
    );
    return rows[0];
};


/* ======================= CREATE ======================= */
const create = async (data) => {
    const {
        society_id,
        block_name,
        block_code,
        total_floors,
        total_flats,
        block_type_id,
        year_built,
        lift_count
    } = data;

    const [rows] = await db.query(
        "CALL sp_block('INSERT', NULL, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
            society_id,
            block_name,
            block_code,
            total_floors,
            total_flats,
            block_type_id,
            year_built,
            lift_count
        ]
    );

    return rows[0]?.[0] || { message: "Insert failed" };
};


/* ======================= UPDATE ======================= */
const update = async (data) => {
    const {
        block_id,
        society_id,
        block_name,
        block_code,
        total_floors,
        total_flats,
        block_type_id,
        year_built,
        lift_count
    } = data;

    const [rows] = await db.query(
        "CALL sp_block('UPDATE', ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
            block_id,
            society_id,
            block_name,
            block_code,
            total_floors,
            total_flats,
            block_type_id,
            year_built,
            lift_count
        ]
    );

    return rows[0]?.[0] || { message: "Update failed" };
};


/* ======================= DELETE ======================= */
const remove = async (id) => {
    const [rows] = await db.query(
        "CALL sp_block('DELETE', ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)",
        [id]
    );

    return rows[0]?.[0] || { message: "Delete failed" };
};


module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};