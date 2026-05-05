const service = require("../services/parkingSlot.service");
const APIResponse = require("../utils/response");
const asyncHandler = require("../middlewares/async.middleware");


/* ======================= INSERT ======================= */
const insert = asyncHandler(async (req, res) => {
    const {
        societyId,
        slotNumber,
        level,
        slotTypeId,
        isCovered,
        hasCharger,
        statusId,
        monthlyCharge,
        notes
    } = req.body;

    const result = await service.execute(
        "INSERT",
        null,
        societyId,
        slotNumber,
        level,
        slotTypeId,
        isCovered,
        hasCharger,
        statusId,
        monthlyCharge,
        notes
    );

    return APIResponse.send(res, APIResponse.successResponse("Slot created successfully", result));
});


/* ======================= UPDATE ======================= */
const update = asyncHandler(async (req, res) => {
    const {
        slotId,
        societyId,
        slotNumber,
        level,
        slotTypeId,
        isCovered,
        hasCharger,
        statusId,
        monthlyCharge,
        notes
    } = req.body;

    const result = await service.execute(
        "UPDATE",
        slotId,
        societyId,
        slotNumber,
        level,
        slotTypeId,
        isCovered,
        hasCharger,
        statusId,
        monthlyCharge,
        notes
    );

    return APIResponse.send(res, APIResponse.successResponse("Slot updated successfully", result));
});


/* ======================= DELETE (SOFT) ======================= */
const remove = asyncHandler(async (req, res) => {
    const { slotId, statusId } = req.body;

    const result = await service.execute(
        "DELETE",
        slotId,
        null,
        null,
        null,
        null,
        null,
        null,
        statusId
    );

    return APIResponse.send(res, APIResponse.successResponse("Slot status updated", result));
});


/* ======================= GET BY ID ======================= */
const getById = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);

    const data = await service.execute("GET_BY_ID", id);

    return APIResponse.send(res, APIResponse.emptyOr404(data?.[0]));
});


/* ======================= GET ALL ======================= */
const getAll = asyncHandler(async (req, res) => {
    const societyId = parseInt(req.query.society_id);

    const data = await service.execute("GET_ALL", null, societyId);

    return APIResponse.send(res, APIResponse.successResponse("Fetched successfully", data?.[0]));
});


/* ======================= GET AVAILABLE ======================= */
const getAvailable = asyncHandler(async (req, res) => {
    const societyId = parseInt(req.query.society_id);

    const data = await service.execute("GET_AVAILABLE", null, societyId);

    return APIResponse.send(res, APIResponse.successResponse("Available slots fetched", data?.[0]));
});


module.exports = {
    insert,
    update,
    remove,
    getById,
    getAll,
    getAvailable
};