const userRequestTypeService = require("../services/userRequestType.service");
const APIResponse = require("../utils/response");
const asyncHandler = require("../middlewares/async.middleware");

/* ======================= GET ALL ======================= */
const getAll = asyncHandler(async (req, res) => {
    const data = await userRequestTypeService.getAll();
    return APIResponse.send(res, APIResponse.emptyOr404(data));
});

/* ======================= GET BY ID ======================= */
const getById = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const data = await userRequestTypeService.getById(id);
    return APIResponse.send(res, APIResponse.emptyOr404(data));
});

/* ======================= CREATE ======================= */
const create = asyncHandler(async (req, res) => {
    console.log("Request Data = ", req.body);

    const result = await userRequestTypeService.create(req.body);

    if (result.id === 0) {
        const response = APIResponse.badRequestResponse(result);
        return APIResponse.send(res, response);
    }

    const response = APIResponse.successResponse(result);
    return APIResponse.send(res, response);
});

/* ======================= UPDATE ======================= */
const update = asyncHandler(async (req, res) => {
    const result = await userRequestTypeService.update(req.body);
    return APIResponse.send(res, APIResponse.successResponse(result));
});

/* ======================= DELETE ======================= */
const remove = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const result = await userRequestTypeService.delete(id);
    return APIResponse.send(res, APIResponse.successResponse(result));
});

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};