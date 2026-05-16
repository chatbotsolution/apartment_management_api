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
        body.notes
    );

    return APIResponse.send(
        res,
        APIResponse.successResponse(null)
    );
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
        body.notes
    );

    return APIResponse.send(
        res,
        APIResponse.successResponse(null)
    );
});


/* ======================= DELETE (SOFT) ======================= */
const remove = asyncHandler(async (req, res) => {

    const { slotId, statusId } = req.body;

    await service.execute(
        "DELETE",
        slotId,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        statusId
    );

    return APIResponse.send(
        res,
        APIResponse.successResponse(null)
    );
});


/* ======================= UPDATE OCCUPANCY ======================= */
const updateOccupancy = asyncHandler(async (req, res) => {

    const { slotId, isOccupied } = req.body;

    await service.execute(
        "UPDATE_OCCUPANCY",
        slotId,
        null,
        null,
        null,
        null,
        null,
        isOccupied
    );

    return APIResponse.send(
        res,
        APIResponse.successResponse(null)
    );
});


/* ======================= GET BY ID ======================= */
const getById = asyncHandler(async (req, res) => {

    const id = parseInt(req.params.id);

    const data = await service.execute(
        "GET_BY_ID",
        id
    );

    return APIResponse.send(
        res,
        APIResponse.emptyOr404(data?.[0])
    );
});


/* ======================= GET ALL ======================= */
const getAll = asyncHandler(async (req, res) => {

    const societyId = req.query.society_id || null;

    const data = await service.execute(
        "GET_ALL",
        null,
        societyId
    );

    return APIResponse.send(
        res,
        APIResponse.emptyOr404(data?.[0])
    );
});


/* ======================= GET AVAILABLE ======================= */
const getAvailable = asyncHandler(async (req, res) => {

    const societyId = req.query.society_id || null;

    const data = await service.execute(
        "GET_AVAILABLE",
        null,
        societyId
    );

    return APIResponse.send(
        res,
        APIResponse.emptyOr404(data?.[0])
    );
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