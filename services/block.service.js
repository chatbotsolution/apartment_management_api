const db = require("../config/db");

const getAll = async () => {
    const [rows] = await db.query(
        "CALL SP_Blocks(?, NULL, NULL, NULL, NULL)",
        ["GET_ALL"]
    );
    return rows[0];
};

const getById = async (id) => {
    const [rows] = await db.query(
        "CALL SP_Blocks(?, ?, NULL, NULL, NULL)",
        ["GET_BY_ID", id]
    );
    return rows[0];
};

const create = async (data) => {
    const { Society_Id, Block_Name, Total_Floors } = data;

    const [rows] = await db.query(
        "CALL SP_Blocks(?, NULL, ?, ?, ?)",
        ["INSERT", Society_Id, Block_Name, Total_Floors]
    );

    return rows[0][0];
};

const update = async (data) => {
    const { Block_Id, Society_Id, Block_Name, Total_Floors } = data;

    const [rows] = await db.query(
        "CALL SP_Blocks(?, ?, ?, ?, ?)",
        ["UPDATE", Block_Id, Society_Id, Block_Name, Total_Floors]
    );

    return rows[0][0];
};

const remove = async (id) => {
    const [rows] = await db.query(
        "CALL SP_Blocks(?, ?, NULL, NULL, NULL)",
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
