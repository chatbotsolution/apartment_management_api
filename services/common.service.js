const db = require("../config/db");


/* ======================= GET ALL COUNTRY ======================= */
const getAllCountry = async () => {
    const [rows] = await db.query(
        "CALL SP_Country_Master(NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, ?)",
        ["GET"]
    );
    return rows[0];
};


/* ======================= GET ALL STATE ======================= */
const getAllState = async () => {
    const [rows] = await db.query(
        "CALL SP_State_Master(NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, ?)",
        ["GET"]
    );
    return rows[0];
};


/* ======================= GET ALL DISTRICT ======================= */
const getAllDistrict = async () => {
    const [rows] = await db.query(
        "CALL SP_District_Master(NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, ?)",
        ["GET"]
    );
    return rows[0];
};


/* ======================= GET FLOOR DROPDOWN ======================= */
const getAllFloors = async () => {
    const [rows] = await db.query(
        "CALL SP_FloorMaster(?, NULL, NULL, NULL, NULL, NULL, NULL, NULL)",
        ["GETDROPDOWN"]
    );

    return rows[0];
};

const getAllNationality = async () => {
    const [rows] = await db.query(
        "CALL sp_Nationality_Dropdown()"
    );
    console.log(rows[0]);
    return rows[0];
};


/* ======================= GET OWNER DROPDOWN ======================= */
const getOwners = async () => {
    const [rows] = await db.query(
        "CALL SP_Common(?, ?, ?, ?, ?)",
        ["GET_OWNERS", null, null, null, null]
    );

    console.log("Owners Result:", rows);

    return rows[0];
};


/* ======================= GET BLOCK BY OWNER ======================= */
const getBlocksByOwner = async (ownerId) => {
    const [rows] = await db.query(
        "CALL SP_Common(?, ?, ?, ?, ?)",
        ["GET_BLOCKS_BY_OWNER", ownerId, null, null, null]
    );
    return rows[0];
};


/* ======================= GET FLOOR BY OWNER + BLOCK ======================= */
const getFloorsByOwnerBlock = async (ownerId, blockId) => {
    const [rows] = await db.query(
        "CALL SP_Common(?, ?, ?, ?, ?)",
        ["GET_FLOORS_BY_OWNER_BLOCK", ownerId, blockId, null, null]
    );
    return rows[0];
};


/* ======================= GET FLAT BY OWNER + BLOCK + FLOOR ======================= */
const getFlatsByOwnerBlockFloor = async (ownerId, blockId, floorId) => {
    const [rows] = await db.query(
        "CALL SP_Common(?, ?, ?, ?, ?)",
        ["GET_FLATS_BY_OWNER_BLOCK_FLOOR", ownerId, blockId, floorId, null]
    );
    return rows[0];
};


module.exports = {
    getAllCountry,
    getAllState,
    getAllDistrict,
    getAllFloors,
    getOwners,
    getBlocksByOwner,
    getFloorsByOwnerBlock,
    getFlatsByOwnerBlockFloor,
    getAllNationality
};