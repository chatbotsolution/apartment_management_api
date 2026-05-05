const db = require("../config/db");

/* ======================= GET ALL ======================= */
const getAll = async () => {
    const [rows] = await db.query(
        "CALL sp_complaint('GET_ALL', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)"
    );
    return rows[0];
};

/* ======================= GET BY ID ======================= */
const getById = async (id) => {
    const [rows] = await db.query(
        "CALL sp_complaint('GET_BY_ID', ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)",
        [id]
    );
    return rows[0];
};

/* ======================= CREATE ======================= */
const create = async (data) => {
    const {
        flat_id,
        owner_id,
        tenant_id,
        title,
        description,
        category_id,
        priority_id,
        status_id,
        attachment_url
    } = data;

    const [rows] = await db.query(
        "CALL sp_complaint('INSERT', NULL, ?, ?, ?, ?, ?, ?, ?, ?, NULL, NULL, NULL, ?)",
        [
            flat_id,
            owner_id,
            tenant_id,
            title,
            description,
            category_id,
            priority_id,
            status_id,
            attachment_url
        ]
    );

    return rows[0][0];
};

/* ======================= UPDATE ======================= */
const update = async (data) => {
    const {
        complaint_id,
        title,
        description,
        category_id,
        priority_id,
        status_id,
        attachment_url
    } = data;

    const [rows] = await db.query(
        "CALL sp_complaint('UPDATE', ?, NULL, NULL, NULL, ?, ?, ?, ?, ?, NULL, NULL, NULL, ?)",
        [
            complaint_id,
            title,
            description,
            category_id,
            priority_id,
            status_id,
            attachment_url
        ]
    );

    return rows[0][0];
};

/* ======================= ASSIGN STAFF ======================= */
const assign = async (data) => {
    const { complaint_id, assigned_staff_id, status_id } = data;

    const [rows] = await db.query(
        "CALL sp_complaint('ASSIGN', ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, ?, ?, NULL, NULL, NULL)",
        [complaint_id, assigned_staff_id, status_id]
    );

    return rows[0][0];
};

/* ======================= RESOLVE ======================= */
const resolve = async (data) => {
    const { complaint_id, resolution_note, status_id } = data;

    const [rows] = await db.query(
        "CALL sp_complaint('RESOLVE', ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, ?, NULL, ?, NULL, NULL)",
        [complaint_id, resolution_note, status_id]
    );

    return rows[0][0];
};

/* ======================= RATE ======================= */
const rate = async (data) => {
    const { complaint_id, rating } = data;

    const [rows] = await db.query(
        "CALL sp_complaint('RATE', ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, ?, NULL)",
        [complaint_id, rating]
    );

    return rows[0][0];
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