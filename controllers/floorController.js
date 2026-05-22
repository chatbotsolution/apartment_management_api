const service = require("../services/floor.service");
const APIResponse = require("../utils/response");
const asyncHandler = require("../middlewares/async.middleware");


/* ======================= GET ALL ======================= */
const getAll = asyncHandler(async (req, res) => {
    // Keep as a string to allow '1,2,3'. Default to null if not provided.
    const society_id = req.query.society_id || null;

    // Removed the "society_id required" validation block because 
    // the SP is now designed to return all records if society_id is NULL.

    const data = await service.getAll(society_id);

    return APIResponse.send(
        res,
        APIResponse.successResponse(data)
    );
});

/* ======================= GET BY ID ======================= */
const getById = asyncHandler(async (req, res) => {

    const id = parseInt(req.params.id);
    const society_id = parseInt(req.query.society_id);

    if (!society_id) {
        return APIResponse.send(
            res,
            APIResponse.badRequestResponse("society_id required")
        );
    }

    const data = await service.getById(id, society_id);

    return APIResponse.send(
        res,
        APIResponse.emptyOr404(data)
    );
});


/* ======================= CREATE ======================= */
const create = asyncHandler(async (req, res) => {

    const result = await service.create(req.body);

    return APIResponse.send(
        res,
        APIResponse.successResponse(result)
    );
});


/* ======================= UPDATE ======================= */
const update = asyncHandler(async (req, res) => {

    const result = await service.update(req.body);

    return APIResponse.send(
        res,
        APIResponse.successResponse(result)
    );
});


/* ======================= DELETE ======================= */
const remove = asyncHandler(async (req, res) => {

    const id = parseInt(req.params.id);
    const society_id = parseInt(req.query.society_id);

    if (!society_id) {
        return APIResponse.send(
            res,
            APIResponse.badRequestResponse("society_id required")
        );
    }

    const result = await service.remove(id, society_id);

    return APIResponse.send(
        res,
        APIResponse.successResponse(result)
    );
});


module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};