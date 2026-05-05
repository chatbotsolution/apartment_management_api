const parkingService = require("../services/parking.service");
const APIResponse = require("../utils/response");
const asyncHandler = require("../middlewares/async.middleware");

/* ======================= ASSIGN ======================= */
const assign = asyncHandler(async (req, res) => {
    const {
        slotId,
        flatId,
        ownerId,
        tenantId,
        vehicleNumber,
        vehicleType,
        vehicleModel,
        vehicleColor,
        allotmentDate,
        validUntil,
        monthlyCharge,
        notes
    } = req.body;

    const result = await service.execute(
        "ASSIGN",
        null,
        slotId,
        flatId,
        ownerId,
        tenantId,
        vehicleNumber,
        vehicleType,
        vehicleModel,
        vehicleColor,
        allotmentDate,
        validUntil,
        monthlyCharge,
        notes,
        1
    );

    return APIResponse.send(res, APIResponse.successResponse("Parking assigned successfully", result));
});


/* ======================= UPDATE ======================= */
const update = asyncHandler(async (req, res) => {
    const {
        allotmentId,
        vehicleNumber,
        vehicleType,
        vehicleModel,
        vehicleColor,
        validUntil,
        monthlyCharge,
        notes
    } = req.body;

    const result = await service.execute(
        "UPDATE",
        allotmentId,
        null,
        null,
        null,
        null,
        vehicleNumber,
        vehicleType,
        vehicleModel,
        vehicleColor,
        null,
        validUntil,
        monthlyCharge,
        notes,
        null
    );

    return APIResponse.send(res, APIResponse.successResponse("Updated successfully", result));
});


/* ======================= RELEASE ======================= */
const release = asyncHandler(async (req, res) => {
    const { allotmentId, slotId } = req.body;

    const result = await service.execute(
        "RELEASE",
        allotmentId,
        slotId
    );

    return APIResponse.send(res, APIResponse.successResponse("Slot released successfully", result));
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

    return APIResponse.send(res, APIResponse.successResponse("Fetched successfully", data?.[0]));
});


/* ======================= GET HISTORY BY SLOT ======================= */
const getHistoryBySlot = asyncHandler(async (req, res) => {
    const slotId = parseInt(req.query.slot_id);

    const data = await service.execute("GET_HISTORY_BY_SLOT", null, slotId);

    return APIResponse.send(res, APIResponse.successResponse("History fetched", data?.[0]));
});


module.exports = {
    assign,
    update,
    release,
    getById,
    getAll,
    getHistoryBySlot
};