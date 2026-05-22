const db = require("../config/db");

/* ======================= GET ALL ======================= */
const getAll = async (limit = 50, offset = 0, societyId = null, orgId = null) => {
    const safeSocietyId = societyId ? String(societyId) : null;
    const safeOrgId = orgId ? Number(orgId) : null;

    const [rows] = await db.query(
        "CALL sp_complaint('GET_ALL', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, ?, ?, ?, ?)",
        [limit, offset, safeSocietyId, safeOrgId]
    );
    return rows[0];
};

/* ======================= GET BY ID ======================= */
const getById = async (id) => {
    const [rows] = await db.query(
        "CALL sp_complaint('GET_BY_ID', ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)",
        [id]
    );
    return rows[0][0];
};

/* ======================= CREATE ======================= */
const create = async (data) => {
    const {
        flat_id, owner_id, tenant_id, title, description,
        category_id, priority_id, status_id, attachment_url
    } = data;

    const [rows] = await db.query(
        "CALL sp_complaint('INSERT', NULL, ?, ?, ?, ?, ?, ?, ?, ?, NULL, NULL, NULL, ?, NULL, NULL, NULL, NULL)",
        [flat_id, owner_id, tenant_id, title, description, category_id, priority_id, status_id, attachment_url]
    );
    return rows;
};

/* ======================= UPDATE ======================= */
const update = async (data) => {
    const {
        complaint_id, title, description,
        category_id, priority_id, status_id, attachment_url
    } = data;

    const [rows] = await db.query(
        "CALL sp_complaint('UPDATE', ?, NULL, NULL, NULL, ?, ?, ?, ?, ?, NULL, NULL, NULL, ?, NULL, NULL, NULL, NULL)",
        [complaint_id, title, description, category_id, priority_id, status_id, attachment_url]
    );
    return rows;
};

/* ======================= ASSIGN STAFF ======================= */
const assign = async (data) => {
    const { complaint_id, assigned_staff_id, status_id } = data;

    const [rows] = await db.query(
        "CALL sp_complaint('ASSIGN', ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, ?, ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL)",
        [complaint_id, status_id, assigned_staff_id]
    );
    return rows;
};

/* ======================= RESOLVE ======================= */
const resolve = async (data) => {
    const { complaint_id, resolution_note, status_id } = data;

    const [rows] = await db.query(
        "CALL sp_complaint('RESOLVE', ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, ?, NULL, ?, NULL, NULL, NULL, NULL, NULL, NULL)",
        [complaint_id, status_id, resolution_note]
    );
    return rows;
};

/* ======================= RATE ======================= */
const rate = async (data) => {
    const { complaint_id, rating } = data;

    const [rows] = await db.query(
        "CALL sp_complaint('RATE', ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, ?, NULL, NULL, NULL, NULL, NULL)",
        [complaint_id, rating]
    );
    return rows;
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