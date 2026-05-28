const service = require("../services/parkingSlot.service");
const APIResponse = require("../utils/response");
const asyncHandler = require("../middlewares/async.middleware");


/* ======================= INSERT ======================= */
const insert = asyncHandler(async (req, res) => {
    const body = req.body;

    await service.execute(
        "INSERT",
        null,
        body.societyId,
        body.slotNumber,
        body.level,
        body.slotTypeId,
        body.isCovered,
        body.isOccupied,
        body.hasCharger,
        body.statusId,
        body.monthlyCharge,
        body.notes,
        null
    );

    return APIResponse.send(res, APIResponse.successResponse(null));
});


/* ======================= UPDATE ======================= */
const update = asyncHandler(async (req, res) => {
    const body = req.body;

    await service.execute(
        "UPDATE",
        body.slotId,
        body.societyId,
        body.slotNumber,
        body.level,
        body.slotTypeId,
        body.isCovered,
        body.isOccupied,
        body.hasCharger,
        body.statusId,
        body.monthlyCharge,
        body.notes,
        null
    );

    return APIResponse.send(res, APIResponse.successResponse(null));
});


/* ======================= DELETE (SOFT) ======================= */
const remove = asyncHandler(async (req, res) => {
    const { slotId, statusId } = req.body;

    await service.execute(
        "DELETE",
        slotId,
        null, null, null, null, null, null, null,
        statusId,
        null, null, null
    );

    return APIResponse.send(res, APIResponse.successResponse(null));
});


/* ======================= UPDATE OCCUPANCY ======================= */
const updateOccupancy = asyncHandler(async (req, res) => {
    const { slotId, isOccupied } = req.body;

    await service.execute(
        "UPDATE_OCCUPANCY",
        slotId,
        null, null, null, null, null,
        isOccupied,
        null, null, null, null, null
    );

    return APIResponse.send(res, APIResponse.successResponse(null));
});


/* ======================= GET BY ID ======================= */
const getById = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);

    const data = await service.execute("GET_BY_ID", id);

    return APIResponse.send(res, APIResponse.emptyOr404(data?.[0]));
});


/* ======================= GET ALL ======================= */
const getAll = asyncHandler(async (req, res) => {
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
        "GET_ALL",
        null,
        safeSocietyId,
        null, null, null, null, null, null, null, null, null,
        safeOrgId
    );

    return APIResponse.send(res, APIResponse.emptyOr404(data?.[0]));
});


/* ======================= GET AVAILABLE ======================= */
const getAvailable = asyncHandler(async (req, res) => {
    const { society_id, org_id } = req.query;

    const safeSocietyId = society_id ? parseInt(society_id) : null;
    const safeOrgId = org_id ? parseInt(org_id) : null;

    const data = await service.execute(
        "GET_AVAILABLE",
        null,
        safeSocietyId,
        null, null, null, null, null, null, null, null, null,
        safeOrgId
    );

    return APIResponse.send(res, APIResponse.emptyOr404(data?.[0]));
});


module.exports = {
    insert,
    update,
    remove,
    updateOccupancy,
    getById,
    getAll,
    getAvailable
};