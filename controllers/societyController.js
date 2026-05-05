const service = require("../services/society.service");
const APIResponse = require("../utils/response");
const asyncHandler = require("../middlewares/async.middleware");


/* ======================= INSERT ======================= */
const insert = asyncHandler(async (req, res) => {
    const body = req.body;

    const result = await service.execute(
        "INSERT",
        null,
        body.name,
        body.address,
        body.city,
        body.state,
        body.pincode,
        body.registrationNo,
        body.establishedDate,
        body.contactEmail,
        body.contactPhone,
        body.totalBlocks,
        body.totalUnits,
        body.website
    );

    return APIResponse.send(res, APIResponse.successResponse("Society created successfully", result));
});


/* ======================= UPDATE ======================= */
const update = asyncHandler(async (req, res) => {
    const body = req.body;

    const result = await service.execute(
        "UPDATE",
        body.societyId,
        body.name,
        body.address,
        body.city,
        body.state,
        body.pincode,
        body.registrationNo,
        body.establishedDate,
        body.contactEmail,
        body.contactPhone,
        body.totalBlocks,
        body.totalUnits,
        body.website
    );

    return APIResponse.send(res, APIResponse.successResponse("Society updated successfully", result));
});


/* ======================= DELETE (SOFT) ======================= */
const remove = asyncHandler(async (req, res) => {
    const { societyId } = req.body;

    const result = await service.execute("DELETE", societyId);

    return APIResponse.send(res, APIResponse.successResponse("Society deleted successfully", result));
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


module.exports = {
    insert,
    update,
    remove,
    getById,
    getAll
};