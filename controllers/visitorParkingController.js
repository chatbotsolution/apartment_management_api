const service = require("../services/visitorParking.service");
const APIResponse = require("../utils/response");
const asyncHandler = require("../middlewares/async.middleware");


/* ======================= ASSIGN SLOT ======================= */
const assign = asyncHandler(async (req, res) => {
    const body = req.body;

    await service.execute(
        "ASSIGN",
        null,
        body.visitorId,
        body.slotId,
        body.vehicleNumber,
        body.vehicleType,
        body.statusId,
        null,
        null
    );

    return APIResponse.send(res, APIResponse.successResponse(null));
});


/* ======================= UPDATE ======================= */
const update = asyncHandler(async (req, res) => {
    const body = req.body;

    await service.execute(
        "UPDATE",
        body.visitorParkingId,
        null,
        null,
        body.vehicleNumber,
        body.vehicleType,
        body.statusId,
        null,
        null
    );

    return APIResponse.send(res, APIResponse.successResponse(null));
});


/* ======================= RELEASE SLOT ======================= */
const release = asyncHandler(async (req, res) => {
    const body = req.body;

    await service.execute(
        "RELEASE",
        body.visitorParkingId,
        null,
        body.slotId,
        null,
        null,
        body.statusId,
        null,
        null
    );

    return APIResponse.send(res, APIResponse.successResponse(null));
});


/* ======================= GET ACTIVE ======================= */
const getActive = asyncHandler(async (req, res) => {
    const { society_id, org_id } = req.query;

    const hasSocietyId = society_id && String(society_id).trim() !== "";
    const hasOrgId = org_id && String(org_id).trim() !== "";

    if (!hasSocietyId && !hasOrgId) {
        return APIResponse.send(
            res,
            APIResponse.badRequestResponse("Either society_id or org_id is required")
        );
    }

    const safeSocietyId = hasSocietyId ? parseInt(society_id) : null;
    const safeOrgId = hasOrgId ? parseInt(org_id) : null;

    const data = await service.execute(
        "GET_ACTIVE",
        null, null, null, null, null, null,
        safeSocietyId,
        safeOrgId
    );

    return APIResponse.send(res, APIResponse.emptyOr404(data?.[0]));
});


/* ======================= GET BY ID ======================= */
const getById = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);

    const data = await service.execute("GET_BY_ID", id);

    return APIResponse.send(res, APIResponse.emptyOr404(data?.[0]));
});


/* ======================= GET HISTORY ======================= */
const getHistory = asyncHandler(async (req, res) => {
    const { society_id, org_id } = req.query;

    const hasSocietyId = society_id && String(society_id).trim() !== "";
    const hasOrgId = org_id && String(org_id).trim() !== "";

    if (!hasSocietyId && !hasOrgId) {
        return APIResponse.send(
            res,
            APIResponse.badRequestResponse("Either society_id or org_id is required")
        );
    }

    const safeSocietyId = hasSocietyId ? parseInt(society_id) : null;
    const safeOrgId = hasOrgId ? parseInt(org_id) : null;

    const data = await service.execute(
        "GET_HISTORY",
        null, null, null, null, null, null,
        safeSocietyId,
        safeOrgId
    );

    return APIResponse.send(res, APIResponse.emptyOr404(data?.[0]));
});


module.exports = {
    assign,
    update,
    release,
    getActive,
    getById,
    getHistory
};