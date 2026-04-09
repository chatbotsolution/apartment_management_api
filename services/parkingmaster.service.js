const db = require("../config/db");


/* ======================= GET ALL ======================= */
const getAll = async () => {
    const [rows] = await db.query(
        "CALL SP_ParkingMaster(NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, ?)",
        ["GET"]
    );
    return rows[0];
};


/* ======================= GET BY ID ======================= */
const getById = async (id) => {
    const [rows] = await db.query(
        "CALL SP_ParkingMaster(?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, ?)",
        [id, "GET"]
    );
    return rows[0];
};


/* ======================= CREATE ======================= */
const create = async (data) => {
    const {
        ParkingNumber,
        ParkingType_Id,
        Block_Id,
        Society_Id,
        CreatedBy
    } = data;

    const [rows] = await db.query(
        "CALL SP_ParkingMaster(NULL, ?, ?, ?, ?, NULL, ?, NOW(), NULL, NULL, ?)",
        [
            ParkingNumber,
            ParkingType_Id,
            Block_Id,
            Society_Id,
            CreatedBy,
            "INSERT"
        ]
    );

    if (!rows || !rows[0] || !rows[0][0]) {
        return { ParkingId: 0, Message: "Insert failed" };
    }

    return rows[0][0];
};


/* ======================= UPDATE ======================= */
const update = async (data) => {
    const {
        ParkingId,
        ParkingNumber,
        ParkingType_Id,
        Block_Id,
        Society_Id,
        UpdatedBy
    } = data;

    const [rows] = await db.query(
        "CALL SP_ParkingMaster(?, ?, ?, ?, ?, NULL, NULL, NULL, ?, NOW(), ?)",
        [
            ParkingId,
            ParkingNumber,
            ParkingType_Id,
            Block_Id,
            Society_Id,
            UpdatedBy,
            "UPDATE"
        ]
    );

    return rows[0][0];
};


/* ======================= STATUS CHANGE ======================= */
const changeStatus = async (data) => {
    const { ParkingId, IsActive, UpdatedBy } = data;

    const [rows] = await db.query(
        "CALL SP_ParkingMaster(?, NULL, NULL, NULL, NULL, ?, NULL, NULL, ?, NULL, ?)",
        [
            ParkingId,   // 1st
            IsActive,    // 6th
            UpdatedBy,   // 9th
            "STATUS_CHNG"// 11th
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