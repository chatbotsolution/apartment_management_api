const db = require("../config/db");

/* ======================= EXECUTE SP ======================= */
const execute = async (
    action,
    feeId = null,
    flatId = null,
    ownerId = null,
    amount = null,
    penaltyAmount = null,
    monthYear = null,
    dueDate = null,
    paidDate = null,
    statusId = null,
    paymentModeId = null,
    transactionRef = null,
    receiptNumber = null,
    notes = null,
    createdBy = null,
    updatedBy = null
) => {

    const [rows] = await db.query(
        "CALL sp_maintenance_fee(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [
            action,
            feeId,
            flatId,
            ownerId,
            amount,
            penaltyAmount,
            monthYear,
            dueDate,
            paidDate,
            statusId,
            paymentModeId,
            transactionRef,
            receiptNumber,
            notes,
            createdBy,
            updatedBy
        ]
    );

    return rows;
};

module.exports = {
    execute
};