const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");
const tenantService = require("../services/tenant.service");
const usersService = require("../services/user.service");
const APIResponse = require("../utils/response");
const asyncHandler = require("../middlewares/async.middleware");
const bcrypt = require("bcrypt");

/* ======================= INSERT ======================= */
const insert = asyncHandler(async (req, res) => {
    const b = req.body;
    
    let photoUrl = null;
    let agreementUrl = null;

    if (req.files) {
        const dirPath = path.join(process.cwd(), "public", "uploads");
        
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }

        if (req.files['profile_photo_url'] && req.files['profile_photo_url'][0]) {
            const file = req.files['profile_photo_url'][0];
            const filename = `tenant_photo_${Date.now()}${path.extname(file.originalname)}`;
            const savePath = path.join(dirPath, filename);
            await fsPromises.writeFile(savePath, file.buffer);
            photoUrl = `/uploads/${filename}`;
        }
        if (req.files['agreement_doc_url'] && req.files['agreement_doc_url'][0]) {
            const file = req.files['agreement_doc_url'][0];
            const filename = `tenant_agreement_${Date.now()}${path.extname(file.originalname)}`;
            const savePath = path.join(dirPath, filename);
            await fsPromises.writeFile(savePath, file.buffer);
            agreementUrl = `/uploads/${filename}`;
        }
    }

    // Pass the exact 34 variables
    const tenantResult = await tenantService.execute(
        "INSERT",
        null, // tenantId
        b.flat_id || null,
        b.owner_id || null,
        b.first_name,
        b.last_name,
        b.email,
        b.phone,
        b.alternate_phone || null,
        b.aadhaar_number || null,
        b.date_of_birth || null,
        b.gender_id || null,
        b.occupation || null,
        b.employer_name || null,
        b.total_occupants || null,
        b.lease_start || null,
        b.lease_end || null,
        b.monthly_rent || null,
        b.security_deposit || null,
        b.rent_due_day || null,
        b.is_active !== undefined ? b.is_active : 1,
        b.address || null,
        b.emergency_contact_name || null,
        b.emergency_contact_phone || null,
        photoUrl,
        agreementUrl,
        b.police_verification !== undefined ? b.police_verification : 0, 
        b.society_id || null,
        b.block_id || null,
        b.country_id || null,
        b.state_id || null,
        b.district_id || null,
        b.postal_code || null,
        b.user_id || null // 👉 34th parameter
    );

    const newTenantId = 
        tenantResult?.[0]?.[0]?.tenant_id || 
        tenantResult?.[0]?.insertId || 
        tenantResult?.insertId;

    if (!newTenantId) {
        return APIResponse.send(res, new APIResponse(
            500, false, "Tenant created, but failed to retrieve new ID. User account not created.", tenantResult
        ));
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(b.password || "Tenant@123", salt);

    try {
        await usersService.execute(
            "INSERT", 
            null, 
            null, 
            newTenantId, 
            null, 
            b.username || b.email, 
            hashedPassword, 
            b.role_id || 143, 
            b.is_active !== undefined ? b.is_active : 1,
            b.society_id || null,
            b.user_id || null // Assuming your usersService also takes user_id for auditing
        );
    } catch (userError) {
        console.error("User Creation Failed:", userError.message);
        return APIResponse.send(res, new APIResponse(
            201, true, "Tenant created successfully, but User account failed: " + userError.message, { tenant_id: newTenantId }
        ));
    }

    return APIResponse.send(res, APIResponse.successResponse({ tenant_id: newTenantId }, "Tenant and User account created successfully"));
});

