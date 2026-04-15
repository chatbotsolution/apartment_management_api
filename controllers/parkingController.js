const parkingService = require("../services/parking.service");
const APIResponse = require("../utils/response");
const asyncHandler = require("../middlewares/async.middleware");

const getAll = asyncHandler(async (req, res) => {
    const data = await parkingService.getAll();
    return APIResponse.send(res, APIResponse.emptyOr404(data));
});

const getById = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const data = await parkingService.getById(id);
    return APIResponse.send(res, APIResponse.emptyOr404(data));
});

const getByFlat = asyncHandler(async (req, res) => {
    const flatId = parseInt(req.params.flatId);
    const data = await parkingService.getByFlat(flatId);
    return APIResponse.send(res, APIResponse.emptyOr404(data));
});

const create = asyncHandler(async (req, res) => {
    console.log("Request Data = ", req.body);

     // Ensure createdBy exists
    req.body.createdBy = req.body.createdBy || 1;

    const result = await parkingService.create(req.body);

    if (result.ParkingAllot_Id  === 0) {
        const response = APIResponse.badRequestResponse(result);
        return APIResponse.send(res, response);
    }

    const response = APIResponse.successResponse(result);
    return APIResponse.send(res, response);
});

const update = asyncHandler(async (req, res) => {

    req.body.updatedBy = req.body.updatedBy || 1;

    const result = await parkingService.update(req.body);
    return APIResponse.send(res, APIResponse.successResponse(result));
});

const remove = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const result = await parkingService.delete(id);
    return APIResponse.send(res, APIResponse.successResponse(result));
});

module.exports = {
    getAll,
    getById,
    getByFlat,
    create,
    update,
    remove
};