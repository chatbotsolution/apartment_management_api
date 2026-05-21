const db = require("../config/db");

/* ======================= EXECUTE SP ======================= */
const execute = async (
    action,
    staffId = null,
    societyId = null,
    firstName = null,
    lastName = null,
    designation = null,
    department = null,
    phone = null,
    email = null,
    aadhaar = null,
    dob = null,
    genderId = null,
    joiningDate = null,
    leavingDate = null,
    statusId = null,
    salary = null,
    shiftTiming = null,
    countryId = null,
    stateId = null,
    districtId = null,
    postalCode = null,
    address = null,
    emergencyContact = null,
    photoUrl = null,
    userId = null // 👉 NEW: userId parameter mapped to created_by/updated_by
) => {
    const [rows] = await db.query(
        // 👉 UPDATED: Now contains exactly 25 question marks
        "CALL sp_staff(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [
            action,
            staffId,
            societyId,
            firstName,
            lastName,
            designation,
            department,
            phone,
            email,
            aadhaar,
            dob,
            genderId,
            joiningDate,
            leavingDate,
            statusId,
            salary,
            shiftTiming,
            countryId,
            stateId,
            districtId,
            postalCode,
            address,
            emergencyContact,
            photoUrl,
            userId // 👉 Passes the user ID to the database
        ]
    );

    return rows;
};

module.exports = {
    execute
};