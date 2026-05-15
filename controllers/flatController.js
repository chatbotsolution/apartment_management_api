const service = require("../services/flat.service");
const APIResponse = require("../utils/response");
const asyncHandler = require("../middlewares/async.middleware");


/* ======================= GET ALL ======================= */
const getAll = asyncHandler(async (req, res) => {

    const society_id = parseInt(req.query.society_id);

    if (!society_id) {
        return APIResponse.send(
            res,
            APIResponse.badRequestResponse("society_id required")
        );
    }

    const data = await service.getAll(society_id);

    return APIResponse.send(
        res,
        APIResponse.successResponse(data)
    );
});


/* ======================= GET BY ID ======================= */
const getById = asyncHandler(async (req, res) => {

    const id = parseInt(req.params.id);

    const data = await service.getById(id);

    return APIResponse.send(
        res,
        APIResponse.emptyOr404(data)
    );
});


/* ======================= CREATE ======================= */
const create = asyncHandler(async (req, res) => {

    // Explicitly destructure to prevent over-posting
    const {
        floor_id,
        block_id,
        flat_number,
        bhk_type_id,
        balconies,
        facing_id,
        status_id,
        is_corner_flat
    } = req.body;

    const payload = {
        floor_id,
        block_id,
        flat_number,
        bhk_type_id,
        balconies,
        facing_id,
        status_id,
        is_corner_flat
    };

    const result = await service.create(payload);

    return APIResponse.send(
        res,
        APIResponse.successResponse(result)
    );
});


/* ======================= UPDATE ======================= */
const update = asyncHandler(async (req, res) => {

    // Explicitly destructure to prevent over-posting
    const {
        flat_id,
        floor_id,
        block_id,
        flat_number,
        bhk_type_id,
        balconies,
        facing_id,
        status_id,
        is_corner_flat
    } = req.body;

    const payload = {
        flat_id,
        floor_id,
        block_id,
        flat_number,
        bhk_type_id,
        balconies,
        facing_id,
        status_id,
        is_corner_flat
    };

    const result = await service.update(payload);

    return APIResponse.send(
        res,
        APIResponse.successResponse(result)
    );
});


/* ======================= DELETE ======================= */
const remove = asyncHandler(async (req, res) => {

    const id = parseInt(req.params.id);

    const result = await service.remove(id);

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