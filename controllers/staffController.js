const fs = require("fs");
const fsPromises = require("fs").promises; 
const path = require("path"); 
const staffService = require("../services/staff.service");
const usersService = require("../services/user.service");
const APIResponse = require("../utils/response");
const asyncHandler = require("../middlewares/async.middleware");
const bcrypt = require("bcrypt");

// Helper to safely parse FormData strings to null
const parseNull = (val) => (val === "null" || val === "undefined" || val === "") ? null : val;

/* ======================= INSERT ======================= */
const insert = asyncHandler(async (req, res) => {
    const body = req.body;
    let photoUrl = null;
    
    // 👉 Extracted user_id securely
    const userId = req.cookies?.user_id || req.headers['user_id'] || req.body.user_id || null;

    if (req.file) {
        const dirPath = path.join(process.cwd(), "public", "uploads");
        
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }

        const filename = `staff_${Date.now()}${path.extname(req.file.originalname)}`;
        const savePath = path.join(dirPath, filename);
        
        await fsPromises.writeFile(savePath, req.file.buffer);
        photoUrl = `/uploads/${filename}`;
    }

    const staffResult = await staffService.execute(
        "INSERT", null, parseNull(body.society_id), body.first_name, body.last_name,
        parseNull(body.designation), parseNull(body.department), body.phone, body.email, body.aadhaar_number,
        parseNull(body.date_of_birth), parseNull(body.gender_id), parseNull(body.joining_date), parseNull(body.leaving_date), 
        parseNull(body.status_id), parseNull(body.salary), parseNull(body.shift_timing), 
        parseNull(body.country_id), parseNull(body.state_id), parseNull(body.district_id), parseNull(body.postal_code), 
        body.address, body.emergency_contact, photoUrl, 
        userId // 👉 Parameter 25
    );

    // ✅ ROBUST ID EXTRACTION
    const newStaffId = 
        staffResult?.[0]?.[0]?.staff_id || 
        staffResult?.[0]?.insertId || 
        staffResult?.insertId;

    if (!newStaffId) {
        console.error("DEBUG: MySQL staffResult Structure:", JSON.stringify(staffResult));
        return APIResponse.send(res, new APIResponse(
            500, false, "Staff created, but failed to retrieve new ID. User account not created.", staffResult
        ));
    }

    // 4. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password || "Staff@123", salt);

    // ✅ TRY-CATCH FOR USER CREATION
    try {
        await usersService.execute(
            "INSERT", null, null, null, newStaffId, 
            body.username || body.email, hashedPassword, 
            parseInt(body.role_id) || 141, // Default role_id for staff
            body.is_active !== undefined ? parseInt(body.is_active) : 1 
        );
    } catch (userError) {
        console.error("User Creation Failed:", userError.message);
        return APIResponse.send(res, new APIResponse(
            201, true, "Staff created successfully, but User account failed: " + userError.message, { staff_id: newStaffId }
        ));
    }

    return APIResponse.send(res, APIResponse.successResponse({ staff_id: newStaffId }, "Staff and User account created successfully"));
});

/* ======================= UPDATE ======================= */
const update = asyncHandler(async (req, res) => {
    const body = req.body;
    
    // 👉 Extracted user_id
    const userId = req.cookies?.user_id || req.headers['user_id'] || req.body.user_id || null;

    let photoUrl = parseNull(body.photo_url); 
    if (req.file) {
        const dirPath = path.join(process.cwd(), "public", "uploads");
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }

        const filename = `staff_${Date.now()}${path.extname(req.file.originalname)}`;
        const savePath = path.join(dirPath, filename);
        await fsPromises.writeFile(savePath, req.file.buffer);
        photoUrl = `/uploads/${filename}`;
    }

    const result = await staffService.execute(
        "UPDATE", body.staff_id, parseNull(body.society_id), body.first_name, body.last_name,
        parseNull(body.designation), parseNull(body.department), body.phone, body.email, body.aadhaar_number,
        parseNull(body.date_of_birth), parseNull(body.gender_id), parseNull(body.joining_date), parseNull(body.leaving_date),
        parseNull(body.status_id), parseNull(body.salary), parseNull(body.shift_timing), 
        parseNull(body.country_id), parseNull(body.state_id), parseNull(body.district_id), parseNull(body.postal_code), 
        body.address, body.emergency_contact, photoUrl,
        userId // 👉 Parameter 25
    );

    return APIResponse.send(res, APIResponse.successResponse(result, "Staff updated successfully"));
});

/* ======================= UPDATE STATUS ======================= */
const updateStatus = asyncHandler(async (req, res) => {
    const { staff_id, status_id } = req.body;
    
    // 👉 Extracted user_id
    const userId = req.cookies?.user_id || req.headers['user_id'] || req.body.user_id || null;

    if (!staff_id || status_id === undefined) {
        return APIResponse.send(res, APIResponse.badRequestResponse("Staff ID and Status are required"));
    }

    // Passes 12 nulls to correctly align status_id with the 15th parameter, and user_id as 25th parameter
    const result = await staffService.execute(
        "UPDATE_STATUS", 
        staff_id, 
        null, null, null, null, null, null, null, null, null, null, null, null, 
        status_id,
        null, null, null, null, null, null, null, null, null,
        userId // 👉 Parameter 25
    );

    try {
        const isActive = parseInt(status_id) === 92 ? 1 : 0;
        // await usersService.execute("UPDATE_IS_ACTIVE_BY_STAFF_ID", staff_id, isActive); 
    } catch (userError) {
        console.error("Failed to sync user status:", userError);
    }

    return APIResponse.send(res, APIResponse.successResponse(result, "Status updated successfully"));
});

/* ======================= DELETE (SOFT) ======================= */
const remove = asyncHandler(async (req, res) => {
    const staffId = req.params.id || req.body.staff_id;
    
    // 👉 Extracted user_id
    const userId = req.cookies?.user_id || req.headers['user_id'] || req.body.user_id || null;

    const result = await staffService.execute(
        "DELETE", 
        staffId,
        null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,
        userId // 👉 Parameter 25
    );

    try {
        // await usersService.execute("UPDATE_IS_ACTIVE_BY_STAFF_ID", staffId, 0); 
    } catch (e) {
        console.error("User deactivation failed during staff deletion", e);
    }

    return APIResponse.send(res, APIResponse.successResponse(result, "Staff deactivated successfully"));
});

/* ======================= GET BY ID ======================= */
const getById = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const data = await staffService.execute("GET_BY_ID", id);

    return APIResponse.send(res, APIResponse.emptyOr404(data?.[0]));
});

/* ======================= GET ALL ======================= */
const getAll = asyncHandler(async (req, res) => {
    const societyId = req.query.society_id ? req.query.society_id.toString() : null;
    const data = await staffService.execute("GET_ALL", null, societyId);

    return APIResponse.send(res, APIResponse.successResponse(data?.[0], "Fetched successfully"));
});

/* ======================= SEARCH ======================= */
const search = asyncHandler(async (req, res) => {
    const societyId = req.query.society_id ? req.query.society_id.toString() : null;
    const keyword = req.query.keyword || "";

    const data = await staffService.execute("SEARCH", null, societyId, keyword);

    return APIResponse.send(res, APIResponse.successResponse(data?.[0], "Search results"));
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