const service = require("../services/tenant.service");
const APIResponse = require("../utils/response");
const asyncHandler = require("../middlewares/async.middleware");


/* ======================= INSERT ======================= */
const insert = asyncHandler(async (req, res) => {
    const b = req.body;

    const result = await service.execute(
        "INSERT",
        null,
        b.flatId,
        b.ownerId,
        b.firstName,
        b.lastName,
        b.email,
        b.phone,
        b.alternatePhone,
        b.aadhaarNumber,
        b.dateOfBirth,
        b.genderId,
        b.occupation,
        b.employerName,
        b.totalOccupants,
        b.leaseStart,
        b.leaseEnd,
        b.monthlyRent,
        b.securityDeposit,
        b.rentDueDay,
        b.isActive,
        b.permanentAddress,
        b.emergencyContactName,
        b.emergencyContactPhone,
        b.profilePhotoUrl,
        b.agreementDocUrl,
        b.policeVerification,
        b.society
    );

    return APIResponse.send(res, APIResponse.successResponse("Tenant created", result));
});


/* ======================= UPDATE ======================= */
const update = asyncHandler(async (req, res) => {
    const b = req.body;

    const result = await service.execute(
        "UPDATE",
        b.tenantId,
        b.flatId,
        b.ownerId,
        b.firstName,
        b.lastName,
        b.email,
        b.phone,
        b.alternatePhone,
        b.aadhaarNumber,
        b.dateOfBirth,
        b.genderId,
        b.occupation,
        b.employerName,
        b.totalOccupants,
        b.leaseStart,
        b.leaseEnd,
        b.monthlyRent,
        b.securityDeposit,
        b.rentDueDay,
        b.isActive,
        b.permanentAddress,
        b.emergencyContactName,
        b.emergencyContactPhone,
        b.profilePhotoUrl,
        b.agreementDocUrl,
        b.policeVerification,
        b.society
    );

    return APIResponse.send(res, APIResponse.successResponse("Tenant updated", result));
});


/* ======================= DELETE ======================= */
const remove = asyncHandler(async (req, res) => {
    const { tenantId } = req.body;

    const result = await service.execute("DELETE", tenantId);

    return APIResponse.send(res, APIResponse.successResponse("Tenant deactivated", result));
});


/* ======================= GET BY ID ======================= */
const getById = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);

    const data = await service.execute("GET_BY_ID", id);

    return APIResponse.send(res, APIResponse.emptyOr404(data?.[0]));
});


/* ======================= GET ALL ======================= */
const getAll = asyncHandler(async (req, res) => {
    const society = parseInt(req.query.society);

    const data = await service.execute("GET_ALL", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, society);

    return APIResponse.send(res, APIResponse.successResponse("Fetched", data?.[0]));
});


/* ======================= SEARCH ======================= */
const search = asyncHandler(async (req, res) => {
    const society = parseInt(req.query.society);
    const keyword = req.query.keyword || "";

    const data = await service.execute(
        "SEARCH",
        null,
        null,
        null,
        keyword,
        keyword,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        society
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