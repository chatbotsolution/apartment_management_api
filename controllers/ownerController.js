/* =========================================================
   ownerController.js
========================================================= */

const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const ownerService = require("../services/owner.service");
const usersService = require("../services/user.service");

const APIResponse = require("../utils/response");
const asyncHandler = require("../middlewares/async.middleware");

const bcrypt = require("bcrypt");

/* ======================= INSERT ======================= */
const insert = asyncHandler(async (req, res) => {

    const body = req.body;

    let photoUrl = null;

    if (req.file) {

        const dirPath = path.join(process.cwd(), "public", "uploads");

        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }

        const filename = `owner_${Date.now()}${path.extname(req.file.originalname)}`;

        const savePath = path.join(dirPath, filename);

        await fsPromises.writeFile(savePath, req.file.buffer);

        photoUrl = `/uploads/${filename}`;
    }

    const ownerResult = await ownerService.execute(
        "INSERT",
        null,
        body.first_name,
        body.last_name,
        body.email,
        body.phone,
        body.alternate_phone,
        body.aadhaar_number,
        body.pan_number,
        body.date_of_birth,
        body.gender_id,
        body.is_active !== undefined ? body.is_active : 1,
        body.country_id,
        body.state_id,
        body.district_id,
        body.postal_code,
        body.address,
        photoUrl,
        body.notes,
        body.society_id,
        null,
        null,
        body.user_id
    );

    const newOwnerId =
        ownerResult?.[0]?.[0]?.new_id ||
        ownerResult?.[0]?.insertId ||
        ownerResult?.insertId;

    if (!newOwnerId) {
        return APIResponse.send(
            res,
            new APIResponse(
                500,
                false,
                "Owner created but ID not found",
                ownerResult
            )
        );
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(
        body.password_hash || "Owner@123",
        salt
    );

    try {

        await usersService.execute(
            "INSERT",
            null,
            newOwnerId,
            null,
            null,
            body.username || body.email,
            hashedPassword,
            body.role_id || 142,
            body.is_active !== undefined ? body.is_active : 1
        );

    } catch (err) {

        return APIResponse.send(
            res,
            new APIResponse(
                201,
                true,
                "Owner created but user creation failed",
                err.message
            )
        );
    }

    return APIResponse.send(
        res,
        APIResponse.successResponse(
            { owner_id: newOwnerId },
            "Owner and user created successfully"
        )
    );
});


/* ======================= UPDATE ======================= */
const update = asyncHandler(async (req, res) => {

    const body = req.body;

    let photoUrl = body.profile_photo_url;

    if (req.file) {

        const dirPath = path.join(process.cwd(), "public", "uploads");

        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }

        const filename = `owner_${Date.now()}${path.extname(req.file.originalname)}`;

        const savePath = path.join(dirPath, filename);

        await fsPromises.writeFile(savePath, req.file.buffer);

        photoUrl = `/uploads/${filename}`;
    }

    const result = await ownerService.execute(
        "UPDATE",
        body.owner_id,
        body.first_name,
        body.last_name,
        body.email,
        body.phone,
        body.alternate_phone,
        body.aadhaar_number,
        body.pan_number,
        body.date_of_birth,
        body.gender_id,
        body.is_active,
        body.country_id,
        body.state_id,
        body.district_id,
        body.postal_code,
        body.address,
        photoUrl,
        body.notes,
        body.society_id,
        null,
        null,
        body.user_id
    );

    return APIResponse.send(
        res,
        APIResponse.successResponse(
            result,
            "Owner updated successfully"
        )
    );
});


/* ======================= UPDATE STATUS ======================= */
const updateStatus = asyncHandler(async (req, res) => {

    const {
        owner_id,
        society_id,
        is_active,
        user_id
    } = req.body;

    if (!owner_id || !society_id || is_active === undefined) {

        return APIResponse.send(
            res,
            APIResponse.badRequestResponse(
                "owner_id, society_id and is_active are required"
            )
        );
    }

    const result = await ownerService.execute(
        "UPDATE_STATUS",
        owner_id,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        is_active,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        society_id,
        null,
        null,
        user_id
    );

    return APIResponse.send(
        res,
        APIResponse.successResponse(
            result,
            "Status updated successfully"
        )
    );
});


/* ======================= DELETE ======================= */
const remove = asyncHandler(async (req, res) => {

    const ownerId = req.params.id;

    const {
        society_id,
        user_id
    } = req.body;

    if (!ownerId || !society_id) {

        return APIResponse.send(
            res,
            APIResponse.badRequestResponse(
                "owner_id and society_id are required"
            )
        );
    }

    const result = await ownerService.execute(
        "DELETE",
        ownerId,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        society_id,
        null,
        null,
        user_id
    );

    return APIResponse.send(
        res,
        APIResponse.successResponse(
            result,
            "Owner deleted successfully"
        )
    );
});


/* ======================= GET BY ID ======================= */
const getById = asyncHandler(async (req, res) => {

    const ownerId = req.params.id;

    const societyId = req.query.society_id || null;

    const result = await ownerService.execute(
        "GET_BY_ID",
        ownerId,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        societyId,
        null,
        null,
        null
    );

    return APIResponse.send(
        res,
        APIResponse.successResponse(
            result?.[0] || [],
            "Fetched successfully"
        )
    );
});


/* ======================= GET ALL ======================= */
const getAll = asyncHandler(async (req, res) => {

    let societyId = req.query.society_id || null;

    if (societyId) {
        societyId = societyId.replace(/[^0-9,]/g, "");
    }

    const page = parseInt(req.query.page) || 1;

    const pageSize = parseInt(req.query.pageSize) || 10;

    const result = await ownerService.execute(
        "GET_ALL",
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        societyId,
        page,
        pageSize,
        null
    );

    const payload = {
        data: result?.[0] || [],
        total: result?.[1]?.[0]?.total_records || 0,
        page,
        pageSize
    };

    return APIResponse.send(
        res,
        APIResponse.successResponse(
            payload,
            "Fetched successfully"
        )
    );
});


/* ======================= SEARCH ======================= */
const search = asyncHandler(async (req, res) => {

    let societyId = req.query.society_id || null;

    if (societyId) {
        societyId = societyId.replace(/[^0-9,]/g, "");
    }

    const keyword = req.query.keyword || "";

    const page = parseInt(req.query.page) || 1;

    const pageSize = parseInt(req.query.pageSize) || 10;

    const result = await ownerService.execute(
        "SEARCH",
        null,
        keyword,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        societyId,
        page,
        pageSize,
        null
    );

    const payload = {
        data: result?.[0] || [],
        total: result?.[1]?.[0]?.total_records || 0,
        page,
        pageSize
    };

    return APIResponse.send(
        res,
        APIResponse.successResponse(
            payload,
            "Search fetched successfully"
        )
    );
});

module.exports = {
    insert,
    update,
    updateStatus,
    remove,
    getById,
    getAll,
    search
};