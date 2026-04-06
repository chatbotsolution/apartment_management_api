const visitorService = require("../services/visitor.service");
const APIResponse = require("../utils/response");
const asyncHandler = require("../middlewares/async.middleware");

const getAll = asyncHandler(async (req, res) => {
    const data = await visitorService.getAll();
    return APIResponse.send(res, APIResponse.emptyOr404(data));
});

const getById = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const data = await visitorService.getById(id);
    return APIResponse.send(res, APIResponse.emptyOr404(data));
});

const getByFlat = asyncHandler(async (req, res) => {
    const flatId = parseInt(req.params.flatId);
    const data = await visitorService.getByFlat(flatId);
    return APIResponse.send(res, APIResponse.emptyOr404(data));
});

const create = asyncHandler(async (req, res) => {
    const result = await visitorService.create(req.body);

    if (result.Visitor_Id === 0) {
        return APIResponse.send(res, APIResponse.badRequestResponse(result));
    }

    return APIResponse.send(res, APIResponse.successResponse(result));
});

const update = asyncHandler(async (req, res) => {
    const result = await visitorService.update(req.body);
    return APIResponse.send(res, APIResponse.successResponse(result));
});

const exitVisitor = asyncHandler(async (req, res) => {
    const result = await visitorService.exitVisitor(req.body);
    return APIResponse.send(res, APIResponse.successResponse(result));
});

module.exports = {
    getAll,
    getById,
    getByFlat,
    create,
    update,
    exitVisitor
};