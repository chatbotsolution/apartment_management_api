const service = require("../services/manageOrganization.service");
const APIResponse = require("../utils/response");
const asyncHandler = require("../middlewares/async.middleware");

/* ================= GET ALL ================= */
const getAll = asyncHandler(async (req, res) => {
    const data = await service.getAll();
    return APIResponse.send(
        res,
        APIResponse.successResponse(data)
    );
});

/* ================= GET SOCIETIES BY ORG ================= */
const getSocietiesByOrg = asyncHandler(async (req, res) => {
    const orgId = parseInt(req.params.id);
    const data = await service.getSocietiesByOrg(orgId);
    return APIResponse.send(
        res,
        APIResponse.successResponse(data)
    );
});

/* ================= GET BY ID ================= */
const getById = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const data = await service.getById(id);
    return APIResponse.send(
        res,
        APIResponse.emptyOr404(data)
    );
});

/* ================= UPDATE ================= */
const update = asyncHandler(async (req, res) => {
    const b = req.body;
    if (!b.org_id) {
        return APIResponse.send(res, APIResponse.errorResponse("Organization ID is required"));
    }
    const result = await service.update(b);
    return APIResponse.send(res, APIResponse.successResponse(result, "Organization updated successfully"));
});

/* ================= DELETE ================= */
const remove = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const result = await service.remove(id);
    return APIResponse.send(res, APIResponse.successResponse("Organization deleted", result));
});

module.exports = {
    getAll,
    getSocietiesByOrg,
    getById,
    update,
    remove
};
