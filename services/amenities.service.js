const db = require("../config/db");

/* ======================= GET ALL ======================= */
const getAll = async (societyId) => {
    const [rows] = await db.query(
        "CALL sp_amenity('GET_ALL', NULL, ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)",
        [societyId]
    );
    return rows[0];
};


/* ======================= GET BY ID ======================= */
const getById = async (id, societyId) => {
    const [rows] = await db.query(
        "CALL sp_amenity('GET_BY_ID', ?, ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)",
        [id, societyId]
    );
    return rows[0];
};


/* ======================= CREATE ======================= */
const create = async (data) => {
    const {
        society_id,
        name,
        category,
        description,
        location,
        capacity,
        open_time,
        close_time,
        is_bookable,
        booking_fee,
        advance_booking_days,
        is_active,
        contact_person,
        contact_phone
    } = data;

    const [rows] = await db.query(
        `CALL sp_amenity(
            'INSERT', NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
        )`,
        [
            society_id,
            name,
            category,
            description,
            location,
            capacity,
            open_time,
            close_time,
            is_bookable,
            booking_fee,
            advance_booking_days,
            is_active ?? 1,
            contact_person,
            contact_phone
        ]
    );

    return rows[0][0];
};


/* ======================= UPDATE ======================= */
const update = async (data) => {
    const {
        amenity_id,
        society_id,
        name,
        category,
        description,
        location,
        capacity,
        open_time,
        close_time,
        is_bookable,
        booking_fee,
        advance_booking_days,
        is_active,
        contact_person,
        contact_phone
    } = data;

    const [rows] = await db.query(
        `CALL sp_amenity(
            'UPDATE', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
        )`,
        [
            amenity_id,
            society_id,
            name,
            category,
            description,
            location,
            capacity,
            open_time,
            close_time,
            is_bookable,
            booking_fee,
            advance_booking_days,
            is_active,
            contact_person,
            contact_phone
        ]
    );

    return rows[0][0];
};


/* ======================= DELETE ======================= */
const remove = async (amenity_id, society_id) => {
    const [rows] = await db.query(
        "CALL sp_amenity('DELETE', ?, ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)",
        [amenity_id, society_id]
    );
    return rows[0][0];
};


module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};