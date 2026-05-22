const fs = require("fs");
const path = require("path");
const service = require("../services/maintenanceRequest.service.js");
const APIResponse = require("../utils/response");
const asyncHandler = require("../middlewares/async.middleware");

/* ======================= CREATE REQUEST ======================= */
const create = asyncHandler(async (req, res) => {
    const b = req.body || {};
    let beforePhoto = b.beforePhotoUrl || null;

    if (req.file) {
        const filename = `maintenance_before_${Date.now()}${path.extname(req.file.originalname)}`;
        const savePath = path.join(process.cwd(), "public", "uploads", filename);
        fs.writeFileSync(savePath, req.file.buffer);
        beforePhoto = `/uploads/${filename}`;
    }

    const result = await service.execute(
        "INSERT",
        null,
        b.flatId,
        b.ownerId || null,
        b.tenantId || null,
        b.title,
        b.description,
        b.categoryId,
        b.priorityId,
        b.statusId || 70,
        null,
        null,
        null,
        b.estimatedCost || null,
        null,
        null,
        null,
        beforePhoto,
        null,
        null,   // limit
        null,   // offset
        null,   // societyId
        null    // orgId
    );

    return APIResponse.send(res, APIResponse.successResponse("Maintenance request created successfully", result));
});

/* ======================= UPDATE BASIC INFO ======================= */
const update = asyncHandler(async (req, res) => {
    const b = req.body || {};
    let beforePhoto = b.beforePhotoUrl || null;

    if (req.file) {
        const filename = `maintenance_before_${Date.now()}${path.extname(req.file.originalname)}`;
        const savePath = path.join(process.cwd(), "public", "uploads", filename);
        fs.writeFileSync(savePath, req.file.buffer);
        beforePhoto = `/uploads/${filename}`;
    }

    const result = await service.execute(
        "UPDATE",
        b.requestId,
        null,
        null,
        null,
        b.title,
        b.description,
        b.categoryId,
        b.priorityId,
        b.statusId,
        null,
        null,
        null,
        b.estimatedCost || null,
        null,
        null,
        null,
        beforePhoto,
        null,
        null,   // limit
        null,   // offset
        null,   // societyId
        null    // orgId
    );

    return APIResponse.send(res, APIResponse.successResponse("Maintenance request updated", result));
});

/* ======================= ASSIGN STAFF ======================= */
const assign = asyncHandler(async (req, res) => {
    const b = req.body || {};

    const result = await service.execute(
        "ASSIGN",
        b.requestId,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        b.statusId,
        b.assignedStaffId,
        b.scheduledAt,
        null,
        b.estimatedCost || null,
        null,
        null,
        null,
        null,
        null,
        null,   // limit
        null,   // offset
        null,   // societyId
        null    // orgId
    );

    return APIResponse.send(res, APIResponse.successResponse("Staff assigned", result));
});

/* ======================= COMPLETE REQUEST ======================= */
const complete = asyncHandler(async (req, res) => {
    const b = req.body || {};
    let afterPhoto = b.afterPhotoUrl || null;

    if (req.file) {
        const filename = `maintenance_after_${Date.now()}${path.extname(req.file.originalname)}`;
        const savePath = path.join(process.cwd(), "public", "uploads", filename);
        fs.writeFileSync(savePath, req.file.buffer);
        afterPhoto = `/uploads/${filename}`;
    }

    const result = await service.execute(
        "COMPLETE",
        b.requestId,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        b.statusId,
        null,
        null,
        b.completedAt,
        null,
        b.actualCost,
        b.costBorneById,
        b.remarks,
        null,
        afterPhoto,
        null,   // limit
        null,   // offset
        null,   // societyId
        null    // orgId
    );

    return APIResponse.send(res, APIResponse.successResponse("Request completed", result));
});

/* ======================= GET BY ID ======================= */
const getById = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);

    const data = await service.execute("GET_BY_ID", id);

    const record = (data && data[0] && data[0][0]) ? data[0][0] : null;

    return APIResponse.send(res, APIResponse.emptyOr404(record));
});

/* ======================= GET ALL ======================= */
const getAll = asyncHandler(async (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : null;
    const offset = req.query.offset ? parseInt(req.query.offset) : null;

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

    const data = await service.execute(
        "GET_ALL",
        null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null,
        limit,
        offset,
        safeSocietyId,
        safeOrgId
    );

    return APIResponse.send(res, APIResponse.successResponse("Maintenance requests", data?.[0] || []));
});

module.exports = {
    create,
    update,
    assign,
    complete,
    getById,
    getAll
};