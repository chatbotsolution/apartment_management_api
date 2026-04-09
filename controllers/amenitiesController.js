const amenitiesService = require("../services/amenities.service");
const APIResponse = require("../utils/response");
const asyncHandler = require("../middlewares/async.middleware");


/* ======================= GET ALL ======================= */
const getAll = asyncHandler(async (req, res) => {
    console.log("Get All Request Data : ", req);
    const data = await amenitiesService.getAll();
    return APIResponse.send(res, APIResponse.emptyOr404(data));
});


/* ======================= GET BY ID ======================= */
const getById = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const data = await amenitiesService.getById(id);
    return APIResponse.send(res, APIResponse.emptyOr404(data));
});


/* ======================= CREATE ======================= */
const create = asyncHandler(async (req, res) => {
    const result = await amenitiesService.create(req.body);

    if (!result || result.AmenitiesId === 0) {
        return APIResponse.send(res, APIResponse.badRequestResponse(result));
    }

    return APIResponse.send(res, APIResponse.successResponse(result));
});


/* ======================= UPDATE ======================= */
const update = asyncHandler(async (req, res) => {
    const result = await amenitiesService.update(req.body);
    return APIResponse.send(res, APIResponse.successResponse(result));
});


/* ======================= STATUS CHANGE ======================= */
const changeStatus = asyncHandler(async (req, res) => {
    const { AmenitiesId, IsActive, Updated_By } = req.params;

    console.log("Change Status Data : ", AmenitiesId, IsActive, Updated_By);

    const result = await amenitiesService.changeStatus({
        AmenitiesId: parseInt(AmenitiesId),
        IsActive: IsActive === "true" || IsActive === true,
        Updated_By: parseInt(Updated_By)
    });
    console.log("Status Change Result : ", result);

    return APIResponse.send(res, APIResponse.successResponse(result));
});


module.exports = {
    getAll,
    getById,
    create,
    update,
    changeStatus
};