const db = require("../config/db");

/* ======================= LOOKUP BY GROUP ======================= */
const getLookupByGroup = async (groupName) => {
    const [rows] = await db.query(
        "CALL sp_dropdown_master(?,?,?)",
        ["LOOKUP_BY_GROUP", groupName, null]
    );

    return rows[0] || [];
};

/* ======================= ALL LOOKUPS ======================= */
const getAllLookups = async () => {
    const [rows] = await db.query(
        "CALL sp_dropdown_master(?,?,?)",
        ["ALL_LOOKUPS", null, null]
    );

    return rows[0] || [];
};

/* ======================= GENERIC DROPDOWNS ======================= */
const getDropdown = async (action, societyId = null) => {
    const [rows] = await db.query(
        "CALL sp_dropdown_master(?,?,?)",
        [action, null, societyId]
    );

    return rows[0] || [];
};

/* ======================= SOCIETY TYPE DROPDOWNS ======================= */
const getSocietyType = async () => {
    const [rows] = await db.query(
        "CALL sp_dropdown_master(?,?,?)",
        ["SOCIETY_TYPE", null, null]
    );

    return rows[0] || [];
};

module.exports = {
    getLookupByGroup,
    getAllLookups,
    getDropdown,
    getSocietyType
};