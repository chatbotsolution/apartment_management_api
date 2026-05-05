const service = require("../services/visitorParking.service");
const APIResponse = require("../utils/response");
const asyncHandler = require("../middlewares/async.middleware");


/* ======================= ASSIGN SLOT ======================= */
const assign = asyncHandler(async (req, res) => {
    const b = req.body;

    const result = await service.execute(
        "ASSIGN",
        b.visitorId,
        b.slotId,
        b.vehicleNumber,
        b.vehicleType,
        b.statusId
    );

    return APIResponse.send(
        res,
        APIResponse.successResponse("Parking slot assigned", result)
    );
});


/* ======================= RELEASE SLOT ======================= */
const release = asyncHandler(async (req, res) => {
    const b = req.body;

    const result = await service.execute(
        "RELEASE",
        b.visitorId,
        b.slotId,
        null,
        null,
        b.statusId
    );

    return APIResponse.send(
        res,
        APIResponse.successResponse("Parking slot released", result)
    );
});


/* ======================= GET ACTIVE ======================= */
const getActive = asyncHandler(async (req, res) => {

    const result = await service.execute(
        "GET_ACTIVE"
    );

    return APIResponse.send(
        res,
        APIResponse.successResponse("Active visitor parking", result?.[0])
    );
});


module.exports = {
    assign,
    release,
    getActive
};