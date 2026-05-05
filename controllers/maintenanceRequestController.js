const service = require("../services/maintenanceRequest.service");
const APIResponse = require("../utils/response");
const asyncHandler = require("../middlewares/async.middleware");


/* ======================= CREATE REQUEST ======================= */
const create = asyncHandler(async (req, res) => {
    const b = req.body;

    const result = await service.execute(
        "INSERT",
        null,
        b.flatId,
        b.ownerId,
        b.tenantId,
        b.title,
        b.description,
        b.categoryId,
        b.priorityId,
        b.statusId,
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

    return APIResponse.send(
        res,
        APIResponse.successResponse("Maintenance request created", result)
    );
});


/* ======================= UPDATE ======================= */
const update = asyncHandler(async (req, res) => {
    const b = req.body;

    const result = await service.execute(
        "UPDATE",
        b.requestId,
        null,
        null,
        null,
        b.title,
        b.description,
        b.categoryId,
        b.priorityId,
        b.statusId,
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

    return APIResponse.send(
        res,
        APIResponse.successResponse("Maintenance request updated", result)
    );
});


/* ======================= ASSIGN STAFF ======================= */
const assign = asyncHandler(async (req, res) => {
    const b = req.body;

    const result = await service.execute(
        "ASSIGN",
        b.requestId,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        b.statusId,
        b.assignedStaffId,
        b.scheduledAt
    );

    return APIResponse.send(
        res,
        APIResponse.successResponse("Staff assigned", result)
    );
});


/* ======================= COMPLETE REQUEST ======================= */
const complete = asyncHandler(async (req, res) => {
    const b = req.body;

    const result = await service.execute(
        "COMPLETE",
        b.requestId,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        b.statusId,
        null,
        null,
        b.completedAt,
        null,
        b.actualCost,
        b.costBorneById,
        b.remarks,
        null,
        b.afterPhotoUrl
    );

    return APIResponse.send(
        res,
        APIResponse.successResponse("Request completed", result)
    );
});


/* ======================= GET BY ID ======================= */
const getById = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);

    const data = await service.execute("GET_BY_ID", id);

    return APIResponse.send(res, APIResponse.emptyOr404(data?.[0]));
});


/* ======================= GET ALL ======================= */
const getAll = asyncHandler(async (req, res) => {

    const data = await service.execute("GET_ALL");

    return APIResponse.send(
        res,
        APIResponse.successResponse("Maintenance requests", data?.[0])
    );
});


module.exports = {
    create,
    update,
    assign,
    complete,
    getById,
    getAll
};