const service = require("../services/maintenanceRequest.service.js");
const APIResponse = require("../utils/response");
const asyncHandler = require("../middlewares/async.middleware");

/* ======================= CREATE REQUEST ======================= */
const create = asyncHandler(async (req, res) => {
    const b = req.body;

    // DEBUGGING: This will print to your terminal so you can see if flatId is miss

    // EXACTLY 16 PARAMETERS - Do not add or remove any!
    const result = await service.execute(
        "INSERT",           // 1. p_action (MUST BE EXACTLY "INSERT")
        null,               // 2. p_fee_id
        b.flatId,           // 3. p_flat_id
        b.ownerId || null,  // 4. p_owner_id
        b.amount,           // 5. p_amount
        b.penaltyAmount || 0, // 6. p_penalty_amount
        b.monthYear,        // 7. p_month_year
        b.dueDate,          // 8. p_due_date
        null,               // 9. p_paid_date
        b.statusId || 1,    // 10. p_status_id
        null,               // 11. p_payment_mode_id
        null,               // 12. p_transaction_ref
        null,               // 13. p_receipt_number
        b.notes || "",      // 14. p_notes
        b.createdBy || 1,   // 15. p_created_by
        b.updatedBy || 1    // 16. p_updated_by
    );

    return APIResponse.send(res, APIResponse.successResponse("Bill generated successfully", result));
});

/* ======================= UPDATE BASIC INFO ======================= */
const update = asyncHandler(async (req, res) => {
    const b = req.body;

    const result = await service.execute(
        "UPDATE",
        b.requestId,        // p_request_id
        null,               // p_flat_id
        null,               // p_owner_id
        null,               // p_tenant_id
        b.title,            // p_title
        b.description,      // p_description
        b.categoryId,       // p_category_id
        b.priorityId,       // p_priority_id
        b.statusId,         // p_status_id
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        b.beforePhotoUrl,
        null
    );

    return APIResponse.send(res, APIResponse.successResponse("Maintenance request updated", result));
});

/* ======================= ASSIGN STAFF ======================= */
const assign = asyncHandler(async (req, res) => {
    const b = req.body;

    const result = await service.execute(
        "ASSIGN",
        b.requestId,        // p_request_id
        null, null, null, null, null, null, null,
        b.statusId,         // p_status_id
        b.assignedStaffId,  // p_assigned_staff_id
        b.scheduledAt,      // p_scheduled_at
        null, null, null, null, null, null, null // Fill remaining to reach 19
    );

    return APIResponse.send(res, APIResponse.successResponse("Staff assigned", result));
});

/* ======================= COMPLETE REQUEST ======================= */
const complete = asyncHandler(async (req, res) => {
    const b = req.body;

    const result = await service.execute(
        "COMPLETE",
        b.requestId,        // p_request_id
        null, null, null, null, null, null, null,
        b.statusId,         // p_status_id
        null,               // p_assigned_staff_id
        null,               // p_scheduled_at
        b.completedAt,      // p_completed_at (Stored Procedure uses NOW() if null)
        null,               // p_estimated_cost
        b.actualCost,       // p_actual_cost
        b.costBorneById,    // p_cost_borne_by_id
        b.remarks,          // p_remarks
        null,               // p_before_photo_url
        b.afterPhotoUrl     // p_after_photo_url
    );

    return APIResponse.send(res, APIResponse.successResponse("Request completed", result));
});

/* ======================= GET BY ID ======================= */
const getById = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);

    const data = await service.execute("GET_BY_ID", id);
    
    // Extracting single record from SP result [ [rows], meta ]
    const record = (data && data[0] && data[0][0]) ? data[0][0] : null;

    return APIResponse.send(res, APIResponse.emptyOr404(record));
});

/* ======================= GET ALL ======================= */
const getAll = asyncHandler(async (req, res) => {
    // Note: p_request_id is 2nd parameter, action is 1st.
    const data = await service.execute("GET_ALL", null);

    return APIResponse.send(res, APIResponse.successResponse("Maintenance requests", data?.[0] || []));
});

module.exports = {
    create,
    update,
    assign,
    complete,
    getById,
    getAll
};