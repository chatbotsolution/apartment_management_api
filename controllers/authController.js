const authService = require("../services/auth.service");
const APIResponse = require("../utils/response");
const asyncHandler = require("../middlewares/async.middleware");
const jwt = require("jsonwebtoken");

// LOGIN
const login = asyncHandler(async (req, res) => {
    // Expected in req.body: { Email, Password }
    const data = await authService.login(req.body);

    if (!data) {
        return APIResponse.send(res, new APIResponse(401, false, "Invalid email or password", null));
    }

    // Generate JWT Token
    const token = jwt.sign(
        { id: data.F_User_Id, email: data.Email, role: data.Role },
        process.env.JWT_SECRET || "default_jwt_secret",
        { expiresIn: "10h" }
    );

    return APIResponse.send(res, APIResponse.successResponse({
        user: data,
        token: token
    }, "Login successful"));
});

// CHANGE PASSWORD
const changePassword = asyncHandler(async (req, res) => {
    const { F_User_Id, Email, Old_Password, New_Password } = req.body;

    if (!F_User_Id || !Email || !Old_Password || !New_Password) {
        return APIResponse.send(res, APIResponse.badRequestResponse("All fields (F_User_Id, Email, Old_Password, New_Password) are required"));
    }

    const data = await authService.changePassword(req.body);

    if (data && data.SuccessStatus > 0) {
        return APIResponse.send(res, APIResponse.successResponse(null, "Password changed successfully"));
    } else {
        return APIResponse.send(res, APIResponse.badRequestResponse(data.Message || "Invalid old password or failed to change password"));
    }
});

// LOGOUT
const logout = asyncHandler(async (req, res) => {
    // Expected in req.body: { F_User_Id }
    const data = await authService.logout(req.body);

    return APIResponse.send(res, APIResponse.successResponse(null, data ? data.Message : "Logged out successfully"));
});

module.exports = {
    login,
    changePassword,
    logout
};
