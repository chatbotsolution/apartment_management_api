const service = require("../services/society.service");
const APIResponse = require("../utils/response");
const asyncHandler = require("../middlewares/async.middleware");


/* ======================= INSERT ======================= */
const insert = asyncHandler(async (req, res) => {

    const body = req.body;

    // 1. Capture the structural row array results from your service execution
    const rows = await service.execute(
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
        body.website,
        body.orgId,
        body.societyTypeId
    );

    // 2. Extract the newly generated ID safely from the procedure result sets
    // (Usually handles select identity or raw insertion metadata packets)
    const newSocietyId = rrows?.[0]?.[0]?.society_id || null;

    // 3. Return the new ID inside your success response wrapper back to the frontend
    return APIResponse.send(
        res,
        APIResponse.successResponse({ society_id: newSocietyId }, "Society registered successfully")
    );
});


/* ======================= UPDATE ======================= */
const update = asyncHandler(async (req, res) => {

    const body = req.body;

    await service.execute(
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
        body.website,
        body.orgId,
        body.societyTypeId
    );

    return APIResponse.send(
        res,
        APIResponse.successResponse(null)
    );
});


/* ======================= DELETE (SOFT) ======================= */
const remove = asyncHandler(async (req, res) => {

    const { societyId } = req.body;

    await service.execute(
        "DELETE",
        societyId
    );

    return APIResponse.send(
        res,
        APIResponse.successResponse(null)
    );
});


/* ======================= GET BY ID ======================= */
/* ======================= GET BY ID ======================= */
const getById = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    
    // Extract org_id if provided (for extra security)
    const orgId = req.query.org_id ? parseInt(req.query.org_id) : null;

    if (isNaN(id)) {
        return APIResponse.send(res, APIResponse.badRequestResponse("Valid society_id is required"));
    }

    // sp_society expects exactly 15 parameters
    const args = Array(15).fill(null);
    args[0] = "GET_BY_ID";   // 1st param: p_action
    args[1] = id;            // 2nd param: p_society_id
    args[13] = orgId;        // 14th param: p_org_id

    const data = await service.execute(...args);

    return APIResponse.send(
        res,
        APIResponse.emptyOr404(data?.[0])
    );
});

/* ======================= GET ALL ======================= */
const getAll = asyncHandler(async (req, res) => {
    // Extract org_id from the query/cookies
    const orgId = req.query.org_id ? parseInt(req.query.org_id) : null;

    // sp_society expects exactly 15 parameters
    const args = Array(15).fill(null);
    args[0] = "GET_ALL";     // 1st param: p_action
    args[13] = orgId;        // 14th param: p_org_id

    const data = await service.execute(...args);

    // Using successResponse is usually better for lists, but I kept it similar to your style
    return APIResponse.send(
        res,
        APIResponse.successResponse(data?.[0] || [], "Societies fetched successfully")
    );
});

const getCountries = asyncHandler(async (req, res) => {

    const data = await service.getCountries();

    return APIResponse.send(res, {
        statusCode: 200,
        success: true,
        message: "Country list fetched successfully",
        data: data
    });
});

const getStates = asyncHandler(async (req, res) => {

    const countryId = req.query.country_id
        ? parseInt(req.query.country_id)
        : null;

    if (!countryId) {
        return APIResponse.send(
            res,
            APIResponse.badRequestResponse("country_id is required")
        );
    }

    const data = await service.getStates(countryId);

    return APIResponse.send(res, {
        statusCode: 200,
        success: true,
        message: "State list fetched successfully",
        data: data
    });
});

const getDistrictsByState = asyncHandler(async (req, res) => {
    const stateId = req.query.state_id ? parseInt(req.query.state_id) : null;

    if (!stateId) {
        return APIResponse.send(
            res,
            APIResponse.badRequestResponse("state_id is required")
        );
    }

    const data = await service.getDistrictsByState(stateId);
    return APIResponse.send(res, {
        statusCode: 200,
        success: true,
        message: "Data fetched successfully",
        data: data
    });
});

module.exports = {
    insert,
    update,
    remove,
    getById,
    getAll,
    getCountries,
    getStates,
    getDistrictsByState
};