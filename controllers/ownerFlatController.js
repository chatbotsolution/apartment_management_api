const service = require("../services/ownerFlat.service");
const APIResponse = require("../utils/response");
const asyncHandler = require("../middlewares/async.middleware");


/* ======================= ASSIGN ======================= */
const assign = asyncHandler(async (req, res) => {
    const {
        ownerId,
        flatId,
        ownershipTypeId,
        ownershipFrom,
        isResiding
    } = req.body;

    const result = await service.execute(
        "ASSIGN",
        null,
        ownerId,
        flatId,
        ownershipTypeId,
        ownershipFrom,
        null,
        isResiding
    );

    return APIResponse.send(res, APIResponse.successResponse("Assigned successfully", result));
});


/* ======================= UPDATE ======================= */
const update = asyncHandler(async (req, res) => {
    const {
        ownerFlatId,
        ownerId,
        flatId,
        ownershipTypeId,
        ownershipFrom,
        ownershipTo,
        isResiding
    } = req.body;

    const result = await service.execute(
        "UPDATE",
        ownerFlatId,
        ownerId,
        flatId,
        ownershipTypeId,
        ownershipFrom,
        ownershipTo,
        isResiding
    );

    return APIResponse.send(res, APIResponse.successResponse("Updated successfully", result));
});


/* ======================= TRANSFER ======================= */
const transfer = asyncHandler(async (req, res) => {
    const {
        ownerId,
        flatId,
        ownershipTypeId,
        isResiding
    } = req.body;

    const result = await service.execute(
        "TRANSFER",
        null,
        ownerId,
        flatId,
        ownershipTypeId,
        null,
        null,
        isResiding
    );

    return APIResponse.send(res, APIResponse.successResponse("Transferred successfully", result));
});


/* ======================= GET CURRENT BY FLAT ======================= */
const getCurrentByFlat = asyncHandler(async (req, res) => {
    const flatId = parseInt(req.query.flat_id);

    const data = await service.execute(
        "GET_CURRENT_BY_FLAT",
        null,
        null,
        flatId
    );

    return APIResponse.send(res, APIResponse.emptyOr404(data?.[0]));
});


/* ======================= GET HISTORY BY FLAT ======================= */
const getHistoryByFlat = asyncHandler(async (req, res) => {
    const flatId = parseInt(req.query.flat_id);

    const data = await service.execute(
        "GET_HISTORY_BY_FLAT",
        null,
        null,
        flatId
    );

    return APIResponse.send(res, APIResponse.successResponse("History fetched", data?.[0]));
});


/* ======================= GET BY OWNER ======================= */
const getByOwner = asyncHandler(async (req, res) => {
    const ownerId = parseInt(req.query.owner_id);

    const data = await service.execute(
        "GET_BY_OWNER",
        null,
        ownerId,
        null
    );

    return APIResponse.send(res, APIResponse.successResponse("Fetched successfully", data?.[0]));
});


module.exports = {
    assign,
    update,
    transfer,
    getCurrentByFlat,
    getHistoryByFlat,
    getByOwner
};