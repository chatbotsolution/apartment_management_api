const amenityService = require("../services/amenities.service");
const APIResponse = require("../utils/response");
const asyncHandler = require("../middlewares/async.middleware");

/* ======================= GET ALL ======================= */
const getAll = asyncHandler(async (req, res) => {
    // 1. Extract from query
    const { society_id } = req.query;

    // 2. Convert to integer or null (to support the "Optional" DB logic)
    const safeSocietyId = society_id ? parseInt(society_id) : null;

    // 3. Remove the "badRequestResponse" check since it's now optional
    const data = await amenityService.getAll(safeSocietyId);
    
    // 4. Use emptyOr404 or just successResponse
    // For a "Get All", usually an empty array [] is better than a 404.
    return APIResponse.send(res, APIResponse.successResponse(data));
});


/* ======================= GET BY ID ======================= */
const getById = asyncHandler(async (req, res) => {
    // 1. Extract ID from path and society_id from query
    const id = parseInt(req.params.id);
    const { society_id } = req.query;

    // 2. Convert to integer or null for the optional logic
    const safeSocietyId = society_id ? parseInt(society_id) : null;

    // 3. Pass the correct variables to the service
    // Ensure you use 'safeSocietyId' so the DB receives NULL if it's missing
    const data = await amenityService.getById(id, safeSocietyId);
    
    return APIResponse.send(res, APIResponse.emptyOr404(data));
});


/* ======================= CREATE ======================= */
const create = asyncHandler(async (req, res) => {
    // Controller passes the request body to the Service layer
    const result = await amenityService.create(req.body);

    return APIResponse.send(res, APIResponse.successResponse(result));
});


/* ======================= UPDATE ======================= */
const update = asyncHandler(async (req, res) => {
    // Controller passes the request body to the Service layer
    const result = await amenityService.update(req.body);

    return APIResponse.send(res, APIResponse.successResponse(result));
});


/* ======================= DELETE (SOFT) ======================= */
const deleteAmenity = asyncHandler(async (req, res) => {
    const { amenity_id, society_id } = req.params;

    // Call 'remove' and pass two separate arguments, not an object
    const result = await amenityService.remove(
        parseInt(amenity_id),
        parseInt(society_id)
    );

    return APIResponse.send(res, APIResponse.successResponse(result));
});


module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteAmenity
};