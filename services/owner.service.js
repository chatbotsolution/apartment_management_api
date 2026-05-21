const db = require("../config/db");

/* ======================= EXECUTE SP ======================= */
const execute = async (
    action,
    ownerId = null,
    firstName = null,
    lastName = null,
    email = null,
    phone = null,
    alternatePhone = null,
    aadhaarNumber = null,
    panNumber = null,
    dob = null,
    genderId = null,
    isActive = null,
    countryId = null,
    stateId = null,
    districtId = null,
    postalCode = null,
    address = null,
    profilePhotoUrl = null,
    notes = null,
    societyId = null,
    page = null,
    pageSize = null,
    userId = null // NEW PARAMETER
) => {

    const [rows] = await db.query(
        "CALL sp_owner(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [
            action,
            ownerId,
            firstName,
            lastName,
            email,
            phone,
            alternatePhone,
            aadhaarNumber,
            panNumber,
            dob,
            genderId,
            isActive,
            countryId,
            stateId,
            districtId,
            postalCode,
            address,
            profilePhotoUrl,
            notes,
            societyId,
            page,
            pageSize,
            userId // NEW PARAMETER
        ]
    );

    return rows;
};

module.exports = {
    execute
};