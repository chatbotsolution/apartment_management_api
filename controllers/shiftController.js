const shiftService = require("../services/shift.service");
const APIResponse = require("../utils/response");
const asyncHandler = require("../middlewares/async.middleware");

/**
 * ShiftController
 */

// GET: api/Shift/GetAll
const getAll = asyncHandler(async (req, res) => {
    const data = await shiftService.getAll();
    return APIResponse.send(res, APIResponse.emptyOr404(data));
});

// GET: api/Shift/GetById/1
const getById = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const data = await shiftService.getById(id);
    return APIResponse.send(res, APIResponse.emptyOr404(data));
});

// POST: api/Shift/Create
const create = asyncHandler(async (req, res) => {
    const result = await shiftService.create(req.body);
    const response = APIResponse.successResponse(result);
    return APIResponse.send(res, response);
});

// PUT: api/Shift/Update
const update = asyncHandler(async (req, res) => {
    const result = await shiftService.update(req.body);
    const response = APIResponse.successResponse(result);
    return APIResponse.send(res, response);
});

// DELETE: api/Shift/Delete/1
const remove = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const result = await shiftService.delete(id);
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
