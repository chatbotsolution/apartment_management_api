const db = require("../config/db");

/* ======================= GET ALL ======================= */
const getAll = async () => {
    const [rows] = await db.query(
        "CALL sp_amenity_booking('GET_ALL', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)"
    );
    return rows[0];
};


/* ======================= GET BY ID ======================= */
const getById = async (id) => {
    const [rows] = await db.query(
        "CALL sp_amenity_booking('GET_BY_ID', ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)",
        [id]
    );
    return rows[0];
};


/* ======================= CREATE BOOKING ======================= */
const create = async (data) => {
    const {
        amenity_id,
        flat_id,
        owner_id,
        tenant_id,
        booking_date,
        start_time,
        end_time,
        purpose,
        expected_guests,
        status_id,
        amount_paid,
        payment_mode_id
    } = data;

    const [rows] = await db.query(
        "CALL sp_amenity_booking('INSERT', NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NULL)",
        [
            amenity_id,
            flat_id,
            owner_id,
            tenant_id,
            booking_date,
            start_time,
            end_time,
            purpose,
            expected_guests,
            status_id,
            amount_paid,
            payment_mode_id
        ]
    );

    return rows[0]?.[0] || { message: "Booking failed" };
};


/* ======================= UPDATE ======================= */
const update = async (data) => {
    const {
        booking_id,
        booking_date,
        start_time,
        end_time,
        purpose,
        expected_guests,
        status_id,
        amount_paid,
        payment_mode_id
    } = data;

    const [rows] = await db.query(
        "CALL sp_amenity_booking('UPDATE', ?, NULL, NULL, NULL, NULL, ?, ?, ?, ?, ?, ?, ?, ?, NULL)",
        [
            booking_id,
            booking_date,
            start_time,
            end_time,
            purpose,
            expected_guests,
            status_id,
            amount_paid,
            payment_mode_id
        ]
    );

    return rows[0]?.[0] || { message: "Update failed" };
};


/* ======================= CANCEL ======================= */
const cancel = async (data) => {
    const { booking_id, status_id, cancellation_reason } = data;

    const [rows] = await db.query(
        "CALL sp_amenity_booking('CANCEL', ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, ?, NULL, NULL, ?)",
        [
            booking_id,
            status_id,
            cancellation_reason
        ]
    );

    return rows[0]?.[0] || { message: "Cancel failed" };
};


module.exports = {
    getAll,
    getById,
    create,
    update,
    cancel
};