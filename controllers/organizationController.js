const service = require("../services/organization.service");
const usersService = require("../services/user.service");
const APIResponse = require("../utils/response");
const asyncHandler = require("../middlewares/async.middleware");
const bcrypt = require("bcrypt");

/* ================= GET ALL ================= */
const getAll = asyncHandler(async (req, res) => {

    const data = await service.getAll();

    return APIResponse.send(
        res,
        APIResponse.successResponse(data)
    );
});


/* ================= GET BY ID ================= */
const getById = asyncHandler(async (req, res) => {

    const id = parseInt(req.params.id);

    const data = await service.getById(id);

    return APIResponse.send(
        res,
        APIResponse.emptyOr404(data)
    );
});


/* ================= CREATE ================= */
const create = asyncHandler(async (req, res) => {

    const b = req.body;

    // Validation
    if (
        !b.org_name ||
        !b.contact_email ||
        !b.country_id ||
        !b.state_id ||
        !b.dist_id
    ) {
        return APIResponse.send(
            res,
            APIResponse.errorResponse(
                "Organization name, email, country, state and district are required"
            )
        );
    }

    // 1. Create Organization
    const orgResult = await service.create(b);

    const newOrgId =
        orgResult?.[0]?.org_id ||
        orgResult?.org_id;

    if (!newOrgId) {
        return APIResponse.send(
            res,
            APIResponse.errorResponse("Organization created but ID not found")
        );
    }

    // 2. Create User (AUTO)
    const password = b.password || "Org@123";
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await usersService.execute(
            "INSERT",
            null,               // userId
            null,               // ownerId
            null,               // tenantId
            null,               // staffId
            b.contact_email,    // username
            hashedPassword,
            150,                // role id
            1,                  // is_active
            newOrgId            // org_id
        );
    } catch (err) {

        console.error("User Creation Failed:", err.message);

        return APIResponse.send(
            res,
            APIResponse.successResponse(
                "Organization created but user creation failed",
                { org_id: newOrgId }
            )
        );
    }

    return APIResponse.send(
        res,
        APIResponse.successResponse(
            { org_id: newOrgId },
            "Organization and User created successfully"
        )
    );
});


/* ================= UPDATE ================= */
const update = asyncHandler(async (req, res) => {

    const b = req.body;

    if (!b.org_id) {
        return APIResponse.send(
            res,
            APIResponse.errorResponse("Organization ID is required")
        );
    }

    const result = await service.update(b);

    return APIResponse.send(
        res,
        APIResponse.successResponse(result, "Organization updated successfully")
    );
});


/* ================= DELETE ================= */
const remove = asyncHandler(async (req, res) => {

    const id = parseInt(req.params.id);

    const result = await service.remove(id);

    return APIResponse.send(
        res,
        APIResponse.successResponse("Organization deleted", result)
    );
});


module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};