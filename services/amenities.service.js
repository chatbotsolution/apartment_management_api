const db = require("../config/db");

/**
 * HELPER: Stored Procedures can return metadata (affectedRows, insertId) 
 * wrapped in different array structures depending on the execution type.
 * This function safely extracts the ResultSetHeader object.
 */
const extractMetadata = (result) => {
    if (!result) return {};
    // If result is already the target object
    if (result.affectedRows !== undefined || result.insertId !== undefined) {
        return result;
    }
    // If result is an array, flatten and find the metadata object
    if (Array.isArray(result)) {
        const header = result.flat().find(r => r && (r.affectedRows !== undefined || r.insertId !== undefined));
        return header || {};
    }
    return {};
};

/* ======================= GET ALL ======================= */
const getAll = async (societyId) => {
    // Keep as a string format to seamlessly protect your comma-delimited parameters
    const safeSocietyId = societyId ? String(societyId) : null;
    
    const [rows] = await db.query(
        "CALL sp_amenity('GET_ALL', NULL, ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)",
        [safeSocietyId]
    );
    
    // Returns the data table array payload extracted from the database procedure row context
    return rows[0] || [];
};

/* ======================= GET BY ID ======================= */
const getById = async (id, societyId) => {
    const safeSocietyId = societyId ? parseInt(societyId) : null;
    const [rows] = await db.query(
        "CALL sp_amenity('GET_BY_ID', ?, ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)",
        [id, safeSocietyId]
    );
    // Returns the single amenity object (or undefined if not found)
    return rows[0][0]; 
};

/* ======================= CREATE ======================= */
const create = async (data) => {
    const {
        society_id, name, category, description, location,
        capacity, open_time, close_time, is_bookable, booking_fee,
        advance_booking_days, is_active, contact_person, contact_phone
    } = data;

    const [result] = await db.query(
        `CALL sp_amenity(
            'INSERT', NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
        )`,
        [
            society_id, name, category, description, location,
            capacity, open_time, close_time, is_bookable, booking_fee,
            advance_booking_days, is_active ?? 1, contact_person, contact_phone
        ]
    );

    // Safely extract the insertId
    const meta = extractMetadata(result);
    return meta.insertId ? { insertId: meta.insertId } : { success: true };
};

/* ======================= UPDATE ======================= */
const update = async (data) => {
    const {
        amenity_id, society_id, name, category, description, location,
        capacity, open_time, close_time, is_bookable, booking_fee,
        advance_booking_days, is_active, contact_person, contact_phone
    } = data;

    const [result] = await db.query(
        `CALL sp_amenity(
            'UPDATE', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
        )`,
        [
            amenity_id, society_id, name, category, description, location,
            capacity, open_time, close_time, is_bookable, booking_fee,
            advance_booking_days, is_active, contact_person, contact_phone
        ]
    );

    // Safely extract affectedRows
    const meta = extractMetadata(result);
    return meta.affectedRows > 0;
};

/* ======================= DELETE ======================= */
const remove = async (amenity_id, society_id) => {
    const [result] = await db.query(
        "CALL sp_amenity('DELETE', ?, ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)",
        [amenity_id, society_id]
    );
    
    // Safely extract affectedRows
    const meta = extractMetadata(result);
    return meta.affectedRows > 0;
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};