const db = require("../config/db");

/* ======================= GET ALL ======================= */
const getAll = async () => {
    const [rows] = await db.query(
        "CALL sp_designation('GET_ALL', NULL, NULL, NULL, NULL, NULL)"
    );
    return rows[0];
};

/* ======================= GET BY ID ======================= */
const getById = async (id) => {
    const [rows] = await db.query(
        "CALL sp_designation('GET_BY_ID', ?, NULL, NULL, NULL, NULL)",
        [id]
    );
    return rows[0];
};

/* ======================= CREATE ======================= */
const create = async (data) => {
    const {
        department_id,
        designation_name,
        description,
        is_active
    } = data;

    const [rows] = await db.query(
        "CALL sp_designation('INSERT', NULL, ?, ?, ?, ?)",
        [
            department_id,
            designation_name,
            description,
            is_active
        ]
    );

    return rows[0][0];
};

/* ======================= UPDATE ======================= */
const update = async (data) => {
    const {
        designation_id,
        department_id,
        designation_name,
        description,
        is_active
    } = data;

    const [rows] = await db.query(
        "CALL sp_designation('UPDATE', ?, ?, ?, ?, ?)",
        [
            designation_id,
            department_id,
            designation_name,
            description,
            is_active
        ]
    );

    return rows[0][0];
};

/* ======================= DELETE (SOFT) ======================= */
const remove = async (id) => {
    const [rows] = await db.query(
        "CALL sp_designation('DELETE', ?, NULL, NULL, NULL, NULL)",
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