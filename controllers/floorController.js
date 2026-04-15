const floorService = require("../services/floor.service");
const APIResponse = require("../utils/response");
const asyncHandler = require("../middlewares/async.middleware");

// ================= GET ALL =================
const getAll = asyncHandler(async (req, res) => {
    const data = await floorService.getAll();
    return APIResponse.send(res, APIResponse.emptyOr404(data));
});

// ================= GET BY ID =================
const getById = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const data = await floorService.getById(id);
    return APIResponse.send(res, APIResponse.emptyOr404(data));
});

// ================= CREATE =================
const create = asyncHandler(async (req, res) => {
    req.body.Created_By = req.body.Created_By || 1;

    const result = await floorService.create(req.body);

    if (result.Floor_Id === 0) {
        return APIResponse.send(res, APIResponse.badRequestResponse(result));
    }

    return APIResponse.send(res, APIResponse.successResponse(result));
});

// ================= UPDATE =================
const update = asyncHandler(async (req, res) => {
    req.body.Updated_By = req.body.Updated_By || 1;

    const result = await floorService.update(req.body);

    return APIResponse.send(res, APIResponse.successResponse(result));
});

// ================= DELETE =================
const remove = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);

    const result = await floorService.delete(id);

    return APIResponse.send(res, APIResponse.successResponse(result));
});

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};