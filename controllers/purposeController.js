const purposeService = require("../services/purpose.service");
const APIResponse = require("../utils/response");
const asyncHandler = require("../middlewares/async.middleware");

/**
 * PurposeController
 */

// GET: api/Purpose/GetAll
const getAll = asyncHandler(async (req, res) => {
    const data = await purposeService.getAll();
    return APIResponse.send(res, APIResponse.emptyOr404(data));
});

// GET: api/Purpose/GetById/1
const getById = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const data = await purposeService.getById(id);
    return APIResponse.send(res, APIResponse.emptyOr404(data));
});

// POST: api/Purpose/Create
const create = asyncHandler(async (req, res) => {
    const result = await purposeService.create(req.body);
    const response = APIResponse.successResponse(result);
    return APIResponse.send(res, response);
});

// PUT: api/Purpose/Update
const update = asyncHandler(async (req, res) => {
    const result = await purposeService.update(req.body);
    const response = APIResponse.successResponse(result);
    return APIResponse.send(res, response);
});

// DELETE: api/Purpose/Delete/1
const remove = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const result = await purposeService.delete(id);
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
