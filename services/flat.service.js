const db = require("../config/db");

// GET ALL (9 Parameters)
const getAll = async () => {
    const [rows] = await db.query(
        "CALL SP_Flats(?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)",
        ["GET_ALL"]
    );
    return rows[0];
};

// GET BY ID (9 Parameters)
const getById = async (id) => {
    const [rows] = await db.query(
        "CALL SP_Flats(?, ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL)",
        ["GET_BY_ID", id]
    );
    return rows[0][0];
};

// INSERT (9 Parameters)
const create = async (data) => {
    const { Block_Id, Flat_Number, Floor_Number, Flat_Type, Area, Occup_Status, isRent } = data;
    const [rows] = await db.query(
        "CALL SP_Flats(?, NULL, ?, ?, ?, ?, ?, ?, ?)",
        ["INSERT", Block_Id, Flat_Number, Floor_Number, Flat_Type, Area, Occup_Status, isRent]
    );
    return rows[0][0];
};

// UPDATE (9 Parameters)
const update = async (data) => {
    const { Flat_Id, Block_Id, Flat_Number, Floor_Number, Flat_Type, Area, Occup_Status, isRent } = data;
    const [rows] = await db.query(
        "CALL SP_Flats(?, ?, ?, ?, ?, ?, ?, ?, ?)",
        ["UPDATE", Flat_Id, Block_Id, Flat_Number, Floor_Number, Flat_Type, Area, Occup_Status, isRent]
    );
    return rows[0][0];
};

// DELETE (9 Parameters)
const remove = async (id) => {
    const [rows] = await db.query(
        "CALL SP_Flats(?, ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL)",
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