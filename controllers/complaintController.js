const complaintService = require("../services/complaint.service");
const APIResponse = require("../utils/response");
const asyncHandler = require("../middlewares/async.middleware");

// GET: api/Complaints/GetAllComplaints
const getAll = asyncHandler(async (req, res) => {
    const data = await complaintService.getAll();
    return APIResponse.send(res, APIResponse.successResponse(data));
});

// GET: api/Complaints/GetComplaintById/1
const getById = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const data = await complaintService.getById(id);
    return APIResponse.send(res, APIResponse.emptyOr404(data));
});

// POST: api/Complaints/RegisterComplaint
const create = asyncHandler(async (req, res) => {
    const result = await complaintService.create(req.body);
    const response = APIResponse.successResponse(result);
    return APIResponse.send(res, response);
});

// PUT: api/Complaints/UpdateComplaint
const update = asyncHandler(async (req, res) => {
    const result = await complaintService.update(req.body);
    const response = APIResponse.successResponse(result);
    return APIResponse.send(res, response);
});

// DELETE: api/Complaints/DeleteComplaint/1
const remove = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const result = await complaintService.delete(id);
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
