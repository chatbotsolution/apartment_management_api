const userService = require("../services/user.service");
const APIResponse = require("../utils/response");
const asyncHandler = require("../middlewares/async.middleware");

/**
 * UserController
 */

// GET: api/User/GetAllUsers
const getAll = asyncHandler(async (req, res) => {
    const data = await userService.getAll();
    const response = APIResponse.emptyOr404(data);
    return APIResponse.send(res, response);
});

// GET: api/User/GetUserById/1
const getById = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const data = await userService.getById(id);
    const response = APIResponse.emptyOr404(data);
    return APIResponse.send(res, response);
});

// POST: api/User/CreateUser
const create = asyncHandler(async (req, res) => {
    const result = await userService.create(req.body);
    const response = APIResponse.successResponse(result);
    return APIResponse.send(res, response);
});

// PUT: api/User/UpdateUser
const update = asyncHandler(async (req, res) => {
    const result = await userService.update(req.body);
    const response = APIResponse.successResponse(result);
    return APIResponse.send(res, response);
});

// DELETE: api/User/DeleteUser/1
const remove = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const result = await userService.delete(id);
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