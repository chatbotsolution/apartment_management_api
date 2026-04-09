const societyService = require("../services/society.service");
const APIResponse = require("../utils/response");
const asyncHandler = require("../middlewares/async.middleware");

const getAll = asyncHandler(async (req, res) => {
    const data = await societyService.getAll();
    return APIResponse.send(res, APIResponse.emptyOr404(data));
});

const getById = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const data = await societyService.getById(id);
    return APIResponse.send(res, APIResponse.emptyOr404(data));
});

const create = asyncHandler(async (req, res) => {
    //console.log("Request data = ", req.body);
    const result = await societyService.create(req.body);
    if (result.Society_Id === 0) {
        const response = APIResponse.badRequestResponse(result);
        return APIResponse.send(res, response);
    }

    const response = APIResponse.successResponse(result);
    console.log("Create Society data = ", result);
    return APIResponse.send(res, response);
});

const update = asyncHandler(async (req, res) => {
    const result = await societyService.update(req.body);
    return APIResponse.send(res, APIResponse.successResponse(result));
});

const remove = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const result = await societyService.delete(id);
    return APIResponse.send(res, APIResponse.successResponse(result));
});

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};
