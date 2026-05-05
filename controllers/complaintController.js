const service = require("../services/complaint.service");
const APIResponse = require("../utils/response");
const asyncHandler = require("../middlewares/async.middleware");

/* ======================= GET ALL ======================= */
const getAll = asyncHandler(async (req, res) => {
    const data = await service.getAll();
    return APIResponse.send(res, APIResponse.emptyOr404(data));
});

/* ======================= GET BY ID ======================= */
const getById = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const data = await service.getById(id);
    return APIResponse.send(res, APIResponse.emptyOr404(data));
});

/* ======================= CREATE ======================= */
const create = asyncHandler(async (req, res) => {
    const result = await service.create(req.body);
    return APIResponse.send(res, APIResponse.successResponse(result));
});

/* ======================= UPDATE ======================= */
const update = asyncHandler(async (req, res) => {
    const result = await service.update(req.body);
    return APIResponse.send(res, APIResponse.successResponse(result));
});

/* ======================= ASSIGN ======================= */
const assign = asyncHandler(async (req, res) => {
    const result = await service.assign(req.body);
    return APIResponse.send(res, APIResponse.successResponse(result));
});

/* ======================= RESOLVE ======================= */
const resolve = asyncHandler(async (req, res) => {
    const result = await service.resolve(req.body);
    return APIResponse.send(res, APIResponse.successResponse(result));
});

/* ======================= RATE ======================= */
const rate = asyncHandler(async (req, res) => {
    const result = await service.rate(req.body);
    return APIResponse.send(res, APIResponse.successResponse(result));
});

module.exports = {
    getAll,
    getById,
    create,
    update,
    assign,
    resolve,
    rate
};