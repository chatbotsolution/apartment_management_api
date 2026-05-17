const service = require("../services/block.service");
const APIResponse = require("../utils/response");
const asyncHandler = require("../middlewares/async.middleware");

/* ======================= GET ALL ======================= */
const getAll = asyncHandler(async (req, res) => {
    // 1. Sanitize society_id to securely handle "25,26" strings for the database
    let societyId = req.query.society_id ? req.query.society_id.toString() : null;
    if (societyId) {
        societyId = societyId.replace(/[^0-9,]/g, "");
    }

    const args = Array(11).fill(null);
    args[0] = "GET_ALL";
    args[2] = societyId; // p_society_id

    const data = await service.execute(...args);
    return APIResponse.send(res, APIResponse.successResponse(data?.[0] || [], "Blocks fetched successfully"));
});

/* ======================= GET BY ID ======================= */
const getById = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return APIResponse.send(res, APIResponse.badRequestResponse("Valid block_id is required"));
    }

    const args = Array(11).fill(null);
    args[0] = "GET_BY_ID";
    args[1] = id; // p_block_id

    const data = await service.execute(...args);
    return APIResponse.send(res, APIResponse.emptyOr404(data?.[0]));
});

/* ======================= CREATE ======================= */
const create = asyncHandler(async (req, res) => {
    const b = req.body;

    const args = Array(11).fill(null);
    args[0] = "INSERT";
    args[2] = b.society_id || null;
    args[3] = b.block_name || null;
    args[4] = b.block_code || null;
    args[5] = b.total_floors || 0;
    args[6] = b.total_flats || 0;
    args[7] = b.block_type_id || null;
    args[8] = b.year_built || null;
    args[9] = b.lift_count || 0;
    args[10] = b.is_active !== undefined ? b.is_active : 1;

    const result = await service.execute(...args);
    return APIResponse.send(res, APIResponse.successResponse("Block created successfully", result));
});

/* ======================= UPDATE ======================= */
const update = asyncHandler(async (req, res) => {
    const b = req.body;

    const args = Array(11).fill(null);
    args[0] = "UPDATE";
    args[1] = b.block_id;
    args[2] = b.society_id || null;
    args[3] = b.block_name || null;
    args[4] = b.block_code || null;
    args[5] = b.total_floors || 0;
    args[6] = b.total_flats || 0;
    args[7] = b.block_type_id || null;
    args[8] = b.year_built || null;
    args[9] = b.lift_count || 0;
    args[10] = b.is_active !== undefined ? b.is_active : 1;

    const result = await service.execute(...args);
    return APIResponse.send(res, APIResponse.successResponse("Block updated successfully", result));
});

/* ======================= DELETE ======================= */
const remove = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);

    const args = Array(11).fill(null);
    args[0] = "DELETE";
    args[1] = id;

    const result = await service.execute(...args);
    return APIResponse.send(res, APIResponse.successResponse("Block deleted successfully", result));
});

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};