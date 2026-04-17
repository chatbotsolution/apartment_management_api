const db = require("../config/db");

// GET ALL
const getAll = async () => {
    const [rows] = await db.query(
        "CALL SP_Flats(?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)",
        ["GET_ALL"]
    );
    return rows[0];
};

// GET BY ID
const getById = async (id) => {
    const [rows] = await db.query(
        "CALL SP_Flats(?, ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)",
        ["GET_BY_ID", id]
    );
    return rows[0][0];
};
// GET BY BLOCK
const getByBlock = async (blockId) => {
    const [rows] = await db.query(
        "CALL SP_Flats(?, NULL, ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)",
        ["GET_BY_BLOCK", blockId]
    );
    return rows[0]; // Returns array of flats in that block
};

// GET AVAILABLE PARKING
const getAvailableParking = async () => {
    const [rows] = await db.query(
        "CALL SP_Flats(?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)",
        ["GET_AVAILABLE"]
    );

    return rows[0];
};

// INSERT
const create = async (data) => {
    const {
        Block_Id,
        Flat_Number,
        Floor_Number,
        Flat_Type,
        Super_Builtup_Area,
        BuiltUp_Area,
        Carpet_Area,
        Occup_Status,
        isRent,
        Parking,
        parkingId
    } = data;

    const [rows] = await db.query(
        "CALL SP_Flats(?, NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
            "INSERT",
            Block_Id,
            Flat_Number,
            Floor_Number,
            Flat_Type,
            Super_Builtup_Area,
            BuiltUp_Area,
            Carpet_Area,
            Occup_Status,
            isRent,
            Parking,
            parkingId
        ]
    );

    return rows[0][0];
};

// UPDATE
const update = async (data) => {
    const {
        Flat_Id,
        Block_Id,
        Flat_Number,
        Floor_Number,
        Flat_Type,
        Super_Builtup_Area,
        BuiltUp_Area,
        Carpet_Area,
        Occup_Status,
        isRent,
        Parking,
        parkingId
    } = data;

    const [rows] = await db.query(
        "CALL SP_Flats(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
            "UPDATE",
            Flat_Id,
            Block_Id,
            Flat_Number,
            Floor_Number,
            Flat_Type,
            Super_Builtup_Area,
            BuiltUp_Area,
            Carpet_Area,
            Occup_Status,
            isRent,
            Parking,
            parkingId
        ]
    );

    return rows[0][0];
};

// DELETE
const remove = async (id) => {
    const [rows] = await db.query(
        "CALL SP_Flats(?, ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)",
        ["DELETE", id]
    );
    return rows[0][0];
};

module.exports = {
    getAll,
    getById,
    getByBlock,
    getAvailableParking,
    create,
    update,
    delete: remove
};