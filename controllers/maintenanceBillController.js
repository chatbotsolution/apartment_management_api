const service = require("../services/maintenanceBill.service");
const APIResponse = require("../utils/response");
const asyncHandler = require("../middlewares/async.middleware");

/* ======================= GENERATE SINGLE FEE (INSERT) ======================= */
const create = asyncHandler(async (req, res) => {
    const b = req.body;

    console.log("=== INCOMING BILL DATA ===", b);

    // EXACTLY 16 PARAMETERS mapped to match your console output
    const result = await service.execute(
        "INSERT",                               // 1. p_action
        null,                                   // 2. p_fee_id
        b.flat_id || b.flatId,                  // 3. p_flat_id
        b.owner_id || b.ownerId || null,        // 4. p_owner_id
        b.amount,                               // 5. p_amount
        b.penalty_amount || b.penaltyAmount || 0, // 6. p_penalty_amount
        b.billing_month || b.month_year || b.monthYear, // 7. p_month_year
        b.due_date || b.dueDate,                // 8. p_due_date
        null,                                   // 9. p_paid_date
        b.status_id || b.statusId || 1,         // 10. p_status_id
        null,                                   // 11. p_payment_mode_id
        null,                                   // 12. p_transaction_ref
        null,                                   // 13. p_receipt_number
        b.remarks || b.notes || "",             // 14. p_notes
        b.created_by || b.createdBy || 1,       // 15. p_created_by
        b.updated_by || b.updatedBy || 1        // 16. p_updated_by
    );

    return APIResponse.send(res, APIResponse.successResponse("Bill generated successfully", result));
});

/* ======================= UPDATE FEE INFO ======================= */
const update = asyncHandler(async (req, res) => {
    const b = req.body;

    const result = await service.execute(
        "UPDATE",
        b.feeId,        // p_fee_id
        null,           // p_flat_id
        null,           // p_owner_id
        b.amount,       // p_amount
        b.penaltyAmount,// p_penalty_amount
        null,           // p_month_year
        b.dueDate,      // p_due_date
        null,           // p_paid_date
        b.statusId,     // p_status_id
        null,           // p_payment_mode_id
        null,           // p_transaction_ref
        null,           // p_receipt_number
        b.notes,        // p_notes
        null,           // p_created_by
        b.updatedBy     // p_updated_by
    );

    return APIResponse.send(res,
        APIResponse.successResponse("Maintenance fee updated", result)
    );
});

/* ======================= PROCESS PAYMENT ======================= */
const pay = asyncHandler(async (req, res) => {
    const b = req.body;

    const result = await service.execute(
        "PAY",
        b.feeId,            // p_fee_id
        null,               // p_flat_id
        null,               // p_owner_id
        null,               // p_amount
        null,               // p_penalty_amount
        null,               // p_month_year
        null,               // p_due_date
        b.paidDate,         // p_paid_date
        b.statusId,         // p_status_id
        b.paymentModeId,    // p_payment_mode_id
        b.transactionRef,   // p_transaction_ref
        b.receiptNumber,    // p_receipt_number
        null,               // p_notes
        null,               // p_created_by
        b.updatedBy         // p_updated_by
    );

    return APIResponse.send(res,
        APIResponse.successResponse("Payment processed successfully", result)
    );
});

/* ======================= GET BY ID ======================= */
const getById = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);

    if (!id) {
        return APIResponse.send(res, APIResponse.badRequestResponse("Valid feeId is required"));
    }

    const data = await service.execute("GET_BY_ID", id);
    
    // SP result structure: [ [rows], {meta} ]
    const record = (data && data[0] && data[0][0]) ? data[0][0] : null;

    return APIResponse.send(res, APIResponse.emptyOr404(record));
});

/* ======================= GET ALL (BY FLAT) ======================= */
const getAll = asyncHandler(async (req, res) => {
    // If flatId isn't provided, default it to 0
    const flatId = req.query.flatId ? parseInt(req.query.flatId) : 0;

    // Call service with the flatId (0 means fetch all)
    const data = await service.execute("GET_ALL", null, flatId);

    // SP returns [ [rows], {metadata} ]
    const list = (data && data[0]) ? data[0] : [];

    return APIResponse.send(res,
        APIResponse.successResponse("Maintenance fees retrieved", list)
    );
});

/* ======================= BULK GENERATE ======================= */
const generateMonthly = asyncHandler(async (req, res) => {
    const { monthYear, dueDate, createdBy } = req.body;

    if (!monthYear || !dueDate) {
        return APIResponse.send(res, APIResponse.badRequestResponse("Month and Due Date are required"));
    }

    // This calls the other service function 'generate' which triggers sp_generate_maintenance
    const result = await service.generate(monthYear, dueDate, createdBy);

    return APIResponse.send(res,
        APIResponse.successResponse("Monthly maintenance generated for all flats", result)
    );
});

module.exports = {
    create,
    update,
    pay,
    getById,
    getAll,
    generateMonthly
};