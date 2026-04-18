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


module.exports = {
    getAllCountry,
    getAllState,
    getAllDistrict,
    getAllFloors,
    getAllNationality
};