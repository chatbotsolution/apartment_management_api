const stafftypeService = require("../services/stafftype.service");
const APIResponse = require("../utils/response");
const asyncHandler = require("../middlewares/async.middleware");


/* ======================= GET ALL ======================= */
const getAll = asyncHandler(async (req, res) => {
    console.log("Get All StaffType Request : ", req);
    const data = await stafftypeService.getAll();
    return APIResponse.send(res, APIResponse.emptyOr404(data));
});


/* ======================= GET BY ID ======================= */
const getById = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const data = await stafftypeService.getById(id);
    return APIResponse.send(res, APIResponse.emptyOr404(data));
});


/* ======================= CREATE ======================= */
const create = asyncHandler(async (req, res) => {
    const result = await stafftypeService.create(req.body);

    if (!result || result.StaffTypeId === 0) {
        return APIResponse.send(res, APIResponse.badRequestResponse(result));
    }

    return APIResponse.send(res, APIResponse.successResponse(result));
});


/* ======================= UPDATE ======================= */
const update = asyncHandler(async (req, res) => {
    const result = await stafftypeService.update(req.body);
    return APIResponse.send(res, APIResponse.successResponse(result));
});


/* ======================= STATUS CHANGE ======================= */
const changeStatus = asyncHandler(async (req, res) => {
    const StaffTypeId = parseInt(req.params.StaffTypeId);
    const UpdatedBy = parseInt(req.params.UpdatedBy);
    const IsActive = req.params.IsActive === "true";

    console.log("Change Status Data : ", { StaffTypeId, IsActive, UpdatedBy });

    const result = await stafftypeService.changeStatus({
        StaffTypeId,
        IsActive,
        UpdatedBy
    });

    console.log("Status Change Result : ", result);

    return APIResponse.send(res, APIResponse.successResponse(result));
});


module.exports = {
    getAll,
    getById,
    create,
    update,
    changeStatus
};