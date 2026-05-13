const db = require("../config/db"); // Adjust path if necessary

const execute = async (
    p_action, p_fee_id, p_flat_id, p_owner_id, p_amount, p_penalty_amount,
    p_month_year, p_due_date, p_paid_date, p_status_id, p_payment_mode_id,
    p_transaction_ref, p_receipt_number, p_notes, p_created_by, p_updated_by
) => {
    try {
        // We MUST have exactly 16 question marks to match the Stored Procedure
        const query = `CALL sp_maintenance_fee(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        
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

        // DEBUGGING: Print exactly what is going to MySQL
        console.log("SENDING TO MYSQL:", params);

        const [rows] = await db.query(query, params);
        return rows;
    } catch (error) {
        console.error("Database Error in sp_maintenance_fee:", error);
        throw error;
    }
};

module.exports = {
    execute
};