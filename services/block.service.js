const db = require("../config/db");


/* ======================= GET ALL ======================= */
const getAll = async (society_id) => {
    // Keep as a string format to handle single or comma-separated lists safely
    const safeSocietyId = society_id ? String(society_id) : null;

    // FIX: Shifted safeSocietyId to the 3rd parameter position
    // Parameter 1: 'GET_ALL' (p_action)
    // Parameter 2: NULL       (p_block_id)
    // Parameter 3: ?          (p_society_id)
    const [rows] = await db.query(
        "CALL sp_block('GET_ALL', NULL, ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)",
        [safeSocietyId]
    );

    return rows[0] || [];
};


/* ======================= GET BY ID ======================= */
const getById = async (id) => {

    const [rows] = await db.query(
        "CALL sp_block('GET_BY_ID', ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)",
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
        lift_count,
        is_active
    } = data;

    const [rows] = await db.query(
        "CALL sp_block('INSERT', NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
            society_id,
            block_name,
            block_code,
            total_floors,
            total_flats,
            block_type_id,
            year_built,
            lift_count,
            is_active || 1
        ]
    );

    return rows[0];
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
        lift_count,
        is_active
    } = data;

    const [rows] = await db.query(
        "CALL sp_block('UPDATE', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
            block_id,
            society_id,
            block_name,
            block_code,
            total_floors,
            total_flats,
            block_type_id,
            year_built,
            lift_count,
            is_active || 1
        ]
    );

    return rows[0];
};


/* ======================= DELETE ======================= */
const remove = async (id) => {

    const [rows] = await db.query(
        "CALL sp_block('DELETE', ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)",
        [id]
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