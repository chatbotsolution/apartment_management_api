const db = require("../config/db");

// GET ALL
const getAll = async () => {
    const [rows] = await db.query(
        "CALL SP_FlatUsers(?, NULL, NULL, NULL, NULL, NULL, NULL, NULL)",
        ["GET_ALL"]
    );
    return rows[0];
};

// GET BY ID
const getById = async (id) => {
    const [rows] = await db.query(
        "CALL SP_FlatUsers(?, ?, NULL, NULL, NULL, NULL, NULL, NULL)",
        ["GET_BY_ID", id]
    );
    return rows[0][0];
};

// INSERT
const create = async (data) => {
    const { Full_Name, Email, Mobile, Password_Hash, Role, Is_Active } = data;
    const [rows] = await db.query(
        "CALL SP_FlatUsers(?, NULL, ?, ?, ?, ?, ?, ?)",
        ["INSERT", Full_Name, Email, Mobile, Password_Hash, Role, Is_Active]
    );
    return rows[0][0];
};

// UPDATE
const update = async (data) => {
    const { F_User_Id, Full_Name, Email, Mobile, Password_Hash, Role, Is_Active } = data;
    const [rows] = await db.query(
        "CALL SP_FlatUsers(?, ?, ?, ?, ?, ?, ?, ?)",
        ["UPDATE", F_User_Id, Full_Name, Email, Mobile, Password_Hash, Role, Is_Active]
    );
    return rows[0][0];
};

// DELETE
const remove = async (id) => {
    const [rows] = await db.query(
        "CALL SP_FlatUsers(?, ?, NULL, NULL, NULL, NULL, NULL, NULL)",
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