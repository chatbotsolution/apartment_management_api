const service = require("../services/user.service");
const APIResponse = require("../utils/response");
const asyncHandler = require("../middlewares/async.middleware");


/* ======================= REGISTER USER ======================= */
const insert = asyncHandler(async (req, res) => {
    const b = req.body;

    const result = await service.execute(
        "INSERT",
        null,
        b.ownerId,
        b.tenantId,
        b.staffId,
        b.username,
        b.passwordHash,
        b.roleId,
        b.isActive
    );

    return APIResponse.send(res, APIResponse.successResponse("User created", result));
});


/* ======================= LOGIN ======================= */
const login = asyncHandler(async (req, res) => {
    const { username, passwordHash } = req.body;

    const result = await service.execute(
        "LOGIN",
        null,
        null,
        null,
        null,
        username,
        passwordHash
    );

    return APIResponse.send(res, APIResponse.successResponse("Login success", result?.[0]));
});


/* ======================= GET BY ID ======================= */
const getById = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);

    const data = await service.execute("GET_BY_ID", id);

    return APIResponse.send(res, APIResponse.emptyOr404(data?.[0]));
});


/* ======================= GET ALL ======================= */
const getAll = asyncHandler(async (req, res) => {

    const data = await service.execute("GET_ALL");

    return APIResponse.send(res, APIResponse.successResponse("Fetched users", data?.[0]));
});


/* ======================= STATUS UPDATE ======================= */
const updateStatus = asyncHandler(async (req, res) => {
    const { userId, isActive } = req.body;

    const result = await service.execute(
        "STATUS",
        userId,
        null,
        null,
        null,
        null,
        null,
        null,
        isActive
    );

    return APIResponse.send(res, APIResponse.successResponse("Status updated", result));
});


module.exports = {
    insert,
    login,
    getById,
    getAll,
    updateStatus
};