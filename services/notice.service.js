const db = require("../config/db");

/* ======================= CREATE ======================= */
const create = async (data) => {
    const {
        Society_Id,
        Posted_By_Staff_Id,
        Title,
        Body,
        Category_Id,
        Target_Audience_Id,
        Valid_Until,
        Is_Pinned,
        Attachment_Url
    } = data;

    const [rows] = await db.query(
        "CALL sp_notice(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
            "INSERT",
            null,
            Society_Id,
            Posted_By_Staff_Id,
            Title,
            Body,
            Category_Id,
            Target_Audience_Id,
            Valid_Until,
            Is_Pinned,
            Attachment_Url
        ]
    );

    return rows;
};


/* ======================= UPDATE ======================= */
const update = async (data) => {
    const {
        Notice_Id,
        Society_Id,
        Posted_By_Staff_Id,
        Title,
        Body,
        Category_Id,
        Target_Audience_Id,
        Valid_Until,
        Is_Pinned,
        Attachment_Url
    } = data;

    const [rows] = await db.query(
        "CALL sp_notice(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
            "UPDATE",
            Notice_Id,
            Society_Id,
            Posted_By_Staff_Id,
            Title,
            Body,
            Category_Id,
            Target_Audience_Id,
            Valid_Until,
            Is_Pinned,
            Attachment_Url
        ]
    );

    return rows;
};


/* ======================= DELETE ======================= */
const remove = async (id) => {
    const [rows] = await db.query(
        "CALL sp_notice(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
            "DELETE",
            id,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
        ]
    );

    return rows;
};


/* ======================= GET BY ID ======================= */
const getById = async (id) => {
    const [rows] = await db.query(
        "CALL sp_notice(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
            "GET_BY_ID",
            id,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
        ]
    );

    return rows[0];
};


/* ======================= GET ALL ======================= */
const getAll = async (societyId) => {
    const [rows] = await db.query(
        "CALL sp_notice(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
            "GET_ALL",
            null,
            societyId,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
        ]
    );

    return rows[0];
};

module.exports = {
    create,
    update,
    remove,
    getById,
    getAll
};