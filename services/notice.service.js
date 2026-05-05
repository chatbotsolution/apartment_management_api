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
        "CALL sp_notice('INSERT', NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
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

    return rows[0][0];
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
        "CALL sp_notice('UPDATE', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
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

    return rows[0][0];
};


/* ======================= DELETE ======================= */
const remove = async (id) => {
    const [rows] = await db.query(
        "CALL sp_notice('DELETE', ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)",
        [id]
    );

    return rows[0][0];
};


/* ======================= GET BY ID ======================= */
const getById = async (id) => {
    const [rows] = await db.query(
        "CALL sp_notice('GET_BY_ID', ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)",
        [id]
    );

    return rows[0];
};


/* ======================= GET ALL ======================= */
const getAll = async (societyId) => {
    const [rows] = await db.query(
        "CALL sp_notice('GET_ALL', NULL, ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)",
        [societyId]
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