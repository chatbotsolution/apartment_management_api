const memberService = require("../services/member.service");
const APIResponse = require("../utils/response");
const asyncHandler = require("../middlewares/async.middleware");

const getAll = asyncHandler(async (req, res) => {
    const data = await memberService.getAll();
    return APIResponse.send(res, APIResponse.emptyOr404(data));
});

const getActive = asyncHandler(async (req, res) => {
    const data = await memberService.getActive();
    return APIResponse.send(res, APIResponse.emptyOr404(data));
});

const getById = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const data = await memberService.getById(id);
    return APIResponse.send(res, APIResponse.emptyOr404(data));
});

const getByFlat = asyncHandler(async (req, res) => {
    const flatId = parseInt(req.params.flatId);
    const data = await memberService.getByFlat(flatId);
    return APIResponse.send(res, APIResponse.emptyOr404(data));
});

const create = asyncHandler(async (req, res) => {
    const result = await memberService.create(req.body);
    return APIResponse.send(res, APIResponse.successResponse(result));
});

const update = asyncHandler(async (req, res) => {
    const result = await memberService.update(req.body);
    return APIResponse.send(res, APIResponse.successResponse(result));
});

const remove = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const result = await memberService.delete(id);
    return APIResponse.send(res, APIResponse.successResponse(result));
});

module.exports = { getAll, getActive, getById, getByFlat, create, update, remove };