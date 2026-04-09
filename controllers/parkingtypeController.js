const parkingtypeService = require("../services/parkingtype.service");
const APIResponse = require("../utils/response");
const asyncHandler = require("../middlewares/async.middleware");


/* ======================= GET ALL ======================= */
const getAll = asyncHandler(async (req, res) => {
    console.log("Get All Request Data : ", req);
    const data = await parkingtypeService.getAll();
    return APIResponse.send(res, APIResponse.emptyOr404(data));
});


/* ======================= GET BY ID ======================= */
const getById = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const data = await parkingtypeService.getById(id);
    return APIResponse.send(res, APIResponse.emptyOr404(data));
});


/* ======================= CREATE ======================= */
const create = asyncHandler(async (req, res) => {
    const result = await parkingtypeService.create(req.body);

    if (!result || result.ParkingTypeId === 0) {
        return APIResponse.send(res, APIResponse.badRequestResponse(result));
    }

    return APIResponse.send(res, APIResponse.successResponse(result));
});


/* ======================= UPDATE ======================= */
const update = asyncHandler(async (req, res) => {
    const result = await parkingtypeService.update(req.body);
    return APIResponse.send(res, APIResponse.successResponse(result));
});


/* ======================= STATUS CHANGE ======================= */
const changeStatus = asyncHandler(async (req, res) => {
    const { ParkingTypeId, IsActive, UpdatedBy } = req.params;

    console.log("Change Status Data : ", ParkingTypeId, IsActive, UpdatedBy);

    const result = await parkingtypeService.changeStatus({
        ParkingTypeId: parseInt(ParkingTypeId),
        IsActive: IsActive === "true" || IsActive === true,
        UpdatedBy: parseInt(UpdatedBy)
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