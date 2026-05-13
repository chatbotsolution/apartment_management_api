const db = require("../config/db");

/* ======================= CREATE ======================= */
const createDepartment = async (data) => {
    return await db.query(
        "CALL sp_department(?, ?, ?, ?, ?)",
        [
            "INSERT",
            0,
            data.department_name,
            data.description,
            null
        ]
    );
};

/* ======================= UPDATE ======================= */
const updateDepartment = async (data) => {
    return await db.query(
        "CALL sp_department(?, ?, ?, ?, ?)",
        [
            "UPDATE",
            data.department_id,
            data.department_name,
            data.description,
            null
        ]
    );
};

/* ======================= DELETE ======================= */
const deleteDepartment = async (department_id) => {
    return await db.query(
        "CALL sp_department(?, ?, ?, ?, ?)",
        [
            "DELETE",
            department_id,
            null,
            null,
            null
        ]
    );
};

/* ======================= GET BY ID ======================= */
const getDepartmentById = async (department_id) => {
    return await db.query(
        "CALL sp_department(?, ?, ?, ?, ?)",
        [
            "GET_BY_ID",
            department_id,
            null,
            null,
            null
        ]
    );
};

/* ======================= GET ALL ======================= */
const getAllDepartments = async () => {
    return await db.query(
        "CALL sp_department(?, ?, ?, ?, ?)",
        [
            "GET_ALL",
            null,
            null,
            null,
            null
        ]
    );
};

module.exports = {
    createDepartment,
    updateDepartment,
    deleteDepartment,
    getDepartmentById,
    getAllDepartments
};