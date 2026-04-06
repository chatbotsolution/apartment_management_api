const complaintService = require("../services/complaint.service");
const APIResponse = require("../utils/response");
const asyncHandler = require("../middlewares/async.middleware");

const getAll = asyncHandler(async (req, res) => {
    const data = await complaintService.getAll();
    return APIResponse.send(res, APIResponse.successResponse(data));
});

const getById = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const data = await complaintService.getById(id);
    return APIResponse.send(res, APIResponse.emptyOr404(data));
});

const getByUserId = asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.userId);
    const data = await complaintService.getByUserId(userId);
    return APIResponse.send(res, APIResponse.successResponse(data));
});

const create = asyncHandler(async (req, res) => {
    const result = await complaintService.create(req.body);
    const response = APIResponse.successResponse(result);
    return APIResponse.send(res, response);
});

const update = asyncHandler(async (req, res) => {
    const result = await complaintService.update(req.body);
    return APIResponse.send(res, APIResponse.successResponse(result));
});

const remove = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const result = await complaintService.delete(id);
    return APIResponse.send(res, APIResponse.successResponse(result));
});

module.exports = {
    getAll,
    getById,
    getByUserId,
    create,
    update,
    remove
};
