const service = require("../services/bhkService"); // Check your exact file name
const APIResponse = require("../utils/response");
const asyncHandler = require("../middlewares/async.middleware");

/* ======================= GET ALL ======================= */
const getAll = asyncHandler(async (req, res) => {
    // 1. Sanitize society_id to securely handle "25,26" strings for the database
    let societyId = req.query.society_id ? req.query.society_id.toString() : null;
    if (societyId) {
        societyId = societyId.replace(/[^0-9,]/g, "");
    }

    const args = Array(6).fill(null);
    args[0] = "GET_ALL";
    args[2] = societyId; // p_society_id

    const data = await service.execute(...args);
    return APIResponse.send(res, APIResponse.successResponse("BHK Master records fetched successfully", data?.[0] || []));
});

/* ======================= GET BY ID ======================= */
const getById = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return APIResponse.send(res, APIResponse.badRequestResponse("Valid bhk_id is required"));
    }

    const args = Array(6).fill(null);
    args[0] = "GET_BY_ID";
    args[1] = id; // p_bhk_id

    const data = await service.execute(...args);
    return APIResponse.send(res, APIResponse.emptyOr404(data?.[0]));
});

/* ======================= CREATE ======================= */
const create = asyncHandler(async (req, res) => {
    const b = req.body;

    const args = Array(6).fill(null);
    args[0] = "INSERT";
    args[2] = b.society_id || null;
    args[3] = b.bhk_type_id || null;
    args[4] = b.area_sqft || 0;
    args[5] = b.monthly_maintenance || 0;

    const result = await service.execute(...args);
    return APIResponse.send(res, APIResponse.successResponse("BHK record created successfully", result));
});

/* ======================= UPDATE ======================= */
const update = asyncHandler(async (req, res) => {
    const b = req.body;

    const args = Array(6).fill(null);
    args[0] = "UPDATE";
    args[1] = b.bhk_id;
    args[2] = b.society_id || null;
    args[3] = b.bhk_type_id || null;
    args[4] = b.area_sqft || 0;
    args[5] = b.monthly_maintenance || 0;

    const result = await service.execute(...args);
    return APIResponse.send(res, APIResponse.successResponse("BHK record updated successfully", result));
});

/* ======================= DELETE ======================= */
const remove = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);

    const args = Array(6).fill(null);
    args[0] = "DELETE";
    args[1] = id;

    const result = await service.execute(...args);
    return APIResponse.send(res, APIResponse.successResponse("BHK record deleted successfully", result));
});

module.exports = { getAll, getById, create, update, remove };