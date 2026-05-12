const db = require("../config/db");

/* ======================= CREATE ======================= */
const createDesignation = async (data) => {
    return await db.query(
        "CALL sp_designation(?, ?, ?, ?, ?, ?)",
        [
            "INSERT",
            0,
            data.department_id,
            data.designation_name,
            data.description,
            null
        ]
    );
};

/* ======================= UPDATE ======================= */
const updateDesignation = async (data) => {
    return await db.query(
        "CALL sp_designation(?, ?, ?, ?, ?, ?)",
        [
            "UPDATE",
            data.designation_id,
            data.department_id,
            data.designation_name,
            data.description,
            null
        ]
    );
};

/* ======================= DELETE ======================= */
const deleteDesignation = async (designation_id) => {
    return await db.query(
        "CALL sp_designation(?, ?, ?, ?, ?, ?)",
        [
            "DELETE",
            designation_id,
            null,
            null,
            null,
            null
        ]
    );
};

/* ======================= GET BY ID ======================= */
const getDesignationById = async (designation_id) => {
    return await db.query(
        "CALL sp_designation(?, ?, ?, ?, ?, ?)",
        [
            "GET_BY_ID",
            designation_id,
            null,
            null,
            null,
            null
        ]
    );
};

/* ======================= GET ALL ======================= */
const getAllDesignations = async () => {
    return await db.query(
        "CALL sp_designation(?, ?, ?, ?, ?, ?)",
        [
            "GET_ALL",
            null,
            null,
            null,
            null,
            null
        ]
    );
};

module.exports = {
    createDesignation,
    updateDesignation,
    deleteDesignation,
    getDesignationById,
    getAllDesignations
};