const db = require("../config/db");

/* ======================= CHECK-IN ======================= */
const checkInVisitor = async (data) => {
    return await db.query(
        "CALL sp_visitor(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
            "CHECKIN",
            0,
            data.host_flat_id,
            data.visitor_name,
            data.visitor_phone,
            data.vehicle_number,
            data.vehicle_type,
            data.purpose,
            data.expected_checkout,
            data.id_proof_type_id,
            data.id_proof_number,
            data.approved_by,
            data.entry_status_id,
            data.visitor_type_id,
            data.notes,
            data.created_by,
            data.society_id
        ]
    );
};

/* ======================= CHECK-OUT ======================= */
const checkOutVisitor = async (data) => {
    return await db.query(
        "CALL sp_visitor(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
            "CHECKOUT",
            data.visitor_id,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            data.entry_status_id,
            null,
            null,
            null,
            data.society_id
        ]
    );
};

/* ======================= UPDATE ======================= */
const updateVisitor = async (data) => {
    return await db.query(
        "CALL sp_visitor(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
            "UPDATE",
            data.visitor_id,
            data.host_flat_id,
            data.visitor_name,
            data.visitor_phone,
            data.vehicle_number,
            data.vehicle_type,
            data.purpose,
            data.expected_checkout,
            data.id_proof_type_id,
            data.id_proof_number,
            data.approved_by,
            data.entry_status_id,
            data.visitor_type_id,
            data.notes,
            data.created_by,
            data.society_id
        ]
    );
};

/* ======================= GET BY ID ======================= */
const getVisitorById = async (visitor_id) => {
    return await db.query(
        "CALL sp_visitor(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
            "GET_BY_ID",
            visitor_id,
            null, null, null, null, null, null,
            null, null, null, null, null, null, null, null, null
        ]
    );
};

/* ======================= GET TODAY ======================= */
const getTodayVisitors = async (society_id) => {
    return await db.query(
        "CALL sp_visitor(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
            "GET_TODAY",
            null,
            null, null, null, null, null, null,
            null, null, null, null, null, null, null, null,
            society_id // Handled by FIND_IN_SET in SP
        ]
    );
};

/* ======================= GET ACTIVE ======================= */
const getActiveVisitors = async (society_id) => {
    return await db.query(
        "CALL sp_visitor(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
            "GET_ACTIVE",
            null,
            null, null, null, null, null, null,
            null, null, null, null, null, null, null, null,
            society_id // Handled by FIND_IN_SET in SP
        ]
    );
};

/* ======================= HISTORY BY FLAT ======================= */
const getVisitorHistoryByFlat = async (flat_id, society_id) => {
    return await db.query(
        "CALL sp_visitor(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
            "GET_HISTORY_BY_FLAT",
            null,
            flat_id, // Assigned to p_host_flat_id
            null, null, null, null, null,
            null, null, null, null, null, null, null, null, 
            society_id // Passed cleanly as a string ("1"), comma string ("1,2,3"), or null
        ]
    );
};

/* ======================= SEARCH ======================= */
const searchVisitors = async (data) => {
    return await db.query(
        "CALL sp_visitor(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
            "SEARCH",
            null,
            null,
            data.search_text,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            data.society_id
        ]
    );
};

/* ======================= VISITOR ENTRY STATUS ======================= */
/**
 * Fetch visitor entry status dropdown
 * Calls sp_dropdown_master with LOOKUP_BY_GROUP action
 * @returns {Array} List of visitor entry statuses
 */
const getVisitorEntryStatus = async () => {
    const [rows] = await db.query(
        "CALL sp_dropdown_master(?,?,?)",
        ["LOOKUP_BY_GROUP", "visitor_entry_status", null]
    );

    return rows[0] || [];
};

/* ======================= VISITOR TYPE ======================= */
/**
 * Fetch visitor type dropdown
 * Calls sp_dropdown_master with LOOKUP_BY_GROUP action
 * @returns {Array} List of visitor types
 */
const getVisitorType = async () => {
    const [rows] = await db.query(
        "CALL sp_dropdown_master(?,?,?)",
        ["LOOKUP_BY_GROUP", "visitor_type", null]
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