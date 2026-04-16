const flatService = require("../services/flat.service");
const APIResponse = require("../utils/response");
const asyncHandler = require("../middlewares/async.middleware");

// GET ALL
const getAll = asyncHandler(async (req, res) => {
    const data = await flatService.getAll();
    return APIResponse.send(res, APIResponse.emptyOr404(data));
});

// GET BY ID
const getById = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const data = await flatService.getById(id);
    return APIResponse.send(res, APIResponse.emptyOr404(data));
});

// GET BY BLOCK
const getByBlock = asyncHandler(async (req, res) => {
    const blockId = parseInt(req.params.blockId);
    const data = await flatService.getByBlock(blockId);
    return APIResponse.send(res, APIResponse.emptyOr404(data));
});
// CREATE
const create = asyncHandler(async (req, res) => {
    const {
        Block_Id,
        Flat_Number,
        Floor_Number,
        Flat_Type,
        Super_Builtup_Area,
        BuiltUp_Area,
        Carpet_Area,
        Occup_Status,
        isRent,
        Parking
    } = req.body;

    const result = await flatService.create({
        Block_Id,
        Flat_Number,
        Floor_Number,
        Flat_Type,
        Super_Builtup_Area,
        BuiltUp_Area,
        Carpet_Area,
        Occup_Status,
        isRent,
        Parking
    });

    return APIResponse.send(res, APIResponse.successResponse(result));
});

// UPDATE
const update = asyncHandler(async (req, res) => {
    const {
        Flat_Id,
        Block_Id,
        Flat_Number,
        Floor_Number,
        Flat_Type,
        Super_Builtup_Area,
        BuiltUp_Area,
        Carpet_Area,
        Occup_Status,
        isRent,
        Parking
    } = req.body;

    const result = await flatService.update({
        Flat_Id,
        Block_Id,
        Flat_Number,
        Floor_Number,
        Flat_Type,
        Super_Builtup_Area,
        BuiltUp_Area,
        Carpet_Area,
        Occup_Status,
        isRent,
        Parking
    });

    return APIResponse.send(res, APIResponse.successResponse(result));
});

// DELETE
const remove = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const result = await flatService.delete(id);
    return APIResponse.send(res, APIResponse.successResponse(result));
});

module.exports = {
    getAll,
    getById,
    getByBlock,
    create,
    update,
    remove
};