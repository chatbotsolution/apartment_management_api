const db = require("../config/db");


/* ======================= EXECUTE SP ======================= */
const execute = async (
    action,
    societyId = null,
    name = null,
    address = null,
    city = null,
    state = null,
    pincode = null,
    registrationNo = null,
    establishedDate = null,
    contactEmail = null,
    contactPhone = null,
    totalBlocks = null,
    totalUnits = null,
    website = null
) => {

    const [rows] = await db.query(
        "CALL sp_society(?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [
            action,
            societyId,
            name,
            address,
            city,
            state,
            pincode,
            registrationNo,
            establishedDate,
            contactEmail,
            contactPhone,
            totalBlocks,
            totalUnits,
            website
        ]
    );

    return rows;
};
/* ======================= GET ALL COUNTRY ======================= */
const getCountries = async () => {
    const [rows] = await db.query(
        `CALL SP_Common('GET_COUNTRY', NULL, NULL, NULL, NULL, NULL, NULL)`
    );

    return rows[0];
};

/* ======================= GET STATE LIST BY COUNTRY ======================= */
const getStates = async (countryId) => {
    const [rows] = await db.query(
        `CALL SP_Common('GET_STATE_BY_COUNTRY', NULL, NULL, NULL, NULL, NULL, ?)`,
        [countryId]
    );

    return rows[0];
};

/* ======================= GET DISTRICT LIST BY STATE ======================= */
const getDistrictsByState = async (stateId) => {
    const [rows] = await db.query(
        `CALL SP_Common('GET_DISTRICT_BY_STATE', NULL, NULL, NULL, NULL, ?, NULL)`,
        [stateId]
    );

    return rows[0];
};

module.exports = {
    execute,
    getCountries,
    getStates,
    getDistrictsByState
};