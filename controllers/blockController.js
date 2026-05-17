const service = require("../services/block.service");
const APIResponse = require("../utils/response");
const asyncHandler = require("../middlewares/async.middleware");


/* ======================= GET ALL ======================= */
const getAll = asyncHandler(async (req, res) => {
    const { society_id } = req.query;

    // Validate that society_id exists and isn't empty space
    if (!society_id || String(society_id).trim() === "") {
        return APIResponse.send(
            res, 
            APIResponse.badRequestResponse("society_id is required")
        );
    }

    // Keep as a string format to securely pass string arrays
    const safeSocietyId = String(society_id).trim();

    const data = await service.getAll(safeSocietyId);
    return APIResponse.send(res, APIResponse.successResponse(data));
});


/* ======================= GET BY ID ======================= */
const getById = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const data = await service.getById(id);

    return APIResponse.send(res, APIResponse.emptyOr404(data));
});


/* ======================= CREATE ======================= */
const create = asyncHandler(async (req, res) => {
    const result = await service.create(req.body);
    return APIResponse.send(res, APIResponse.successResponse(result));
});


/* ======================= UPDATE ======================= */
const update = asyncHandler(async (req, res) => {
    const result = await service.update(req.body);
    return APIResponse.send(res, APIResponse.successResponse(result));
});


/* ======================= DELETE ======================= */
const remove = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const result = await service.remove(id);

    return APIResponse.send(res, APIResponse.successResponse(result));
});


module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};