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
    society = null
) => {

    const [rows] = await db.query(
        "CALL sp_tenant(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
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
            society
        ]
    );

    return rows;
};

module.exports = {
    execute
};