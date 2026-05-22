const db = require("../config/db");

/* ======================= GET ALL ======================= */
const getAll = async (society_id) => {
    const param = society_id ? society_id : null;
    
    // 11 parameters: Action, flat_id, floor_id, block_id, flat_number, bhk_type_id, balconies, facing_id, status_id, is_corner, society_id
    const [rows] = await db.query(
        "CALL sp_flat('GET_ALL', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, ?)",
        [param]
    );

    return rows[0];
};

/* ======================= GET BY ID ======================= */
const getById = async (id) => {
    // 11 parameters
    const [rows] = await db.query(
        "CALL sp_flat('GET_BY_ID', ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)",
        [id]
    );

    return rows[0];
};

/* ======================= CREATE ======================= */
const create = async (data) => {
    const {
        floor_id,
        block_id,
        flat_number,
        bhk_type_id,
        balconies,
        facing_id,
        status_id,
        is_corner_flat
    } = data;

    // 11 parameters
    const [rows] = await db.query(
        "CALL sp_flat('INSERT', NULL, ?, ?, ?, ?, ?, ?, ?, ?, NULL)",
        [
            floor_id,
            block_id,
            flat_number,
            bhk_type_id,
            balconies,
            facing_id,
            status_id,
            is_corner_flat
        ]
    );

    return rows[0];
};

/* ======================= UPDATE ======================= */
const update = async (data) => {
    const {
        flat_id,
        floor_id,
        block_id,
        flat_number,
        bhk_type_id,
        balconies,
        facing_id,
        status_id,
        is_corner_flat
    } = data;

    // 11 parameters
    const [rows] = await db.query(
        "CALL sp_flat('UPDATE', ?, ?, ?, ?, ?, ?, ?, ?, ?, NULL)",
        [
            flat_id,
            floor_id,
            block_id,
            flat_number,
            bhk_type_id,
            balconies,
            facing_id,
            status_id,
            is_corner_flat
        ]
    );

    return rows[0];
};

/* ======================= DELETE ======================= */
const remove = async (id) => {
    // 11 parameters
    const [rows] = await db.query(
        "CALL sp_flat('DELETE', ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)",
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