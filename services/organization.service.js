const db = require("../config/db");

/* ================= GET ALL ================= */
const getAll = async () => {
    const [rows] = await db.query(
        "CALL sp_organization('GET_ALL', NULL, NULL, NULL, NULL, NULL, NULL, NULL)"
    );
    return rows[0];
};

/* ================= GET BY ID ================= */
const getById = async (id) => {
    const [rows] = await db.query(
        "CALL sp_organization('GET_BY_ID', ?, NULL, NULL, NULL, NULL, NULL, NULL)",
        [id]
    );
    return rows[0];
};

/* ================= CREATE ================= */
const create = async (data) => {

    const {
        org_name,
        registration_number,
        contact_email,
        contact_phone,
        address,
        website
    } = data;

    const [rows] = await db.query(
        "CALL sp_organization('INSERT', NULL, ?, ?, ?, ?, ?, ?)",
        [
            org_name,
            registration_number,
            contact_email,
            contact_phone,
            address,
            website
        ]
    );

    return rows[0];
};

/* ================= UPDATE ================= */
const update = async (data) => {

    const {
        org_id,
        org_name,
        registration_number,
        contact_email,
        contact_phone,
        address,
        website
    } = data;

    const [rows] = await db.query(
        "CALL sp_organization('UPDATE', ?, ?, ?, ?, ?, ?, ?)",
        [
            org_id,
            org_name,
            registration_number,
            contact_email,
            contact_phone,
            address,
            website
        ]
    );

    return rows[0];
};

/* ================= DELETE ================= */
const remove = async (id) => {
    const [rows] = await db.query(
        "CALL sp_organization('DELETE', ?, NULL, NULL, NULL, NULL, NULL, NULL)",
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