/* ======================= UPDATE ======================= */
const update = asyncHandler(async (req, res) => {
    const b = req.body;

    let photoUrl = b.profile_photo_url || null;
    let agreementUrl = b.agreement_doc_url || null;

    if (req.files) {
        const dirPath = path.join(process.cwd(), "public", "uploads");
        
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }

        if (req.files['profile_photo_url'] && req.files['profile_photo_url'][0]) {
            const file = req.files['profile_photo_url'][0];
            const filename = `tenant_photo_${Date.now()}${path.extname(file.originalname)}`;
            const savePath = path.join(dirPath, filename);
            await fsPromises.writeFile(savePath, file.buffer);
            photoUrl = `/uploads/${filename}`;
        }
        if (req.files['agreement_doc_url'] && req.files['agreement_doc_url'][0]) {
            const file = req.files['agreement_doc_url'][0];
            const filename = `tenant_agreement_${Date.now()}${path.extname(file.originalname)}`;
            const savePath = path.join(dirPath, filename);
            await fsPromises.writeFile(savePath, file.buffer);
            agreementUrl = `/uploads/${filename}`;
        }
    }

    const result = await tenantService.execute(
        "UPDATE",
        b.tenant_id,
        b.flat_id || null,
        b.owner_id || null,
        b.first_name,
        b.last_name,
        b.email,
        b.phone,
        b.alternate_phone || null,
        b.aadhaar_number || null,
        b.date_of_birth || null,
        b.gender_id || null,
        b.occupation || null,
        b.employer_name || null,
        b.total_occupants || null,
        b.lease_start || null,
        b.lease_end || null,
        b.monthly_rent || null,
        b.security_deposit || null,
        b.rent_due_day || null,
        b.is_active !== undefined ? b.is_active : 1,
        b.address || null,
        b.emergency_contact_name || null,
        b.emergency_contact_phone || null,
        photoUrl,
        agreementUrl,
        b.police_verification !== undefined ? b.police_verification : 0, 
        b.society_id || null,
        b.block_id || null,
        b.country_id || null,
        b.state_id || null,
        b.district_id || null,
        b.postal_code || null,
        b.user_id || null // 👉 34th parameter
    );

    if (b.is_active !== undefined) {
        try {
            await usersService.execute(
                "UPDATE_STATUS", null, null, b.tenant_id, null, null, null, null, parseInt(b.is_active), null, b.user_id || null
            );
        } catch (e) {
            console.error("Warning: Could not sync user status on profile update", e);
        }
    }

    return APIResponse.send(res, APIResponse.successResponse("Tenant updated", result));
});

/* ======================= UPDATE STATUS ======================= */
const updateStatus = asyncHandler(async (req, res) => {
    const { tenant_id, is_active, user_id } = req.body;

    if (!tenant_id || is_active === undefined) {
        return APIResponse.send(res, APIResponse.badRequestResponse("Tenant ID and Active Status are required"));
    }

    // Build the 34-parameter array
    const args = Array(34).fill(null);
    args[0] = "UPDATE_STATUS"; 
    args[1] = tenant_id;
    args[20] = is_active;
    args[33] = user_id || null; // 👉 34th parameter

    const result = await tenantService.execute(...args);

    await usersService.execute("UPDATE_STATUS", null, null, tenant_id, null, null, null, null, is_active, null, user_id || null);

    return APIResponse.send(res, APIResponse.successResponse("Status updated", result));
});

/* ======================= DELETE ======================= */
const remove = asyncHandler(async (req, res) => {
    const tenantId = req.params.id || req.body.tenant_id;
    const userId = req.body.user_id;

    // Build the 34-parameter array
    const args = Array(34).fill(null);
    args[0] = "DELETE"; 
    args[1] = tenantId;
    args[33] = userId || null; // 👉 34th parameter

    const result = await tenantService.execute(...args);

    await usersService.execute("UPDATE_STATUS", null, null, tenantId, null, null, null, null, 0, null, userId || null); 

    return APIResponse.send(res, APIResponse.successResponse("Tenant deactivated", result));
});

/* ======================= GET BY ID ======================= */
const getById = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);

    // Build the 34-parameter array
    const args = Array(34).fill(null);
    args[0] = "GET_BY_ID";
    args[1] = id;

    const data = await tenantService.execute(...args);

    return APIResponse.send(res, APIResponse.emptyOr404(data?.[0]));
});

/* ======================= GET ALL ======================= */
const getAll = asyncHandler(async (req, res) => {
    let societyId = req.query.society_id ? req.query.society_id.toString() : null;
    if (societyId) {
        societyId = societyId.replace(/[^0-9,]/g, "");
    }

    // Build the 34-parameter array
    const args = Array(34).fill(null);
    args[0] = "GET_ALL";
    args[27] = societyId; // 28th parameter is society_id

    const data = await tenantService.execute(...args);

    return APIResponse.send(res, APIResponse.successResponse(data?.[0], "Fetched successfully"));
});

/* ======================= SEARCH ======================= */
const search = asyncHandler(async (req, res) => {
    let societyId = req.query.society_id ? req.query.society_id.toString() : null;
    if (societyId) {
        societyId = societyId.replace(/[^0-9,]/g, "");
    }

    const keyword = req.query.keyword || "";

    // Build the 34-parameter array
    const args = Array(34).fill(null);
    args[0] = "SEARCH";
    args[4] = keyword;    // firstName maps to 5th parameter
    args[27] = societyId; // society maps to 28th parameter

    const data = await tenantService.execute(...args);

    return APIResponse.send(res, APIResponse.successResponse("Search results", data?.[0]));
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