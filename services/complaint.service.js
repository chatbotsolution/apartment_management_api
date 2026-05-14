const db = require("../config/db");

/* ======================= GET ALL ======================= */
const getAll = async (limit = 50, offset = 0) => {
    const [rows] = await db.query(
        "CALL sp_complaint('GET_ALL', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, ?, ?)",
        [limit, offset]
    );
    return rows[0]; // Keep [0] here because SELECT returns an array of records
};

/* ======================= GET BY ID ======================= */
const getById = async (id) => {
    const [rows] = await db.query(
        "CALL sp_complaint('GET_BY_ID', ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)",
        [id]
    );
    return rows[0][0]; // Keep [0][0] here to return the single object
};

/* ======================= CREATE ======================= */
const create = async (data) => {
    const {
        flat_id, owner_id, tenant_id, title, description,
        category_id, priority_id, status_id, attachment_url
    } = data;

    const [rows] = await db.query(
        "CALL sp_complaint('INSERT', NULL, ?, ?, ?, ?, ?, ?, ?, ?, NULL, NULL, NULL, ?, NULL, NULL)",
        [flat_id, owner_id, tenant_id, title, description, category_id, priority_id, status_id, attachment_url]
    );

    return rows; // ✅ Changed to return rows directly (ResultSetHeader)
};

/* ======================= UPDATE ======================= */
const update = async (data) => {
    const {
        complaint_id, title, description,
        category_id, priority_id, status_id, attachment_url
    } = data;

    const [rows] = await db.query(
        "CALL sp_complaint('UPDATE', ?, NULL, NULL, NULL, ?, ?, ?, ?, ?, NULL, NULL, NULL, ?, NULL, NULL)",
        [complaint_id, title, description, category_id, priority_id, status_id, attachment_url]
    );

    return rows; // ✅ Changed to return rows directly
};

/* ======================= ASSIGN STAFF ======================= */
const assign = async (data) => {
    const { complaint_id, assigned_staff_id, status_id } = data;

    const [rows] = await db.query(
        "CALL sp_complaint('ASSIGN', ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, ?, ?, NULL, NULL, NULL, NULL, NULL)",
        [complaint_id, status_id, assigned_staff_id]
    );

    return rows; // ✅ Changed to return rows directly
};

/* ======================= RESOLVE ======================= */
const resolve = async (data) => {
    const { complaint_id, resolution_note, status_id } = data;

    const [rows] = await db.query(
        "CALL sp_complaint('RESOLVE', ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, ?, NULL, ?, NULL, NULL, NULL, NULL)",
        [complaint_id, status_id, resolution_note]
    );

    return rows; // ✅ Changed to return rows directly
};

/* ======================= RATE ======================= */
const rate = async (data) => {
    const { complaint_id, rating } = data;

    const [rows] = await db.query(
        "CALL sp_complaint('RATE', ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, ?, NULL, NULL, NULL)",
        [complaint_id, rating]
    );

    return rows; // ✅ Changed to return rows directly
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    assign,
    resolve,
    rate
};