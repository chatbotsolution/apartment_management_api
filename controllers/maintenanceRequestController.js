const fs = require("fs");
const path = require("path");
const service = require("../services/maintenanceRequest.service.js");
const APIResponse = require("../utils/response");
const asyncHandler = require("../middlewares/async.middleware");

/* ======================= CREATE REQUEST ======================= */
const create = asyncHandler(async (req, res) => {
    const b = req.body || {};
    let beforePhoto = b.beforePhotoUrl || null; 

    // 2. If a file was uploaded, save it to disk and get the new URL
    if (req.file) {
        const filename = `maintenance_before_${Date.now()}${path.extname(req.file.originalname)}`;
        const savePath = path.join(process.cwd(), "public", "uploads", filename);
        fs.writeFileSync(savePath, req.file.buffer);
        beforePhoto = `/uploads/${filename}`;
    }

    const result = await service.execute(
        "INSERT",           // 1. action
        null,               // 2. requestId
        b.flatId,           // 3. flatId
        b.ownerId || null,  // 4. ownerId
        b.tenantId || null, // 5. tenantId
        b.title,            // 6. title
        b.description,      // 7. description
        b.categoryId,       // 8. categoryId
        b.priorityId,       // 9. priorityId
        b.statusId || 70,   // 10. statusId (e.g., 1 = Open)
        null,               // 11. assignedStaffId
        null,               // 12. scheduledAt
        null,               // 13. completedAt
        b.estimatedCost || null, // 14. estimatedCost
        null,               // 15. actualCost
        null,               // 16. costBorneById
        null,               // 17. remarks
        beforePhoto,        // 18. beforePhotoUrl (✅ FIXED: Using the extracted variable)
        null                // 19. afterPhotoUrl
    );

    return APIResponse.send(res, APIResponse.successResponse("Maintenance request created successfully", result));
});

/* ======================= UPDATE BASIC INFO ======================= */
const update = asyncHandler(async (req, res) => {
    const b = req.body || {};
    let beforePhoto = b.beforePhotoUrl || null; 

    // 2. If a file was uploaded, save it to disk and get the new URL
    if (req.file) {
        const filename = `maintenance_before_${Date.now()}${path.extname(req.file.originalname)}`;
        const savePath = path.join(process.cwd(), "public", "uploads", filename);
        fs.writeFileSync(savePath, req.file.buffer);
        beforePhoto = `/uploads/${filename}`;
    }

    const result = await service.execute(
        "UPDATE",           // 1. action
        b.requestId,        // 2. requestId
        null,               // 3. flatId
        null,               // 4. ownerId
        null,               // 5. tenantId
        b.title,            // 6. title
        b.description,      // 7. description
        b.categoryId,       // 8. categoryId
        b.priorityId,       // 9. priorityId
        b.statusId,         // 10. statusId
        null,               // 11. assignedStaffId
        null,               // 12. scheduledAt
        null,               // 13. completedAt
        b.estimatedCost || null, // 14. estimatedCost
        null,               // 15. actualCost
        null,               // 16. costBorneById
        null,               // 17. remarks
        beforePhoto,        // 18. beforePhotoUrl (✅ FIXED: Using the extracted variable)
        null                // 19. afterPhotoUrl
    );

    return APIResponse.send(res, APIResponse.successResponse("Maintenance request updated", result));
});

/* ======================= ASSIGN STAFF ======================= */
const assign = asyncHandler(async (req, res) => {
    const b = req.body || {};

    const result = await service.execute(
        "ASSIGN",           // 1. action
        b.requestId,        // 2. requestId
        null,               // 3. flatId
        null,               // 4. ownerId
        null,               // 5. tenantId
        null,               // 6. title
        null,               // 7. description
        null,               // 8. categoryId
        null,               // 9. priorityId
        b.statusId,         // 10. statusId
        b.assignedStaffId,  // 11. assignedStaffId
        b.scheduledAt,      // 12. scheduledAt
        null,               // 13. completedAt
        b.estimatedCost || null, // 14. estimatedCost
        null,               // 15. actualCost
        null,               // 16. costBorneById
        null,               // 17. remarks
        null,               // 18. beforePhotoUrl
        null                // 19. afterPhotoUrl
    );

    return APIResponse.send(res, APIResponse.successResponse("Staff assigned", result));
});

/* ======================= COMPLETE REQUEST ======================= */
const complete = asyncHandler(async (req, res) => {
    const b = req.body || {};
    let afterPhoto = b.afterPhotoUrl || null;

    // 2. If a file was uploaded, save it to disk and get the new URL
    if (req.file) {
        const filename = `maintenance_after_${Date.now()}${path.extname(req.file.originalname)}`;
        const savePath = path.join(process.cwd(), "public", "uploads", filename);
        fs.writeFileSync(savePath, req.file.buffer);
        afterPhoto = `/uploads/${filename}`;
    }

    const result = await service.execute(
        "COMPLETE",         // 1. action
        b.requestId,        // 2. requestId
        null,               // 3. flatId
        null,               // 4. ownerId
        null,               // 5. tenantId
        null,               // 6. title
        null,               // 7. description
        null,               // 8. categoryId
        null,               // 9. priorityId
        b.statusId,         // 10. statusId
        null,               // 11. assignedStaffId
        null,               // 12. scheduledAt
        b.completedAt,      // 13. completedAt
        null,               // 14. estimatedCost
        b.actualCost,       // 15. actualCost
        b.costBorneById,    // 16. costBorneById
        b.remarks,          // 17. remarks
        null,               // 18. beforePhotoUrl
        afterPhoto          // 19. afterPhotoUrl (✅ FIXED: Using the extracted variable)
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

    const data = await service.execute(
        "GET_ALL", 
        null, null, null, null, null, null, null, null, null, 
        null, null, null, null, null, null, null, null, null, 
        limit, offset
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