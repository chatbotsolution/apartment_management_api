const db = require("../config/db");

// GET ALL
const getAll = async () => {
    const [rows] = await db.query(
        "CALL SP_Owner(?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)",
        ["GET_ALL"]
    );
    return rows[0];
};

// GET ACTIVE MEMBERS
const getActive = async () => {
    const [rows] = await db.query(
        "CALL SP_Owner(?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)",
        ["GET_ACTIVE"]
    );
    return rows[0];
};

// GET BY ID
const getById = async (id) => {
    const [rows] = await db.query(
        "CALL SP_Owner(?, ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL)",
        ["GET_BY_ID", id]
    );
    return rows[0][0];
};

// GET BY FLAT
const getByFlat = async (flatId) => {
    const [rows] = await db.query(
        "CALL SP_Owner(?, NULL, NULL, ?, NULL, NULL, NULL, NULL, NULL)",
        ["GET_BY_FLAT", flatId]
    );
    return rows[0];
};

// CREATE
const create = async (data) => {
    const { User_Id, Flat_Id, Member_Type, Move_In_Date, Move_Out_Date, maintainance_head_id } = data;

    const [rows] = await db.query(
        "CALL SP_Owner(?, NULL, ?, ?, ?, ?, ?, NULL, ?)",
        ["INSERT", User_Id, Flat_Id, Member_Type, Move_In_Date, Move_Out_Date, maintainance_head_id]
    );

    return rows[0][0];
};

// UPDATE
const update = async (data) => {
    const {
        Member_Id, // Kept variable name as requested
        User_Id,
        Flat_Id,
        Member_Type,
        Move_In_Date,
        Move_Out_Date,
        Is_Active,
        maintainance_head_id
    } = data;

    const [rows] = await db.query(
        "CALL SP_Owner(?, ?, ?, ?, ?, ?, ?, ?, ?)",
        ["UPDATE", Member_Id, User_Id, Flat_Id, Member_Type, Move_In_Date, Move_Out_Date, Is_Active, maintainance_head_id]
    );

    return rows[0][0];
};

// DELETE
const remove = async (id) => {
    const [rows] = await db.query(
        "CALL SP_Owner(?, ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL)",
        ["DELETE", id]
    );

    return rows[0][0];
};

module.exports = {
    getAll,
    getActive,
    getById,
    getByFlat,
    create,
    update,
    delete: remove
};