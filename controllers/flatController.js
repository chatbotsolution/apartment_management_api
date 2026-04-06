const flatService = require("../services/flat.service");
const APIResponse = require("../utils/response");
const asyncHandler = require("../middlewares/async.middleware");

// GET ALL
const getAll = asyncHandler(async (req, res) => {
    const data = await flatService.getAll();
    const response = APIResponse.emptyOr404(data);
    return APIResponse.send(res, response);
});

// GET BY ID
const getById = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const data = await flatService.getById(id);
    const response = APIResponse.emptyOr404(data);
    return APIResponse.send(res, response);
});

// CREATE
const create = asyncHandler(async (req, res) => {
    const result = await flatService.create(req.body);
    const response = APIResponse.successResponse(result);
    return APIResponse.send(res, response);
});

// UPDATE
const update = asyncHandler(async (req, res) => {
    const result = await flatService.update(req.body);
    const response = APIResponse.successResponse(result);
    return APIResponse.send(res, response);
});

// DELETE
const remove = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const result = await flatService.delete(id);
    const response = APIResponse.successResponse(result);
    return APIResponse.send(res, response);
});

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};