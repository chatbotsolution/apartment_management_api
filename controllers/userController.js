const userService = require("../services/user.service");
const APIResponse = require("../utils/response");
const asyncHandler = require("../middlewares/async.middleware");

// GET ALL
const getAll = asyncHandler(async (req, res) => {
    const data = await userService.getAll();
    return APIResponse.send(res, APIResponse.emptyOr404(data));
});

// GET BY ID
const getById = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const data = await userService.getById(id);
    return APIResponse.send(res, APIResponse.emptyOr404(data));
});

// CREATE
const create = asyncHandler(async (req, res) => {
    const result = await userService.create(req.body);
    return APIResponse.send(res, APIResponse.successResponse(result));
});

// UPDATE
const update = asyncHandler(async (req, res) => {
    const result = await userService.update(req.body);
    return APIResponse.send(res, APIResponse.successResponse(result));
});

// DELETE
const remove = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const result = await userService.delete(id);
    return APIResponse.send(res, APIResponse.successResponse(result));
});

module.exports = { getAll, getById, create, update, remove };