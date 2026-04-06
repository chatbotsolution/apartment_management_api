const db = require("../config/db");

const getAll = async () => {
    const [rows] = await db.query(
        "CALL SP_ManageUsers(?, NULL, NULL, NULL, NULL, NULL, NULL, NULL)",
        ["GET_ALL"]
    );
    return rows[0];
};

const getById = async (id) => {
    const [rows] = await db.query(
        "CALL SP_ManageUsers(?, ?, NULL, NULL, NULL, NULL, NULL, NULL)",
        ["GET_BY_ID", id]
    );
    return rows[0][0];
};

const create = async (data) => {
    const { Full_Name, Email, Mobile, Password_Hash, Role, Is_Active } = data;
    const [rows] = await db.query(
        "CALL SP_ManageUsers(?, NULL, ?, ?, ?, ?, ?, ?)",
        ["INSERT", Full_Name, Email, Mobile, Password_Hash, Role, Is_Active]
    );
    return rows[0][0];
};

const update = async (data) => {
    const { User_Id, Full_Name, Email, Mobile, Password_Hash, Role, Is_Active } = data;
    const [rows] = await db.query(
        "CALL SP_ManageUsers(?, ?, ?, ?, ?, ?, ?, ?)",
        ["UPDATE", User_Id, Full_Name, Email, Mobile, Password_Hash, Role, Is_Active]
    );
    return rows[0][0];
};

const remove = async (id) => {
    const [rows] = await db.query(
        "CALL SP_ManageUsers(?, ?, NULL, NULL, NULL, NULL, NULL, NULL)",
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