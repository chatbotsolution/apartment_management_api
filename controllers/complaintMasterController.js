const complaintMasterService = require("../services/complaintMaster.service");
const APIResponse = require("../utils/response");
const asyncHandler = require("../middlewares/async.middleware");

/* ======================= GET ALL ======================= */
const getAll = asyncHandler(async (req, res) => {
    const data = await complaintMasterService.getAll();
    return APIResponse.send(res, APIResponse.emptyOr404(data));
});

/* ======================= GET BY ID ======================= */
const getById = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const data = await complaintMasterService.getById(id);
    return APIResponse.send(res, APIResponse.emptyOr404(data));
});

/* ======================= CREATE ======================= */
const create = asyncHandler(async (req, res) => {
    const result = await complaintMasterService.create(req.body);

    if (result.NewId === 0) {
        const response = APIResponse.badRequestResponse(result);
        return APIResponse.send(res, response);
    }

    const response = APIResponse.successResponse(result);
    return APIResponse.send(res, response);
});

/* ======================= UPDATE ======================= */
const update = asyncHandler(async (req, res) => {
    const result = await complaintMasterService.update(req.body);
    return APIResponse.send(res, APIResponse.successResponse(result));
});

/* ======================= DELETE ======================= */
const remove = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    
    // Safely extract userId from body or query, default to 1
    const userId = (req.body && req.body.userId) ? req.body.userId : (req.query.userId ? parseInt(req.query.userId) : 1);
    
    const result = await complaintMasterService.delete(id, userId);
    return APIResponse.send(res, APIResponse.successResponse(result));
});

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};
