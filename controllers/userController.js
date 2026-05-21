const service = require("../services/user.service");
const APIResponse = require("../utils/response");
const asyncHandler = require("../middlewares/async.middleware");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { sendResetEmail } = require("../utils/mailer");
const db = require("../config/db"); 


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
    console.log("BODY:", req.body);
    if (!result || result.length === 0) {
        return APIResponse.send(
            res,
            APIResponse.errorResponse("Invalid Email or password or not premisstion to login")
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
    console.log("BODY:", isMatch);

    if (!isMatch) {
        return APIResponse.send(
            res,
            APIResponse.errorResponse("Invalid Email or password")
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
/* ======================= CHANGE PASSWORD ======================= */
const changePassword = asyncHandler(async (req, res) => {
    const { userId, oldPassword, newPassword } = req.body;

    if (!userId || !oldPassword || !newPassword) {
        return APIResponse.send(
            res,
            APIResponse.errorResponse("All fields are required")
        );
    }

    // 👉 Get user by ID (NOT LOGIN)
    const result = await service.execute("GET_BY_ID", userId);

    if (!result || result.length === 0) {
        return APIResponse.send(
            res,
            APIResponse.errorResponse("User not found")
        );
    }

    const user = result[0];

    // Compare old password
    const isMatch = await bcrypt.compare(oldPassword, user.password_hash);

    if (!isMatch) {
        return APIResponse.send(
            res,
            APIResponse.errorResponse("Old password is incorrect")
        );
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await service.execute(
        "CHANGE_PASSWORD",
        userId,
        null,
        null,
        null,
        null,
        hashedPassword
    );

    return APIResponse.send(
        res,
        APIResponse.successResponse("Password changed successfully")
    );
});

/* ======================= FORGOT PASSWORD (EMAIL) ======================= */
const forgotPassword = asyncHandler(async (req, res) => {
    const { username } = req.body;

    if (!username) {
        return APIResponse.send(res, APIResponse.errorResponse("Email required"));
    }

    // Get user
    const result = await service.execute("FORGOT_PASSWORD", null, null, null, null, username);

    if (!result || result.length === 0) {
        return APIResponse.send(res, APIResponse.errorResponse("User not found"));
    }

    const user = result[0];

    // Generate token
    const token = crypto.randomBytes(32).toString("hex");
    const expiry = new Date(Date.now() + 15 * 60 * 1000); // 15 min

    // Save token in DB
    await db.query(
        `INSERT INTO password_reset (user_id, email, token, expiry)
         VALUES (?, ?, ?, ?)`,
        [user.user_id, user.username, token, expiry]
    );

    // Create reset link
    const resetLink = `http://localhost:3000/reset-password?token=${token}`;

    // Send email
    await sendResetEmail(user.username, resetLink);

    return APIResponse.send(
        res,
        APIResponse.successResponse("Reset link sent to email")
    );
});

/* ======================= RESET PASSWORD ======================= */
const resetPassword = asyncHandler(async (req, res) => {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
        return APIResponse.send(
            res,
            APIResponse.errorResponse("Token and password required")
        );
    }

    // Get token
    const [rows] = await db.query(
        `SELECT * FROM password_reset WHERE token = ? AND is_used = 0`,
        [token]
    );

    if (!rows.length) {
        return APIResponse.send(res, APIResponse.errorResponse("Invalid token"));
    }

    const record = rows[0];

    if (new Date(record.expiry) < new Date()) {
        return APIResponse.send(res, APIResponse.errorResponse("Token expired"));
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user password
    await service.execute(
        "CHANGE_PASSWORD",
        record.user_id,
        null,
        null,
        null,
        null,
        hashedPassword
    );

    // Mark token used
    await db.query(
        `UPDATE password_reset SET is_used = 1 WHERE id = ?`,
        [record.id]
    );

    return APIResponse.send(
        res,
        APIResponse.successResponse("Password reset successful")
    );
});


module.exports = {
    insert,
    login,
    getById,
    getAll,
    updateStatus,
    changePassword,
    forgotPassword,
    resetPassword
};