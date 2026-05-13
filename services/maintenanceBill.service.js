const db = require("../config/db");

/* ======================= MAIN SP EXECUTION ======================= */
const execute = async (
    p_action,
    p_fee_id = null,
    p_flat_id = null,
    p_owner_id = null,
    p_amount = null,
    p_penalty_amount = null,
    p_month_year = null,
    p_due_date = null,
    p_paid_date = null,
    p_status_id = null,
    p_payment_mode_id = null,
    p_transaction_ref = null,
    p_receipt_number = null,
    p_notes = null,
    p_created_by = null,
    p_updated_by = null
) => {

    try {

        const query = `
            CALL sp_maintenance_fee(
                ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
            )
        `;

        const params = [
            p_action,
            p_fee_id,
            p_flat_id,
            p_owner_id,
            p_amount,
            p_penalty_amount,
            p_month_year,
            p_due_date,
            p_paid_date,
            p_status_id,
            p_payment_mode_id,
            p_transaction_ref,
            p_receipt_number,
            p_notes,
            p_created_by,
            p_updated_by
        ];

        console.log("SP PARAMS:", params);

        const [rows] = await db.query(query, params);

        return rows;

    } catch (error) {

        console.error(
            "Database Error in sp_maintenance_fee:",
            error
        );

        throw error;
    }
};


/* ======================= BULK MONTHLY GENERATION ======================= */
const generate = async (
    monthYear,
    dueDate,
    createdBy = 1
) => {

    try {

        const query = `
            CALL sp_generate_maintenance(?, ?, ?)
        `;

        const params = [
            monthYear,
            dueDate,
            createdBy
        ];

        console.log("GENERATE MAINTENANCE PARAMS:", params);

        const [rows] = await db.query(query, params);

        return rows;

    } catch (error) {

        console.error(
            "Database Error in sp_generate_maintenance:",
            error
        );

        throw error;
    }
};


module.exports = {
    execute,
    generate
};