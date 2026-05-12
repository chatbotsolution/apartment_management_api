const service = require("../services/parking.service");
const APIResponse = require("../utils/response");
const asyncHandler = require("../middlewares/async.middleware");


/* ======================= ASSIGN ======================= */
const assign = asyncHandler(async (req, res) => {

    const body = req.body;

    await service.execute(
        "ASSIGN",
        null,
        body.slotId,
        body.flatId,
        body.ownerId,
        body.tenantId,
        body.vehicleNumber,
        body.vehicleType,
        body.vehicleModel,
        body.vehicleColor,
        body.allotmentDate,
        body.validUntil,
        body.monthlyCharge,
        body.notes,
        1
    );

    return APIResponse.send(
        res,
        APIResponse.successResponse(null)
    );
});


/* ======================= UPDATE ======================= */
const update = asyncHandler(async (req, res) => {

    const body = req.body;

    await service.execute(
        "UPDATE",
        body.allotmentId,
        null,
        null,
        null,
        null,
        body.vehicleNumber,
        body.vehicleType,
        body.vehicleModel,
        body.vehicleColor,
        null,
        body.validUntil,
        body.monthlyCharge,
        body.notes,
        null
    );

    return APIResponse.send(
        res,
        APIResponse.successResponse(null)
    );
});


/* ======================= RELEASE ======================= */
const release = asyncHandler(async (req, res) => {

    const { allotmentId, slotId } = req.body;

    await service.execute(
        "RELEASE",
        allotmentId,
        slotId
    );

    return APIResponse.send(
        res,
        APIResponse.successResponse(null)
    );
});


/* ======================= GET BY ID ======================= */
const getById = asyncHandler(async (req, res) => {

    const id = parseInt(req.params.id);

    const data = await service.execute(
        "GET_BY_ID",
        id
    );

    return APIResponse.send(
        res,
        APIResponse.emptyOr404(data?.[0])
    );
});


/* ======================= GET ALL ======================= */
const getAll = asyncHandler(async (req, res) => {

    const data = await service.execute(
        "GET_ALL"
    );

    return APIResponse.send(
        res,
        APIResponse.emptyOr404(data?.[0])
    );
});


/* ======================= GET HISTORY BY SLOT ======================= */
const getHistoryBySlot = asyncHandler(async (req, res) => {

    const slotId = parseInt(req.query.slot_id);

    const data = await service.execute(
        "GET_HISTORY_BY_SLOT",
        null,
        slotId
    );

    return APIResponse.send(
        res,
        APIResponse.emptyOr404(data?.[0])
    );
});


module.exports = {
    assign,
    update,
    release,
    getById,
    getAll,
    getHistoryBySlot
};