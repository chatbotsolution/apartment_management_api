const service = require("../services/owner.service");
const APIResponse = require("../utils/response");
const asyncHandler = require("../middlewares/async.middleware");

/* ======================= GET ALL ======================= */
const getAll = asyncHandler(async (req, res) => {
    const societyId = parseInt(req.query.society_id);
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    if (!societyId) {
        return APIResponse.send(res, APIResponse.badRequestResponse("society_id required"));
    }

    const result = await service.getAll(societyId, page, pageSize);

    return APIResponse.send(res, {
        data: result.data,
        total: result.total,
        page,
        pageSize
    });
});


/* ======================= SEARCH ======================= */
const search = asyncHandler(async (req, res) => {
    const societyId = parseInt(req.query.society_id);
    const keyword = req.query.keyword || "";
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    if (!societyId) {
        return APIResponse.send(res, APIResponse.badRequestResponse("society_id required"));
    }

    const result = await service.search(societyId, keyword, page, pageSize);

    return APIResponse.send(res, {
        data: result.data,
        total: result.total,
        page,
        pageSize
    });
});


/* ======================= GET BY ID ======================= */
const getById = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const societyId = parseInt(req.query.society_id);

    const data = await service.getById(id, societyId);

    return APIResponse.send(res, APIResponse.emptyOr404(data));
});

module.exports = {
    getAll,
    search,
    getById
};