const maintenanceBillService = require("../services/maintenanceBill.service");
const APIResponse = require("../utils/response");
const asyncHandler = require("../middlewares/async.middleware");

const getAll = asyncHandler(async (req, res) => {
    const data = await maintenanceBillService.getAll();
    return APIResponse.send(res, APIResponse.successResponse(data));
});

const getById = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const data = await maintenanceBillService.getById(id);
    return APIResponse.send(res, APIResponse.emptyOr404(data));
});

const getByFlat = asyncHandler(async (req, res) => {
    const flatId = parseInt(req.params.flatId);
    const data = await maintenanceBillService.getByFlat(flatId);
    return APIResponse.send(res, APIResponse.successResponse(data));
});

const create = asyncHandler(async (req, res) => {
    const result = await maintenanceBillService.create(req.body);
    const response = APIResponse.successResponse(result);
    return APIResponse.send(res, response);
});

const update = asyncHandler(async (req, res) => {
    const result = await maintenanceBillService.update(req.body);
    return APIResponse.send(res, APIResponse.successResponse(result));
});

const updateStatus = asyncHandler(async (req, res) => {
    const { Bill_Id, Status } = req.body;
    const result = await maintenanceBillService.updateStatus(Bill_Id, Status);
    return APIResponse.send(res, APIResponse.successResponse(result));
});

const remove = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const result = await maintenanceBillService.delete(id);
    return APIResponse.send(res, APIResponse.successResponse(result));
});

module.exports = {
    getAll,
    getById,
    getByFlat,
    create,
    update,
    updateStatus,
    remove
};
