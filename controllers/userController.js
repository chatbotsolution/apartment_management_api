const service = require("../services/user.service");
const APIResponse = require("../utils/response");
const asyncHandler = require("../middlewares/async.middleware");
const bcrypt = require("bcrypt");


/* ======================= REGISTER USER ======================= */
const insert = asyncHandler(async (req, res) => {
    const b = req.body;
    const hashedPassword = await bcrypt.hash(b.passwordHash, 10);

    const result = await service.execute(
        "INSERT",
        null,
        b.ownerId,
        b.tenantId,
        b.staffId,
        b.username,
        hashedPassword,
        b.roleId,
        b.isActive,
        b.orgId
    );

    return APIResponse.send(
        res,
        APIResponse.successResponse("User created successfully", result)
    );
});


/* ======================= LOGIN ======================= */

const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    console.log("BODY:", req.body);

    // Validation
    if (!username || !password) {
        return APIResponse.send(
            res,
            APIResponse.errorResponse("Username and password required")
        );
    }

    // Call SP
    const result = await service.execute(
        "LOGIN",
        null,
        null,
        null,
        null,
        username,
        null
    );

    if (!result || result.length === 0) {
        return APIResponse.send(
            res,
            APIResponse.errorResponse("Invalid username or password")
        );
    }

    const user = result[0];

    //  IMPORTANT: make sure password_hash exists
    if (!user.password_hash) {
        return APIResponse.send(
            res,
            APIResponse.errorResponse("Password not found in DB")
        );
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
        return APIResponse.send(
            res,
            APIResponse.errorResponse("Invalid username or password")
        );
    }

    // Remove password before sending response
    delete user.password_hash;

    return APIResponse.send(
        res,
        APIResponse.successResponse("Login success", user)
    );
});

/* ======================= GET BY ID ======================= */
const getById = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);

    const data = await service.execute("GET_BY_ID", id);

    if (!data || data.length === 0) {
        return APIResponse.send(res, APIResponse.emptyOr404(null));
    }

    return APIResponse.send(res, APIResponse.successResponse("User found", data[0]));
});


/* ======================= GET ALL ======================= */
const getAll = asyncHandler(async (req, res) => {

    const data = await service.execute("GET_ALL");

    return APIResponse.send(
        res,
        APIResponse.successResponse("Fetched users", data || [])
    );
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

    return APIResponse.send(
        res,
        APIResponse.successResponse("Status updated successfully", result)
    );
});


module.exports = {
    insert,
    login,
    getById,
    getAll,
    updateStatus
};