const service = require("../services/society.service");
const APIResponse = require("../utils/response");
const asyncHandler = require("../middlewares/async.middleware");


/* ======================= INSERT ======================= */
const insert = asyncHandler(async (req, res) => {

    const body = req.body;

    await service.execute(
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

    return APIResponse.send(
        res,
        APIResponse.successResponse(null)
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
        body.totalUnits,
        body.website
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
const getById = asyncHandler(async (req, res) => {

    const id = parseInt(req.params.id);

    const data = await service.execute(
        "GET_BY_ID",
        id
    );

    return APIResponse.send(
        res,
        APIResponse.emptyOr404(data?.[0])
    );
});


/* ======================= GET ALL ======================= */
const getAll = asyncHandler(async (req, res) => {

    const data = await service.execute(
        "GET_ALL"
    );

    return APIResponse.send(
        res,
        APIResponse.emptyOr404(data?.[0])
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