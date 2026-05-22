const service = require("../services/complaint.service");
const APIResponse = require("../utils/response");
const asyncHandler = require("../middlewares/async.middleware");

/* ======================= GET ALL ======================= */
const getAll = asyncHandler(async (req, res) => {
    const limit = parseInt(req.query.limit) || 50;
    const offset = parseInt(req.query.offset) || 0;

    const { society_id, org_id } = req.query;

    const hasSocietyId = society_id && String(society_id).trim() !== "";
    const hasOrgId = org_id && String(org_id).trim() !== "";

    if (!hasSocietyId && !hasOrgId) {
        return APIResponse.send(
            res,
            APIResponse.badRequestResponse("Either society_id or org_id is required")
        );
    }

    const safeSocietyId = hasSocietyId ? String(society_id).trim() : null;
    const safeOrgId = hasOrgId ? parseInt(org_id) : null;

    const data = await service.getAll(limit, offset, safeSocietyId, safeOrgId);
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
    const data = { ...req.body };

    if (req.file) {
        data.attachment_url = req.file.path;
    }

    const result = await service.create(data);

    let newId = null;
    if (result && result.insertId) {
        newId = result.insertId;
    } else if (Array.isArray(result) && result[0] && result[0].insertId) {
        newId = result[0].insertId;
    }

    return APIResponse.send(res, APIResponse.successResponse({
        message: "Complaint raised successfully",
        complaint_id: newId
    }));
});

/* ======================= UPDATE ======================= */
const update = asyncHandler(async (req, res) => {
    const complaint_id = parseInt(req.params.id);
    const data = { ...req.body, complaint_id };

    if (req.file) {
        data.attachment_url = req.file.path;
    }

    await service.update(data);

    return APIResponse.send(res, APIResponse.successResponse({
        message: "Complaint updated successfully"
    }));
});

/* ======================= ASSIGN ======================= */
const assign = asyncHandler(async (req, res) => {
    const complaint_id = parseInt(req.params.id);
    const data = { ...req.body, complaint_id };

    await service.assign(data);

    return APIResponse.send(res, APIResponse.successResponse({
        message: "Staff assigned successfully"
    }));
});

/* ======================= RESOLVE ======================= */
const resolve = asyncHandler(async (req, res) => {
    const complaint_id = parseInt(req.params.id);
    const data = { ...req.body, complaint_id };

    await service.resolve(data);

    return APIResponse.send(res, APIResponse.successResponse({
        message: "Complaint resolved successfully"
    }));
});

/* ======================= RATE ======================= */
const rate = asyncHandler(async (req, res) => {
    const complaint_id = parseInt(req.params.id);
    const data = { ...req.body, complaint_id };

    await service.rate(data);

    return APIResponse.send(res, APIResponse.successResponse({
        message: "Rating submitted successfully"
    }));
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