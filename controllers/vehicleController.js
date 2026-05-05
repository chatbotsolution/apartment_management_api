const service = require("../services/vehicle.service");
const APIResponse = require("../utils/response");
const asyncHandler = require("../middlewares/async.middleware");


/* ======================= INSERT ======================= */
const insert = asyncHandler(async (req, res) => {
    const b = req.body;

    const result = await service.execute(
        "INSERT",
        null,
        b.flatId,
        b.ownerId,
        b.tenantId,
        b.vehicleNumber,
        b.vehicleTypeId,
        b.vehicleModel,
        b.vehicleBrand,
        b.vehicleColor,
        b.yearOfPurchase,
        b.insuranceExpiry,
        b.rcUrl,
        b.isActive,
        b.societyId
    );

    return APIResponse.send(res, APIResponse.successResponse("Vehicle added", result));
});


/* ======================= UPDATE ======================= */
const update = asyncHandler(async (req, res) => {
    const b = req.body;

    const result = await service.execute(
        "UPDATE",
        b.vehicleId,
        b.flatId,
        b.ownerId,
        b.tenantId,
        b.vehicleNumber,
        b.vehicleTypeId,
        b.vehicleModel,
        b.vehicleBrand,
        b.vehicleColor,
        b.yearOfPurchase,
        b.insuranceExpiry,
        b.rcUrl,
        b.isActive,
        b.societyId
    );

    return APIResponse.send(res, APIResponse.successResponse("Vehicle updated", result));
});


/* ======================= DELETE ======================= */
const remove = asyncHandler(async (req, res) => {
    const { vehicleId } = req.body;

    const result = await service.execute("DELETE", vehicleId);

    return APIResponse.send(res, APIResponse.successResponse("Vehicle deactivated", result));
});


/* ======================= GET BY ID ======================= */
const getById = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const societyId = parseInt(req.query.societyId);

    const data = await service.execute("GET_BY_ID", id, null, null, null, null, null, null, null, null, null, null, null, null, societyId);

    return APIResponse.send(res, APIResponse.emptyOr404(data?.[0]));
});


/* ======================= GET ALL ======================= */
const getAll = asyncHandler(async (req, res) => {
    const societyId = parseInt(req.query.societyId);

    const data = await service.execute("GET_ALL", null, null, null, null, null, null, null, null, null, null, null, null, null, societyId);

    return APIResponse.send(res, APIResponse.successResponse("Fetched vehicles", data?.[0]));
});


/* ======================= SEARCH ======================= */
const search = asyncHandler(async (req, res) => {
    const societyId = parseInt(req.query.societyId);
    const keyword = req.query.keyword || "";

    const data = await service.execute(
        "SEARCH",
        null,
        null,
        null,
        null,
        keyword,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        societyId
    );

    return APIResponse.send(res, APIResponse.successResponse("Search result", data?.[0]));
});


module.exports = {
    insert,
    update,
    remove,
    getById,
    getAll,
    search
};