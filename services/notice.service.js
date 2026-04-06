const db = require("../config/db");

const getAll = async () => {
    const [rows] = await db.query(
        "CALL SP_Notices(?, NULL, NULL, NULL, NULL, NULL, NULL)",
        ["GET_ALL"]
    );
    return rows[0];
};

const getById = async (id) => {
    const [rows] = await db.query(
        "CALL SP_Notices(?, ?, NULL, NULL, NULL, NULL, NULL)",
        ["GET_BY_ID", id]
    );
    return rows[0];
};

const create = async (data) => {
    console.log("Notice Data = ", data);

    const { Title, Description, Posted_By, Posted_On, Expiry_Date } = data;

    const [rows] = await db.query(
        "CALL SP_Notices(?, NULL, ?, ?, ?, ?, ?)",
        [
            "INSERT",
            Title,
            Description,
            Posted_By,
            Posted_On,
            Expiry_Date
        ]
    );

    if (!rows || !rows[0] || !rows[0][0]) {
        return { message: "Insert failed or no response from DB" };
    }

    return rows[0][0];
};

const update = async (data) => {
    const { Notice_Id, Title, Description, Posted_By, Posted_On, Expiry_Date } = data;

    const [rows] = await db.query(
        "CALL SP_Notices(?, ?, ?, ?, ?, ?, ?)",
        [
            "UPDATE",
            Notice_Id,
            Title,
            Description,
            Posted_By,
            Posted_On,
            Expiry_Date
        ]
    );

    return rows[0][0];
};

const remove = async (id) => {
    const [rows] = await db.query(
        "CALL SP_Notices(?, ?, NULL, NULL, NULL, NULL, NULL)",
        ["DELETE", id]
    );

    return rows[0][0];
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: remove
};