const db = require("../config/db");

/* ================= GET ALL ================= */
const getAll = async () => {
    const [rows] = await db.query(
        "CALL sp_manage_organization('GET_ALL', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)"
    );
    return rows[0];
};

/* ================= GET SOCIETIES BY ORG ================= */
const getSocietiesByOrg = async (orgId) => {
    const [rows] = await db.query(
        "CALL sp_manage_organization('GET_SOCIETIES_BY_ORG', ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)",
        [orgId]
    );
    return rows[0];
};

/* ================= GET BY ID ================= */
const getById = async (id) => {
    const [rows] = await db.query(
        "CALL sp_manage_organization('GET_BY_ID', ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)",
        [id]
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
        website,
        country_id,
        state_id,
        dist_id
    } = data;

    const [rows] = await db.query(
        "CALL sp_manage_organization('UPDATE', ?, ?, ?, ?, ?, ?, ?, NULL, ?, ?, ?)",
        [
            org_id,
            org_name,
            registration_number,
            contact_email,
            contact_phone,
            address,
            website,
            country_id,
            state_id,
            dist_id
        ]
    );
    return rows[0];
};

/* ================= DELETE ================= */
const remove = async (id) => {
    const [rows] = await db.query(
        "CALL sp_manage_organization('DELETE', ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)",
        [id]
    );
    return rows[0];
};

module.exports = {
    getAll,
    getSocietiesByOrg,
    getById,
    update,
    remove
};
