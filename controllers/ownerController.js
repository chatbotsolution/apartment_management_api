const fs = require("fs"); 
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

    // Handle File Upload
    if (req.file) {
        const filename = `owner_${Date.now()}${path.extname(req.file.originalname)}`;
        const savePath = path.join(process.cwd(), "public", "uploads", filename);
        fs.writeFileSync(savePath, req.file.buffer);
        photoUrl = `/uploads/${filename}`;
    }

    const ownerResult = await ownerService.execute(
        "INSERT", null, body.first_name, body.last_name, 
        body.email, body.phone, body.alternate_phone, 
        body.aadhaar_number, body.pan_number, body.date_of_birth, 
        body.gender_id, body.is_active !== undefined ? body.is_active : 1, 
        body.country_id, body.state_id, body.district_id, body.postal_code, body.address, 
        photoUrl, body.notes, 
        body.society_id
    );

    // ✅ ROBUST ID EXTRACTION
    const newOwnerId = 
        ownerResult?.[0]?.[0]?.new_id || 
        ownerResult?.[0]?.insertId || 
        ownerResult?.insertId;

    if (!newOwnerId) {
        console.error("DEBUG: MySQL ownerResult Structure:", JSON.stringify(ownerResult));
        // 👉 Matches staffController pattern perfectly
        return APIResponse.send(res, new APIResponse(
            500, false, "Owner created, but failed to retrieve new ID. User account not created.", ownerResult
        ));
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password_hash || "Owner@123", salt);

    try {
        await usersService.execute(
            "INSERT",            
            null,                
            newOwnerId,          // ownerId 
            null,                
            null,                
            body.username || body.email, 
            hashedPassword,      
            body.role_id || 142, // 142 is the Owner role
            body.is_active !== undefined ? body.is_active : 1 
        );
    } catch (userError) {
        console.error("User Creation Failed:", userError.message);
        // 👉 Matches staffController pattern perfectly
        return APIResponse.send(res, new APIResponse(
            201, true, "Owner created successfully, but User account failed: " + userError.message, { owner_id: newOwnerId }
        ));
    }

    return APIResponse.send(res, APIResponse.successResponse({ owner_id: newOwnerId }, "Owner and User account created successfully"));
});

/* ======================= UPDATE ======================= */
const update = asyncHandler(async (req, res) => {
    const body = req.body;

    let photoUrl = body.profile_photo_url; 
    if (req.file) {
        const filename = `owner_${Date.now()}${path.extname(req.file.originalname)}`;
        const savePath = path.join(process.cwd(), "public", "uploads", filename);
        fs.writeFileSync(savePath, req.file.buffer);
        photoUrl = `/uploads/${filename}`;
    }

    const result = await ownerService.execute(
        "UPDATE", body.owner_id, body.first_name, body.last_name, 
        body.email, body.phone, body.alternate_phone, 
        body.aadhaar_number, body.pan_number, body.date_of_birth, 
        body.gender_id, body.is_active, 
        body.country_id, body.state_id, body.district_id, body.postal_code, body.address, 
        photoUrl, body.notes, body.society_id
    );

    return APIResponse.send(res, APIResponse.successResponse(result, "Owner updated successfully"));
});

/* ======================= UPDATE STATUS ======================= */
const updateStatus = asyncHandler(async (req, res) => {
    const { owner_id, society_id, is_active } = req.body;

    if (!owner_id || is_active === undefined || !society_id) {
        return APIResponse.send(res, APIResponse.badRequestResponse("Owner ID, Society ID, and Status are required"));
    }

    const result = await ownerService.execute(
        "UPDATE_STATUS", 
        owner_id, 
        null, null, null, null, null, null, null, null, null, 
        is_active, 
        null, null, null, null, null, null, null,
        society_id
    );

    try {
        await usersService.execute(
            "UPDATE_STATUS", 
            null, owner_id, null, null, null, null, null, is_active
        );
    } catch (e) {
        console.error("Warning: Could not sync user status", e);
    }

    return APIResponse.send(res, APIResponse.successResponse(result, "Status updated successfully"));
});

/* ======================= DELETE (SOFT) ======================= */
const remove = asyncHandler(async (req, res) => {
    const ownerId = req.params.id || req.body.owner_id;
    const societyId = req.body.society_id;

    if (!ownerId || !societyId) {
        return APIResponse.send(res, APIResponse.badRequestResponse("Owner ID and Society ID are required"));
    }

    const result = await ownerService.execute(
        "DELETE", 
        ownerId, 
        null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 
        societyId
    );

    try {
        await usersService.execute(
            "UPDATE_STATUS", null, ownerId, null, null, null, null, null, 0
        );
    } catch (e) {
        console.error("Warning: Could not deactivate linked user", e);
    }

    return APIResponse.send(res, APIResponse.successResponse(result, "Owner deactivated successfully"));
});

/* ======================= GET BY ID ======================= */
const getById = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    
    // Attempt to parse, but fallback to null if not provided or NaN
    const querySocietyId = parseInt(req.query.society_id);
    const societyId = isNaN(querySocietyId) ? null : querySocietyId;

    // We still need the Owner ID to know who to fetch
    if (isNaN(id)) {
        return APIResponse.send(res, APIResponse.badRequestResponse("Valid owner_id is required"));
    }

    const data = await ownerService.execute(
        "GET_BY_ID", 
        id, 
        null, null, null, null, null, null, null, null, null, null, null, null, null, 
        societyId // This will now pass null to the SP if not provided
    );

    return APIResponse.send(res, APIResponse.emptyOr404(data?.[0]));
});

/* ======================= GET ALL ======================= */
const getAll = asyncHandler(async (req, res) => {
    const societyId = parseInt(req.query.society_id) || null;
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    const result = await ownerService.execute(
        "GET_ALL", 
        null, null, null, null, null, null, null, null, null, null, null, null, null, null, 
        societyId, page, pageSize
    );

    const payload = {
        data: result?.[0] || [],
        total: result?.[1]?.[0]?.total_records || 0,
        page,
        pageSize
    };

    // 👉 Used standard successResponse wrapper with customized payload object
    return APIResponse.send(res, APIResponse.successResponse(payload, "Fetched successfully"));
});

/* ======================= SEARCH ======================= */
const search = asyncHandler(async (req, res) => {
    const societyId = parseInt(req.query.society_id) || null;
    const keyword = req.query.keyword || "";
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    const result = await ownerService.execute(
        "SEARCH", 
        null, 
        keyword, 
        null, null, null, null, null, null, null, null, null, null, null, null, 
        societyId, page, pageSize
    );

    const payload = {
        data: result?.[0] || [],
        total: result?.[1]?.[0]?.total_records || 0,
        page,
        pageSize
    };

    // 👉 Used standard successResponse wrapper with customized payload object
    return APIResponse.send(res, APIResponse.successResponse(payload, "Search results"));
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