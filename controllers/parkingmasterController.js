const parkingService = require("../services/parkingmaster.service");
const APIResponse = require("../utils/response");
const asyncHandler = require("../middlewares/async.middleware");


/* ======================= GET ALL ======================= */
const getAll = asyncHandler(async (req, res) => {
    console.log("Get All Parking Request : ", req);
    const data = await parkingService.getAll();
    return APIResponse.send(res, APIResponse.emptyOr404(data));
});


/* ======================= GET BY ID ======================= */
const getById = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const data = await parkingService.getById(id);
    return APIResponse.send(res, APIResponse.emptyOr404(data));
});


/* ======================= CREATE ======================= */
const create = asyncHandler(async (req, res) => {
    const result = await parkingService.create(req.body);

    if (!result || result.ParkingId === 0) {
        return APIResponse.send(res, APIResponse.badRequestResponse(result));
    }

    return APIResponse.send(res, APIResponse.successResponse(result));
});


/* ======================= UPDATE ======================= */
const update = asyncHandler(async (req, res) => {
    const result = await parkingService.update(req.body);
    return APIResponse.send(res, APIResponse.successResponse(result));
});


/* ======================= STATUS CHANGE ======================= */
const changeStatus = asyncHandler(async (req, res) => {
    const ParkingId = parseInt(req.params.ParkingId);
    const UpdatedBy = parseInt(req.params.UpdatedBy);
    const IsActive = req.params.IsActive === "true";

    console.log("Change Status Data : ", { ParkingId, IsActive, UpdatedBy });

    const result = await parkingService.changeStatus({
        ParkingId,
        IsActive,
        UpdatedBy
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