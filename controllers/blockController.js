const blockService = require("../services/block.service");
const APIResponse = require("../utils/response");
const asyncHandler = require("../middlewares/async.middleware");

/**
 * BlockMasterController
 */

// GET: api/BlockMaster/GetAllBlock
const getAll = asyncHandler(async (req, res) => {
    const data = await blockService.getAll();

    const response = APIResponse.emptyOr404(data);

    return APIResponse.send(res, response);
});


// GET: api/BlockMaster/GetBlockById/1
const getById = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);

    const data = await blockService.getById(id);

    const response = APIResponse.emptyOr404(data);

    return APIResponse.send(res, response);
});


// POST: api/BlockMaster/CreateBlock
const create = asyncHandler(async (req, res) => {
    const result = await blockService.create(req.body);

    const response = APIResponse.successResponse(result);

    return APIResponse.send(res, response);
});


// PUT: api/BlockMaster/UpdateBlock
const update = asyncHandler(async (req, res) => {
    const result = await blockService.update(req.body);

    const response = APIResponse.successResponse(result);

    return APIResponse.send(res, response);
});


// DELETE: api/BlockMaster/DeleteBlock/1
const remove = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);

    const result = await blockService.delete(id);

    const response = APIResponse.successResponse(result);

    return APIResponse.send(res, response);
});

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};
