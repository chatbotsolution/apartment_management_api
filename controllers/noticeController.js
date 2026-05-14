const service = require("../services/notice.service");
const APIResponse = require("../utils/response");
const asyncHandler = require("../middlewares/async.middleware");


/* ======================= GET ALL ======================= */
const getAll = asyncHandler(async (req, res) => {

    const societyId = parseInt(req.query.society_id);

    if (!societyId) {
        return APIResponse.send(
            res,
            APIResponse.badRequestResponse("society_id required")
        );
    }

    const data = await service.getAll(societyId);

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