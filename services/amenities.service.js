const db = require("../config/db");


/* ======================= GET ALL ======================= */
const getAll = async () => {
    const [rows] = await db.query(
        "CALL SP_Amenities(NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, ?, NULL, NULL)",
        ["GET"]
    );
    return rows[0];
};


/* ======================= GET BY ID ======================= */
const getById = async (id) => {
    const [rows] = await db.query(
        "CALL SP_Amenities(?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, ?, NULL, NULL)",
        [id, "GET"]
    );
    return rows[0];
};


/* ======================= CREATE ======================= */
const create = async (data) => {
    const {
        Amenities_Name,
        Description,
        Amount,
        IsChargeable,
        Society_Id,
        CreatedBy
    } = data;

    const [rows] = await db.query(
        "CALL SP_Amenities(NULL, ?, ?, ?, ?, ?, NULL, ?, NOW(), ?, NULL, NULL)",
        [
            Amenities_Name,
            Description,
            Amount,
            IsChargeable,
            Society_Id,
            CreatedBy,
            "INSERT"
        ]
    );

    if (!rows || !rows[0] || !rows[0][0]) {
        return { AmenitiesId: 0, Message: "Insert failed" };
    }

    return rows[0][0];
};


/* ======================= UPDATE ======================= */
const update = async (data) => {
    const {
        AmenitiesId,
        Amenities_Name,
        Description,
        Amount,
        IsChargeable,
        Society_Id,
        Updated_By
    } = data;

    const [rows] = await db.query(
        "CALL SP_Amenities(?, ?, ?, ?, ?, ?, NULL, NULL, NULL, ?, ?, NOW())",
        [
            AmenitiesId,
            Amenities_Name,
            Description,
            Amount,
            IsChargeable,
            Society_Id,
            "UPDATE",
            Updated_By
        ]
    );

    return rows[0][0];
};


/* ======================= STATUS CHANGE ======================= */
const changeStatus = async (data) => {
    const { AmenitiesId, IsActive, Updated_By } = data;

    const [rows] = await db.query(
        "CALL SP_Amenities(?, NULL, NULL, NULL, NULL, NULL, ?, NULL, NULL, ?, ?, NULL)",
        [
            AmenitiesId,     // 1st
            IsActive,        // 7th
            "STATUS_CHNG",   // 10th (P_Action)
            Updated_By       // 11th
        ]
    );

    if (!rows || !rows[0] || !rows[0][0]) {
        return { Message: "Status change failed" };
    }

    return rows[0][0];
};


module.exports = {
    getAll,
    getById,
    create,
    update,
    changeStatus
};