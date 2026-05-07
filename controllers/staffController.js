const fs = require("fs"); 
const path = require("path"); 
const staffService = require("../services/staff.service");
const usersService = require("../services/user.service");
const APIResponse = require("../utils/response"); // Your APIResponseServices class
const asyncHandler = require("../middlewares/async.middleware");
const bcrypt = require("bcrypt");

/* ======================= INSERT ======================= */
const insert = asyncHandler(async (req, res) => {
    const body = req.body;
    let photoUrl = null;

    if (req.file) {
        const filename = `staff_${Date.now()}${path.extname(req.file.originalname)}`;
        const savePath = path.join(process.cwd(), "public", "uploads", filename);
        fs.writeFileSync(savePath, req.file.buffer);
        photoUrl = `/uploads/${filename}`;
    }

    const staffResult = await staffService.execute(
        "INSERT", null, body.society_id || null, body.first_name, body.last_name,
        body.designation, body.department, body.phone, body.email, body.aadhaar_number,
        body.date_of_birth, body.gender_id, body.joining_date, body.leaving_date, 
        body.status_id, body.salary, body.shift_timing, body.address, body.emergency_contact, photoUrl
    );

    // ✅ ROBUST ID EXTRACTION
    const newStaffId = 
        staffResult?.[0]?.[0]?.staff_id || 
        staffResult?.[0]?.insertId || 
        staffResult?.insertId;

    if (!newStaffId) {
        console.error("DEBUG: MySQL staffResult Structure:", JSON.stringify(staffResult));
        // 👉 FIXED: Use the 'new' keyword to create an instance directly
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
            // 👉 FIXED: Changed default from 1 to 92 to match your master_lookup active status
            body.role_id || 3, body.status_id !== undefined ? body.status_id : 92 
        );
    } catch (userError) {
        console.error("User Creation Failed:", userError.message);
        // 👉 FIXED: Use the 'new' keyword for a custom 201 response
        return APIResponse.send(res, new APIResponse(
            201, true, "Staff created successfully, but User account failed: " + userError.message, { staff_id: newStaffId }
        ));
    }

    // 👉 FIXED: Passed data first, message second
    return APIResponse.send(res, APIResponse.successResponse({ staff_id: newStaffId }, "Staff and User account created successfully"));
});

/* ======================= UPDATE ======================= */
const update = asyncHandler(async (req, res) => {
    const body = req.body;

    let photoUrl = body.photo_url; 
    if (req.file) {
        const filename = `staff_${Date.now()}${path.extname(req.file.originalname)}`;
        const savePath = path.join(process.cwd(), "public", "uploads", filename);
        fs.writeFileSync(savePath, req.file.buffer);
        photoUrl = `/uploads/${filename}`;
    }

    const result = await staffService.execute(
        "UPDATE", body.staff_id, body.society_id, body.first_name, body.last_name,
        body.designation, body.department, body.phone, body.email, body.aadhaar_number,
        body.date_of_birth, body.gender_id, body.joining_date, body.leaving_date,
        body.status_id, body.salary, body.shift_timing, body.address, body.emergency_contact, photoUrl
    );

    // 👉 FIXED: Passed data first, message second
    return APIResponse.send(res, APIResponse.successResponse(result, "Staff updated successfully"));
});

/* ======================= UPDATE STATUS (NEW) ======================= */
const updateStatus = asyncHandler(async (req, res) => {
    const { staff_id, status_id } = req.body;

    if (!staff_id || status_id === undefined) {
        // Fallback to basic 400 if developer forgets payload
        return APIResponse.send(res, APIResponse.badRequestResponse("Staff ID and Status are required"));
    }

    // 👉 NEW: Pass "UPDATE_STATUS", staff_id, then 12 nulls to skip to the 15th parameter (statusId)
    const result = await staffService.execute(
        "UPDATE_STATUS", 
        staff_id, 
        null, null, null, null, null, null, null, null, null, null, null, null, 
        status_id
    );

    return APIResponse.send(res, APIResponse.successResponse(result, "Status updated successfully"));
});

/* ======================= DELETE (SOFT) ======================= */
const remove = asyncHandler(async (req, res) => {
    const staffId = req.params.id || req.body.staff_id;
    const result = await staffService.execute("DELETE", staffId);

    // 👉 FIXED: Passed data first, message second
    return APIResponse.send(res, APIResponse.successResponse(result, "Staff deactivated successfully"));
});

/* ======================= GET BY ID ======================= */
const getById = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const data = await staffService.execute("GET_BY_ID", id);

    // This was already perfect
    return APIResponse.send(res, APIResponse.emptyOr404(data?.[0]));
});

/* ======================= GET ALL ======================= */
const getAll = asyncHandler(async (req, res) => {
    const societyId = parseInt(req.query.society_id) || null;
    const data = await staffService.execute("GET_ALL", null, societyId);

    // 👉 FIXED: Passed data first, message second
    return APIResponse.send(res, APIResponse.successResponse(data?.[0], "Fetched successfully"));
});

/* ======================= SEARCH ======================= */
const search = asyncHandler(async (req, res) => {
    const societyId = parseInt(req.query.society_id) || null;
    const keyword = req.query.keyword || "";

    const data = await staffService.execute("SEARCH", null, societyId, keyword);

    // 👉 FIXED: Passed data first, message second
    return APIResponse.send(res, APIResponse.successResponse(data?.[0], "Search results"));
});

module.exports = {
    insert,
    update,
    updateStatus, // 👉 ADDED: Exported the new function!
    remove,
    getById,
    getAll,
    search
};