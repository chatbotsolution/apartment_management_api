const db = require("../config/db");
const crypto = require("crypto");

// Helper function to hash password (using SHA-256 for deterministic hashing compatible with exact SQL matching)
const hashPassword = (password) => {
    if (!password) return null;
    return crypto.createHash("sha256").update(password.toString()).digest("hex");
};

// LOGIN
const login = async (data) => {
    const { Email, Password } = data;
    const encryptedPassword = hashPassword(Password);

    // First, try with the new encrypted password format
    let [rows] = await db.query(
        "CALL sp_ManageUserAuth(?, NULL, ?, ?, NULL)",
        ["LOGIN", Email, encryptedPassword]
    );
    
    // Fallback: If not found, try with the original unhashed password (for legacy/existing data like "sa123")
    if (!rows[0] || rows[0].length === 0) {
        [rows] = await db.query(
            "CALL sp_ManageUserAuth(?, NULL, ?, ?, NULL)",
            ["LOGIN", Email, Password]
        );
    }

    return rows[0] ? rows[0][0] : undefined; // Returns user data if success, undefined if not found
};

// CHANGE PASSWORD
const changePassword = async (data) => {
    const { F_User_Id, Email, Old_Password, New_Password } = data;
    
    // 1. Check if user exists with this ID & Email
    const [userRows] = await db.query(
        "SELECT Password_Hash FROM flat_users WHERE F_User_Id = ? AND Email = ? AND Is_Deleted = 0", 
        [F_User_Id, Email]
    );
    
    if (!userRows || userRows.length === 0) {
        return { SuccessStatus: 0, Message: "Invalid User ID or Email" };
    }
    
    const dbPassword = userRows[0].Password_Hash;
    const encryptedOldPassword = hashPassword(Old_Password);
    const encryptedNewPassword = hashPassword(New_Password);

    // 2. Verify old password matches what is in DB (either securely hashed or legacy plaintext)
    if (dbPassword !== encryptedOldPassword && dbPassword !== Old_Password) {
         return { SuccessStatus: 0, Message: "Incorrect Old Password" };
    }

    // 3. Now update with the SP. We pass `dbPassword` into `p_Old_Password` directly 
    // so the SP's precise `WHERE Password_Hash = p_Old_Password` clause matches correctly!
    const [rows] = await db.query(
        "CALL sp_ManageUserAuth(?, ?, ?, ?, ?)",
        ["CHANGE_PASSWORD", F_User_Id, Email, encryptedNewPassword, dbPassword]
    );

    return rows[0][0]; // Returns { SuccessStatus: 1 or 0 }
};

// LOGOUT
const logout = async (data) => {
    const { F_User_Id } = data;

    const [rows] = await db.query(
        "CALL sp_ManageUserAuth(?, ?, NULL, NULL, NULL)",
        ["LOGOUT", F_User_Id]
    );

    return rows[0][0]; // Returns { Message: 'Logged out successfully' }
};

module.exports = {
    login,
    changePassword,
    logout,
    hashPassword
};
