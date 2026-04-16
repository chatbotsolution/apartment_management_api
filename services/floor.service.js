const db = require("../config/db");

// ================= GET ALL =================
const getAll = async () => {
    const [rows] = await db.query(
        "CALL SP_FloorMaster(?, NULL, NULL, NULL, NULL, NULL, NULL, Null)",
        ["GETALL"]
    );
    return rows[0];
};

// ================= GET BY ID =================
const getById = async (id) => {
    const [rows] = await db.query(
        "CALL SP_FloorMaster(?, ?, NULL, NULL, NULL, NULL, NULL, NULL)",
        ["GETBYID", id]
    );
    return rows[0];
};

// ================= CREATE =================
const create = async (data) => {
    const { Block_Id, Floor_Number, Floor_Name, Created_By } = data;

    const [rows] = await db.query(
        "CALL SP_FloorMaster(?, NULL, ?, ?, ?, ?, NULL, ?)",
        [
            "INSERT",
            Block_Id,
            Floor_Number,
            Floor_Name,
            Created_By,
            1
        ]
    );

    return rows[0][0];
};

// ================= UPDATE =================
const update = async (data) => {
    const { Floor_Id, Block_Id, Floor_Number, Floor_Name, Updated_By, Is_Active } = data;

    const [rows] = await db.query(
        "CALL SP_FloorMaster(?, ?, ?, ?, ?, NULL, ?, ?)",
        [
            "UPDATE",
            Floor_Id,
            Block_Id,
            Floor_Number,
            Floor_Name,
            Updated_By,
            Is_Active
        ]
    );

    return rows[0][0];
};

// ================= DELETE =================
const remove = async (id) => {
    const [rows] = await db.query(
        "CALL SP_FloorMaster(?, ?, NULL, NULL, NULL, NULL, NULL, NULL)",
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