const db = require("../config/db");

/* ======================= EXECUTE SP ======================= */
const execute = async (
    action,
    tenantId = null,
    flatId = null,
    ownerId = null,
    firstName = null,
    lastName = null,
    email = null,
    phone = null,
    altPhone = null,
    aadhaar = null,
    dob = null,
    genderId = null,
    occupation = null,
    employer = null,
    totalOccupants = null,
    leaseStart = null,
    leaseEnd = null,
    monthlyRent = null,
    securityDeposit = null,
    rentDueDay = null,
    isActive = null,
    address = null,
    emergencyName = null,
    emergencyPhone = null,
    photo = null,
    agreement = null,
    police = null,
    society = null,
    blockId = null,    // 29
    countryId = null,  // 30
    stateId = null,    // 31
    districtId = null, // 32
    postalCode = null, // 33
    userId = null      // 34 👉 NEW PARAMETER
) => {

    // EXACTLY 34 question marks here
    const [rows] = await db.query(
        "CALL sp_tenant(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [
            action,
            tenantId,
            flatId,
            ownerId,
            firstName,
            lastName,
            email,
            phone,
            altPhone,
            aadhaar,
            dob,
            genderId,
            occupation,
            employer,
            totalOccupants,
            leaseStart,
            leaseEnd,
            monthlyRent,
            securityDeposit,
            rentDueDay,
            isActive,
            address,
            emergencyName,
            emergencyPhone,
            photo,
            agreement,
            police,
            society,
            blockId,
            countryId,
            stateId,
            districtId,
            postalCode,
            userId // 👉 NEW PARAMETER
        ]
    );

    return rows;
};

module.exports = {
    execute
};