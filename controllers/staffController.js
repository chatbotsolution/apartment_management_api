const service = require("../services/staff.service");
const APIResponse = require("../utils/response");
const asyncHandler = require("../middlewares/async.middleware");


/* ======================= INSERT ======================= */
const insert = asyncHandler(async (req, res) => {
    const body = req.body;

    const result = await service.execute(
        "INSERT",
        null,
        body.societyId,
        body.firstName,
        body.lastName,
        body.designation,
        body.department,
        body.phone,
        body.email,
        body.aadhaarNumber,
        body.dateOfBirth,
        body.genderId,
        body.joiningDate,
        body.leavingDate,
        body.statusId,
        body.salary,
        body.shiftTiming,
        body.address,
        body.emergencyContact,
        body.photoUrl
    );

    return APIResponse.send(res, APIResponse.successResponse("Staff created successfully", result));
});


/* ======================= UPDATE ======================= */
const update = asyncHandler(async (req, res) => {
    const body = req.body;

    const result = await service.execute(
        "UPDATE",
        body.staffId,
        body.societyId,
        body.firstName,
        body.lastName,
        body.designation,
        body.department,
        body.phone,
        body.email,
        body.aadhaarNumber,
        body.dateOfBirth,
        body.genderId,
        body.joiningDate,
        body.leavingDate,
        body.statusId,
        body.salary,
        body.shiftTiming,
        body.address,
        body.emergencyContact,
        body.photoUrl
    );

    return APIResponse.send(res, APIResponse.successResponse("Staff updated successfully", result));
});


/* ======================= DELETE (SOFT) ======================= */
const remove = asyncHandler(async (req, res) => {
    const { staffId } = req.body;

    const result = await service.execute("DELETE", staffId);

    return APIResponse.send(res, APIResponse.successResponse("Staff deactivated successfully", result));
});


/* ======================= GET BY ID ======================= */
const getById = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);

    const data = await service.execute("GET_BY_ID", id);

    return APIResponse.send(res, APIResponse.emptyOr404(data?.[0]));
});


/* ======================= GET ALL ======================= */
const getAll = asyncHandler(async (req, res) => {
    const societyId = parseInt(req.query.society_id);

    const data = await service.execute("GET_ALL", null, societyId);

    return APIResponse.send(res, APIResponse.successResponse("Fetched successfully", data?.[0]));
});


/* ======================= SEARCH ======================= */
const search = asyncHandler(async (req, res) => {
    const societyId = parseInt(req.query.society_id);
    const keyword = req.query.keyword || "";

    const data = await service.execute(
        "SEARCH",
        null,
        societyId,
        keyword
    );

    return APIResponse.send(res, APIResponse.successResponse("Search results", data?.[0]));
});


module.exports = {
    insert,
    update,
    remove,
    getById,
    getAll,
    search
};