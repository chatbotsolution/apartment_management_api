const db = require("../config/db");

/* ======================= CREATE ======================= */
const create = async (data) => {
    const { society_id, bhk_type_id, area_sqft, monthly_maintenance } = data;

    const [rows] = await db.query(
        "CALL BHKMasterCRUD(?, ?, ?, ?, ?, ?)",
        ["CREATE", null, society_id, bhk_type_id, area_sqft, monthly_maintenance]
    );
    return rows;
};

/* ======================= UPDATE ======================= */
const update = async (data) => {
    const { bhk_id, society_id, bhk_type_id, area_sqft, monthly_maintenance } = data;

    const [rows] = await db.query(
        "CALL BHKMasterCRUD(?, ?, ?, ?, ?, ?)",
        ["UPDATE", bhk_id, society_id, bhk_type_id, area_sqft, monthly_maintenance]
    );
    return rows;
};

/* ======================= DELETE ======================= */
const remove = async (id) => {
    const [rows] = await db.query(
        "CALL BHKMasterCRUD(?, ?, ?, ?, ?, ?)",
        ["DELETE", id, null, null, null, null]
    );
    return rows;
};

/* ======================= GET BY ID ======================= */
const getById = async (id) => {
    const [rows] = await db.query(
        "CALL BHKMasterCRUD(?, ?, ?, ?, ?, ?)",
        ["GET_BY_ID", id, null, null, null, null]
    );
    return rows[0][0]; // Extracting the single record from the procedure result
};

/* ======================= GET ALL ======================= */
const getAll = async () => {
    const [rows] = await db.query(
        "CALL BHKMasterCRUD(?, ?, ?, ?, ?, ?)",
        ["GET_ALL", null, null, null, null, null]
    );
    return rows[0];
};

module.exports = { create, update, remove, getById, getAll };