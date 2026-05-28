const db = require("../config/db");

/* ======================= CHECK-IN ======================= */
const checkInVisitor = async (data) => {
    return await db.query(
        "CALL sp_visitor(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
            "CHECKIN", 0, data.host_flat_id, data.visitor_name, data.visitor_phone,
            data.vehicle_number, data.vehicle_type, data.purpose, data.expected_checkout,
            data.id_proof_type_id, data.id_proof_number, data.approved_by,
            data.entry_status_id, data.visitor_type_id, data.notes,
            data.created_by, data.society_id, null
        ]
    );
};

/* ======================= CHECK-OUT ======================= */
const checkOutVisitor = async (data) => {
    return await db.query(
        "CALL sp_visitor(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
            "CHECKOUT", data.visitor_id, null, null, null, null, null, null, null,
            null, null, null, data.entry_status_id, null, null, null,
            data.society_id, null
        ]
    );
};

/* ======================= UPDATE ======================= */
const updateVisitor = async (data) => {
    return await db.query(
        "CALL sp_visitor(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
            "UPDATE", data.visitor_id, data.host_flat_id, data.visitor_name, data.visitor_phone,
            data.vehicle_number, data.vehicle_type, data.purpose, data.expected_checkout,
            data.id_proof_type_id, data.id_proof_number, data.approved_by,
            data.entry_status_id, data.visitor_type_id, data.notes,
            data.created_by, data.society_id, null
        ]
    );
};

/* ======================= GET BY ID ======================= */
const getVisitorById = async (visitor_id) => {
    return await db.query(
        "CALL sp_visitor(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
            "GET_BY_ID", visitor_id,
            null, null, null, null, null, null,
            null, null, null, null, null, null, null, null, null, null
        ]
    );
};

/* ======================= GET TODAY ======================= */
const getTodayVisitors = async (society_id, org_id) => {
    return await db.query(
        "CALL sp_visitor(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
            "GET_TODAY", null,
            null, null, null, null, null, null,
            null, null, null, null, null, null, null, null,
            society_id, org_id
        ]
    );
};

/* ======================= GET ACTIVE ======================= */
const getActiveVisitors = async (society_id, org_id) => {
    return await db.query(
        "CALL sp_visitor(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
            "GET_ACTIVE", null,
            null, null, null, null, null, null,
            null, null, null, null, null, null, null, null,
            society_id, org_id
        ]
    );
};

/* ======================= HISTORY BY FLAT ======================= */
const getVisitorHistoryByFlat = async (flat_id, society_id, org_id) => {
    return await db.query(
        "CALL sp_visitor(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
            "GET_HISTORY_BY_FLAT", null,
            flat_id,
            null, null, null, null, null,
            null, null, null, null, null, null, null, null,
            society_id, org_id
        ]
    );
};

/* ======================= SEARCH ======================= */
const searchVisitors = async (data) => {
    return await db.query(
        "CALL sp_visitor(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
            "SEARCH", null, null,
            data.search_text,
            null, null, null, null, null,
            null, null, null, null, null, null, null,
            data.society_id ?? null,
            data.org_id ?? null
        ]
    );
};

/* ======================= VISITOR ENTRY STATUS ======================= */
const getVisitorEntryStatus = async () => {
    const [rows] = await db.query(
        "CALL sp_dropdown_master(?,?,?,?)",
        ["LOOKUP_BY_GROUP", "visitor_entry_status", null, null]
    );
    return rows[0] || [];
};

/* ======================= VISITOR TYPE ======================= */
const getVisitorType = async () => {
    const [rows] = await db.query(
        "CALL sp_dropdown_master(?,?,?,?)",
        ["LOOKUP_BY_GROUP", "visitor_type", null, null]
    );
    return rows[0] || [];
};

module.exports = {
    checkInVisitor,
    checkOutVisitor,
    updateVisitor,
    getVisitorById,
    getTodayVisitors,
    getActiveVisitors,
    getVisitorHistoryByFlat,
    searchVisitors,
    getVisitorEntryStatus,
    getVisitorType
};