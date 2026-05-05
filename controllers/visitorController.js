const service = require("../services/visitor.service");
const APIResponse = require("../utils/response");
const asyncHandler = require("../middlewares/async.middleware");


/* ======================= CHECK-IN ======================= */
const checkIn = asyncHandler(async (req, res) => {
    const b = req.body;

    const result = await service.execute(
        "CHECKIN",
        null,
        b.hostFlatId,
        b.visitorName,
        b.visitorPhone,
        b.vehicleNumber,
        b.vehicleType,
        b.purpose,
        b.expectedCheckout,
        b.idProofTypeId,
        b.idProofNumber,
        b.approvedBy,
        b.entryStatusId,
        b.visitorTypeId,
        b.notes,
        b.createdBy,
        b.societyId
    );

    return APIResponse.send(res, APIResponse.successResponse("Visitor checked-in", result));
});


/* ======================= CHECK-OUT ======================= */
const checkOut = asyncHandler(async (req, res) => {
    const b = req.body;

    const result = await service.execute(
        "CHECKOUT",
        b.visitorId,
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
        b.entryStatusId,
        null,
        null,
        null,
        b.societyId
    );

    return APIResponse.send(res, APIResponse.successResponse("Visitor checked-out", result));
});


/* ======================= UPDATE ======================= */
const update = asyncHandler(async (req, res) => {
    const b = req.body;

    const result = await service.execute(
        "UPDATE",
        b.visitorId,
        b.hostFlatId,
        b.visitorName,
        b.visitorPhone,
        b.vehicleNumber,
        b.vehicleType,
        b.purpose,
        b.expectedCheckout,
        b.idProofTypeId,
        b.idProofNumber,
        b.approvedBy,
        b.entryStatusId,
        b.visitorTypeId,
        b.notes,
        null,
        null,
        b.societyId
    );

    return APIResponse.send(res, APIResponse.successResponse("Visitor updated", result));
});


/* ======================= GET BY ID ======================= */
const getById = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);

    const data = await service.execute("GET_BY_ID", id);

    return APIResponse.send(res, APIResponse.emptyOr404(data?.[0]));
});


/* ======================= TODAY VISITORS ======================= */
const getToday = asyncHandler(async (req, res) => {
    const societyId = parseInt(req.query.societyId);

    const data = await service.execute("GET_TODAY", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, societyId);

    return APIResponse.send(res, APIResponse.successResponse("Today visitors", data?.[0]));
});


/* ======================= ACTIVE VISITORS ======================= */
const getActive = asyncHandler(async (req, res) => {
    const societyId = parseInt(req.query.societyId);

    const data = await service.execute("GET_ACTIVE", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, societyId);

    return APIResponse.send(res, APIResponse.successResponse("Active visitors", data?.[0]));
});


/* ======================= SEARCH ======================= */
const search = asyncHandler(async (req, res) => {
    const societyId = parseInt(req.query.societyId);
    const keyword = req.query.keyword || "";

    const data = await service.execute(
        "SEARCH",
        null,
        null,
        keyword,
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
        societyId
    );

    return APIResponse.send(res, APIResponse.successResponse("Search result", data?.[0]));
});


module.exports = {
    checkIn,
    checkOut,
    update,
    getById,
    getToday,
    getActive,
    search
};