const paymentService = require("../services/payment.service");
const APIResponse = require("../utils/response");
const asyncHandler = require("../middlewares/async.middleware");

const getAll = asyncHandler(async (req, res) => {
    const data = await paymentService.getAll();
    return APIResponse.send(res, APIResponse.successResponse(data));
});

const getById = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const data = await paymentService.getById(id);
    return APIResponse.send(res, APIResponse.emptyOr404(data));
});

const getByBillId = asyncHandler(async (req, res) => {
    const billId = parseInt(req.params.billId);
    const data = await paymentService.getByBillId(billId);
    return APIResponse.send(res, APIResponse.successResponse(data));
});

const create = asyncHandler(async (req, res) => {
    const result = await paymentService.create(req.body);
    const response = APIResponse.successResponse(result);
    return APIResponse.send(res, response);
});

const update = asyncHandler(async (req, res) => {
    const result = await paymentService.update(req.body);
    return APIResponse.send(res, APIResponse.successResponse(result));
});

const remove = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const result = await paymentService.delete(id);
    return APIResponse.send(res, APIResponse.successResponse(result));
});

module.exports = {
    getAll,
    getById,
    getByBillId,
    create,
    update,
    remove
};
