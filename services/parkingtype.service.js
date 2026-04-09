const db = require("../config/db");


/* ======================= GET ALL ======================= */
const getAll = async () => {
    const [rows] = await db.query(
        "CALL SP_ParkingType(NULL, NULL, NULL, NULL, NULL, NULL, NULL, ?)",
        ["GET"]
    );
    return rows[0];
};


/* ======================= GET BY ID ======================= */
const getById = async (id) => {
    const [rows] = await db.query(
        "CALL SP_ParkingType(?, NULL, NULL, NULL, NULL, NULL, NULL, ?)",
        [id, "GET"]
    );
    return rows[0];
};


/* ======================= CREATE ======================= */
const create = async (data) => {
    const { ParkingType, CreatedBy } = data;

    const [rows] = await db.query(
        "CALL SP_ParkingType(NULL, ?, NULL, ?, NOW(), NULL, NULL, ?)",
        [
            ParkingType,
            CreatedBy,
            "INSERT"
        ]
    );

    if (!rows || !rows[0] || !rows[0][0]) {
        return { ParkingTypeId: 0, Message: "Insert failed" };
    }

    return rows[0][0];
};


/* ======================= UPDATE ======================= */
const update = async (data) => {
    const { ParkingTypeId, ParkingType, UpdatedBy } = data;

    const [rows] = await db.query(
        "CALL SP_ParkingType(?, ?, NULL, NULL, NULL, ?, NOW(), ?)",
        [
            ParkingTypeId,
            ParkingType,
            UpdatedBy,
            "UPDATE"
        ]
    );

    return rows[0][0];
};


/* ======================= STATUS CHANGE ======================= */
const changeStatus = async (data) => {
    const { ParkingTypeId, IsActive, UpdatedBy } = data;

    const [rows] = await db.query(
        "CALL SP_ParkingType(?, NULL, ?, NULL, NULL, ?, NULL, ?)",
        [
            ParkingTypeId,
            IsActive,
            UpdatedBy,
            "STATUS_CHNG"
        ]
    );

    if (!rows || !rows[0] || !rows[0][0]) {
        return { Message: "Status change failed" };
    }

    return rows[0][0];
};


module.exports = {
    getAll,
    getById,
    create,
    update,
    changeStatus
};