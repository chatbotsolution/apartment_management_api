const maintenanceHeadService = require("../services/maintenanceHead.service");
const APIResponse = require("../utils/response");
const asyncHandler = require("../middlewares/async.middleware");

/**
 * MaintenanceHeadController
 */

// GET: api/MaintenanceHead/GetAll
const getAll = asyncHandler(async (req, res) => {
    const data = await maintenanceHeadService.getAll();
    return APIResponse.send(res, APIResponse.emptyOr404(data));
});

// GET: api/MaintenanceHead/GetById/1
const getById = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const data = await maintenanceHeadService.getById(id);
    return APIResponse.send(res, APIResponse.emptyOr404(data));
});

// POST: api/MaintenanceHead/Create
const create = asyncHandler(async (req, res) => {
    const result = await maintenanceHeadService.create(req.body);
    const response = APIResponse.successResponse(result);
    return APIResponse.send(res, response);
});

// PUT: api/MaintenanceHead/Update
const update = asyncHandler(async (req, res) => {
    const result = await maintenanceHeadService.update(req.body);
    const response = APIResponse.successResponse(result);
    return APIResponse.send(res, response);
});

// DELETE: api/MaintenanceHead/Delete/1
const remove = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const result = await maintenanceHeadService.delete(id);
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
