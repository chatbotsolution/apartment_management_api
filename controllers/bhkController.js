const service = require("../services/bhkservice");
const APIResponse = require("../utils/response");
const asyncHandler = require("../middlewares/async.middleware");

const getAll = asyncHandler(async (req, res) => {
    const data = await service.getAll();
    return APIResponse.send(res, {
        statusCode: 200,
        success: true,
        message: "BHK Master records fetched successfully",
        data
    });
});

const getById = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const data = await service.getById(id);
    return APIResponse.send(res, {
        statusCode: 200,
        success: true,
        message: "BHK record fetched successfully",
        data
    });
});

const create = asyncHandler(async (req, res) => {
    await service.create(req.body);
    return APIResponse.send(res, {
        statusCode: 200,
        success: true,
        message: "BHK record created successfully"
    });
});

const update = asyncHandler(async (req, res) => {
    await service.update(req.body);
    return APIResponse.send(res, {
        statusCode: 200,
        success: true,
        message: "BHK record updated successfully"
    });
});

const remove = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    await service.remove(id);
    return APIResponse.send(res, {
        statusCode: 200,
        success: true,
        message: "BHK record deleted successfully"
    });
});

module.exports = { getAll, getById, create, update, remove };