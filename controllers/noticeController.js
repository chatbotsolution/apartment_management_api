const service = require("../services/notice.service");
const APIResponse = require("../utils/response");
const asyncHandler = require("../middlewares/async.middleware");


/* ======================= GET ALL ======================= */
const getAll = asyncHandler(async (req, res) => {
    const { society_id, org_id } = req.query;

    const hasSocietyId = society_id && String(society_id).trim() !== "";
    const hasOrgId = org_id && String(org_id).trim() !== "";

    // Either society_id OR org_id must be provided
    if (!hasSocietyId && !hasOrgId) {
        return APIResponse.send(
            res,
            APIResponse.badRequestResponse("Either society_id or org_id is required")
        );
    }

    const safeSocietyId = hasSocietyId ? String(society_id).trim() : null;
    const safeOrgId = hasOrgId ? parseInt(org_id) : null;

    const data = await service.getAll(safeSocietyId, safeOrgId);

    return APIResponse.send(res, {
        statusCode: 200,
        success: true,
        message: "Notices fetched successfully",
        data
    });
});


/* ======================= GET BY ID ======================= */
const getById = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);

    const data = await service.getById(id);

    return APIResponse.send(res, {
        statusCode: 200,
        success: true,
        message: "Notice fetched successfully",
        data
    });
});


/* ======================= CREATE ======================= */
const create = asyncHandler(async (req, res) => {
    await service.create(req.body);

    return APIResponse.send(res, {
        statusCode: 200,
        success: true,
        message: "Notice created successfully"
    });
});


/* ======================= UPDATE ======================= */
const update = asyncHandler(async (req, res) => {
    await service.update(req.body);

    return APIResponse.send(res, {
        statusCode: 200,
        success: true,
        message: "Notice updated successfully"
    });
});


/* ======================= DELETE ======================= */
const remove = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);

    await service.remove(id);

    return APIResponse.send(res, {
        statusCode: 200,
        success: true,
        message: "Notice deleted successfully"
    });
});


module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};