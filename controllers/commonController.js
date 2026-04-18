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

/* ======================= GET FLOOR DROPDOWN ======================= */
const getAllFloors = asyncHandler(async (req, res) => {
    console.log("Get Floor Dropdown Request :", req.url);

    const data = await commonService.getAllFloors();

    return APIResponse.send(res, APIResponse.emptyOr404(data));
});

const getAllNationality = asyncHandler(async (req, res) => {
    console.log("Get Nationality Dropdown Request :", req.url);

    const data = await commonService.getAllNationality();

    return APIResponse.send(res, APIResponse.emptyOr404(data));
});

module.exports = {
    getAllCountry,
    getAllState,
    getAllDistrict,
    getAllFloors,
    getAllNationality
};