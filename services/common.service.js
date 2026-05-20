const db = require("../config/db");

/* ======================= LOOKUP BY GROUP ======================= */
const getLookupByGroup = async (groupName) => {
    const [rows] = await db.query(
        "CALL sp_dropdown_master(?,?,?,?)",
        ["LOOKUP_BY_GROUP", groupName, null,null]
    );

    return rows[0] || [];
};

/* ======================= ALL LOOKUPS ======================= */
const getAllLookups = async () => {
    const [rows] = await db.query(
        "CALL sp_dropdown_master(?,?,?,?)",
        ["ALL_LOOKUPS", null, null,null]
    );

    return rows[0] || [];
};

/* ======================= GENERIC DROPDOWNS ======================= */
const getDropdown = async (action, societyId = null) => {
    const [rows] = await db.query(
        "CALL sp_dropdown_master(?,?,?,?)",
        [action, null,null, societyId]
    );

    return rows[0] || [];
};

/* ======================= SOCIETY TYPE DROPDOWNS ======================= */
const getSocietyType = async () => {
    const [rows] = await db.query(
        "CALL sp_dropdown_master(?,?,?,?)",
        ["SOCIETY_TYPE", null, null,null]
    );

    return rows[0] || [];
};
/* ======================= SOCIETY DROPDOWN ======================= */
const getSocietyDropdown = async (orgId) => {
    const [rows] = await db.query(
        "CALL sp_dropdown_master(?,?,?,?)",
        ["SOCIETY", null,null, orgId] // 👈 orgId maps perfectly into your SQL parameter slots
    );

    return rows[0] || [];
};

module.exports = {
    getLookupByGroup,
    getAllLookups,
    getDropdown,
    getSocietyType,
    getSocietyDropdown
};