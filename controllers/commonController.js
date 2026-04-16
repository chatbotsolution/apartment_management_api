const commonService = require("../services/common.service");
const APIResponse = require("../utils/response");
const asyncHandler = require("../middlewares/async.middleware");


/* ======================= GET ALL COUNTRY ======================= */
const getAllCountry = asyncHandler(async (req, res) => {
    console.log("Get All Country Request : ", req.url);

    const data = await commonService.getAllCountry();

    return APIResponse.send(res, APIResponse.emptyOr404(data));
});


/* ======================= GET ALL STATE ======================= */
const getAllState = asyncHandler(async (req, res) => {
    console.log("Get All State Request : ", req.url);

    const data = await commonService.getAllState();

    return APIResponse.send(res, APIResponse.emptyOr404(data));
});


/* ======================= GET ALL DISTRICT ======================= */
const getAllDistrict = asyncHandler(async (req, res) => {
    console.log("Get All District Request : ", req.url);

    const data = await commonService.getAllDistrict();

    return APIResponse.send(res, APIResponse.emptyOr404(data));
});


module.exports = {
    getAllCountry,
    getAllState,
    getAllDistrict
};