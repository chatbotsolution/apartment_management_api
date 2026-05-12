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
    pageSize = null
) => {

    const [rows] = await db.query(
        "CALL sp_owner(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
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
            pageSize
        ]
    );

    // Return the full raw rows array so the controller can dynamically extract 
    // data arrays, totals, or new insert IDs based on the action performed.
    return rows;
};

module.exports = {
    execute
};