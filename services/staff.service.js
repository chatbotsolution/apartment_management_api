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
    address = null,
    emergencyContact = null,
    photoUrl = null
) => {
    const [rows] = await db.query(
        // Added the 20th question mark here 👇
        "CALL sp_staff(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
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
            address,
            emergencyContact,
            photoUrl
        ]
    );

    return rows;
};

module.exports = {
    execute
};