const db = require("../config/db");

/* ======================= GET ALL ======================= */
const getAll = async (societyId) => {
    const [rows] = await db.query(
        "CALL sp_flat('GET_ALL', NULL, NULL, ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)",
        [societyId]
    );
    return rows[0];
};


/* ======================= GET BY ID ======================= */
const getById = async (id) => {
    const [rows] = await db.query(
        "CALL sp_flat('GET_BY_ID', ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)",
        [id]
    );
    return rows[0];
};


/* ======================= CREATE ======================= */
const create = async (data) => {
    const {
        Floor_Id,
        Block_Id,
        Flat_Number,
        Flat_Type,
        Area_Sqft,
        Bedrooms,
        Bathrooms,
        Balconies,
        Facing_Id,
        Status_Id,
        Is_Corner_Flat,
        Monthly_Maintenance
    } = data;

    const [rows] = await db.query(
        "CALL sp_flat('INSERT', NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
            Floor_Id,
            Block_Id,
            Flat_Number,
            Flat_Type,
            Area_Sqft,
            Bedrooms,
            Bathrooms,
            Balconies,
            Facing_Id,
            Status_Id,
            Is_Corner_Flat,
            Monthly_Maintenance
        ]
    );

    return rows[0][0] || { Message: "Insert failed" };
};


/* ======================= UPDATE ======================= */
const update = async (data) => {
    const {
        Flat_Id,
        Floor_Id,
        Block_Id,
        Flat_Number,
        Flat_Type,
        Area_Sqft,
        Bedrooms,
        Bathrooms,
        Balconies,
        Facing_Id,
        Status_Id,
        Is_Corner_Flat,
        Monthly_Maintenance
    } = data;

    const [rows] = await db.query(
        "CALL sp_flat('UPDATE', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
            Flat_Id,
            Floor_Id,
            Block_Id,
            Flat_Number,
            Flat_Type,
            Area_Sqft,
            Bedrooms,
            Bathrooms,
            Balconies,
            Facing_Id,
            Status_Id,
            Is_Corner_Flat,
            Monthly_Maintenance
        ]
    );

    return rows[0][0];
};


/* ======================= DELETE ======================= */
const remove = async (id) => {
    const [rows] = await db.query(
        "CALL sp_flat('DELETE', ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)",
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