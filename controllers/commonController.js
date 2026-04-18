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

/* ======================= GET OWNER DROPDOWN ======================= */
const getOwners = asyncHandler(async (req, res) => {
    console.log("Get Owner Dropdown :", req.url);

    const data = await commonService.getOwners();

    return APIResponse.send(res, APIResponse.emptyOr404(data));
});


/* ======================= GET BLOCK BY OWNER ======================= */
const getBlocksByOwner = asyncHandler(async (req, res) => {
    const { ownerId } = req.query;

    console.log("Get Blocks By Owner :", req.url);

    const data = await commonService.getBlocksByOwner(ownerId);

    return APIResponse.send(res, APIResponse.emptyOr404(data));
});


/* ======================= GET FLOOR BY OWNER + BLOCK ======================= */
const getFloorsByOwnerBlock = asyncHandler(async (req, res) => {
    const { ownerId, blockId } = req.query;

    console.log("Get Floors By Owner + Block :", req.url);

    const data = await commonService.getFloorsByOwnerBlock(ownerId, blockId);

    return APIResponse.send(res, APIResponse.emptyOr404(data));
});


/* ======================= GET FLAT BY OWNER + BLOCK + FLOOR ======================= */
const getFlatsByOwnerBlockFloor = asyncHandler(async (req, res) => {
    const { ownerId, blockId, floorId } = req.query;

    console.log("Get Flats By Owner + Block + Floor :", req.url);

    const data = await commonService.getFlatsByOwnerBlockFloor(ownerId, blockId, floorId);

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
    getOwners,
    getBlocksByOwner,
    getFloorsByOwnerBlock,
    getFlatsByOwnerBlockFloor,
    getAllNationality
};