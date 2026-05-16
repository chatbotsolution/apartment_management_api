const service = require("../services/maintenanceBill.service");
const APIResponse = require("../utils/response");
const asyncHandler = require("../middlewares/async.middleware");

/* ======================= GENERATE SINGLE FEE (INSERT) ======================= */
const create = asyncHandler(async (req, res) => {
    const b = req.body;

    // Use the 17-parameter array pattern to prevent misalignment
    const args = Array(17).fill(null);
    args[0] = "INSERT";                             // p_action
    args[2] = b.flat_id || b.flatId;                // p_flat_id
    args[3] = b.owner_id || b.ownerId || null;      // p_owner_id
    args[4] = b.amount;                             // p_amount
    args[5] = b.penalty_amount || b.penaltyAmount || 0; // p_penalty_amount
    args[6] = b.billing_month || b.month_year || b.monthYear; // p_month_year
    args[7] = b.due_date || b.dueDate;              // p_due_date
    args[9] = b.status_id || b.statusId || 1;       // p_status_id
    args[13] = b.remarks || b.notes || "";          // p_notes
    args[14] = b.created_by || b.createdBy || 1;    // p_created_by
    args[15] = b.updated_by || b.updatedBy || 1;    // p_updated_by
    args[16] = b.societyId || b.society_id || null; // 👉 NEW: p_society_id

    const result = await service.execute(...args);

    return APIResponse.send(res, APIResponse.successResponse("Bill generated successfully", result));
});

/* ======================= UPDATE FEE INFO ======================= */
const update = asyncHandler(async (req, res) => {
    const b = req.body;

    const args = Array(17).fill(null);
    args[0] = "UPDATE";         // p_action
    args[1] = b.feeId;          // p_fee_id
    args[4] = b.amount;         // p_amount
    args[5] = b.penaltyAmount;  // p_penalty_amount
    args[7] = b.dueDate;        // p_due_date
    args[9] = b.statusId;       // p_status_id
    args[13] = b.notes;         // p_notes
    args[15] = b.updatedBy;     // p_updated_by

    const result = await service.execute(...args);

    return APIResponse.send(res, APIResponse.successResponse("Maintenance fee updated", result));
});

/* ======================= PROCESS PAYMENT ======================= */
const pay = asyncHandler(async (req, res) => {
    const b = req.body;

    const args = Array(17).fill(null);
    args[0] = "PAY";                // p_action
    args[1] = b.feeId;              // p_fee_id
    args[8] = b.paidDate;           // p_paid_date
    args[9] = b.statusId;           // p_status_id
    args[10] = b.paymentModeId;     // p_payment_mode_id
    args[11] = b.transactionRef;    // p_transaction_ref
    args[12] = b.receiptNumber;     // p_receipt_number
    args[15] = b.updatedBy;         // p_updated_by

    const result = await service.execute(...args);

    return APIResponse.send(res, APIResponse.successResponse("Payment processed successfully", result));
});

/* ======================= GET BY ID ======================= */
const getById = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);

    if (!id) {
        return APIResponse.send(res, APIResponse.badRequestResponse("Valid feeId is required"));
    }

    const args = Array(17).fill(null);
    args[0] = "GET_BY_ID";
    args[1] = id;

    const data = await service.execute(...args);
    
    // SP result structure: [ [rows], {meta} ]
    const record = (data && data[0] && data[0][0]) ? data[0][0] : null;

    return APIResponse.send(res, APIResponse.emptyOr404(record));
});

/* ======================= GET ALL (BY FLAT / SOCIETY) ======================= */
const getAll = asyncHandler(async (req, res) => {
    // 👉 CRITICAL FIX: Sanitize string to allow "1,2" properly in MySQL
    let societyId = req.query.society_id ? req.query.society_id.toString() : null;
    if (societyId) {
        societyId = societyId.replace(/[^0-9,]/g, "");
    }

    const flatId = req.query.flatId ? parseInt(req.query.flatId) : null;

    const args = Array(17).fill(null);
    args[0] = "GET_ALL";
    args[2] = flatId;
    args[16] = societyId; // 👉 17th Parameter (Filters by Society)

    const data = await service.execute(...args);

    const list = (data && data[0]) ? data[0] : [];
    return APIResponse.send(res, APIResponse.successResponse("Maintenance fees retrieved", list));
});

/* ======================= BULK GENERATE ======================= */
const generateMonthly = asyncHandler(async (req, res) => {
    // 👉 EXTRACT societyId so we don't accidentally generate bills for other societies
    const { monthYear, dueDate, societyId, createdBy } = req.body;

    if (!monthYear || !dueDate || !societyId) {
        return APIResponse.send(res, APIResponse.badRequestResponse("Month, Due Date, and Society ID are required"));
    }

    // 👉 Passed societyId to the generate service
    const result = await service.generate(monthYear, dueDate, societyId, createdBy);

    return APIResponse.send(res, APIResponse.successResponse("Monthly maintenance generated for active flats", result));
});

module.exports = {
    create,
    update,
    pay,
    getById,
    getAll,
    generateMonthly
};