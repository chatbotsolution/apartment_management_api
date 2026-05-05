const amenityService = require("../services/amenities.service");
const APIResponse = require("../utils/response");
const asyncHandler = require("../middlewares/async.middleware");


/* ======================= GET ALL ======================= */
const getAll = asyncHandler(async (req, res) => {
    const societyId = parseInt(req.query.society_id);

    if (!societyId) {
        return APIResponse.send(
            res,
            APIResponse.badRequestResponse("society_id is required")
        );
    }

    const data = await amenityService.getAll(societyId);
    return APIResponse.send(res, APIResponse.emptyOr404(data));
});


/* ======================= GET BY ID ======================= */
const getById = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const societyId = parseInt(req.query.society_id);

    const data = await amenityService.getById(id, societyId);
    return APIResponse.send(res, APIResponse.emptyOr404(data));
});


/* ======================= CREATE ======================= */
const create = asyncHandler(async (req, res) => {
    const result = await amenityService.create(req.body);

    return APIResponse.send(res, APIResponse.successResponse(result));
});


/* ======================= UPDATE ======================= */
const update = asyncHandler(async (req, res) => {
    const result = await amenityService.update(req.body);

    return APIResponse.send(res, APIResponse.successResponse(result));
});


/* ======================= DELETE (SOFT) ======================= */
const deleteAmenity = asyncHandler(async (req, res) => {
    const { amenity_id, society_id } = req.params;

    const result = await amenityService.deleteAmenity({
        amenity_id: parseInt(amenity_id),
        society_id: parseInt(society_id)
    });

    return APIResponse.send(res, APIResponse.successResponse(result));
});


module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteAmenity
};