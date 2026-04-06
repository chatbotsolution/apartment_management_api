const db = require("../config/db");

const getAll = async () => {
    const [rows] = await db.query(
        "CALL SP_Visitors(?, NULL, NULL, NULL, NULL, NULL, NULL, NULL)",
        ["GET_ALL"]
    );
    return rows[0];
};

const getById = async (id) => {
    const [rows] = await db.query(
        "CALL SP_Visitors(?, ?, NULL, NULL, NULL, NULL, NULL, NULL)",
        ["GET_BY_ID", id]
    );
    return rows[0];
};

const getByFlat = async (flatId) => {
    const [rows] = await db.query(
        "CALL SP_Visitors(?, NULL, NULL, NULL, ?, NULL, NULL, NULL)",
        ["GET_BY_FLAT", flatId]
    );
    const result = rows[0]; 

    return result; 
};

const create = async (data) => {
    console.log("Visitor Data = ", data);

    const { Name, Mobile, Flat_Id, Entry_Time, Purpose } = data;

    const [rows] = await db.query(
        "CALL SP_Visitors(?, NULL, ?, ?, ?, ?, NULL, ?)",
        [
            "INSERT",
            Name,
            Mobile,
            Flat_Id,
            Entry_Time,
            Purpose
        ]
    );

    if (!rows || !rows[0] || !rows[0][0]) {
        return { message: "Insert failed or no response from DB" };
    }

    return rows[0][0];
};

const update = async (data) => {
    const { Visitor_Id, Name, Mobile, Flat_Id, Purpose } = data;

    const [rows] = await db.query(
        "CALL SP_Visitors(?, ?, ?, ?, ?, NULL, NULL, ?)",
        [
            "UPDATE",
            Visitor_Id,
            Name,
            Mobile,
            Flat_Id,
            Purpose
        ]
    );

    return rows[0][0];
};

const exitVisitor = async (data) => {
    const { Visitor_Id, Exit_Time } = data;

    const [rows] = await db.query(
        "CALL SP_Visitors(?, ?, NULL, NULL, NULL, ?, NULL, NULL)",
        [
            "EXIT",
            Visitor_Id,
            Exit_Time
        ]
    );

    return rows[0][0];
};

module.exports = {
    getAll,
    getById,
    getByFlat,
    create,
    update,
    exitVisitor
};