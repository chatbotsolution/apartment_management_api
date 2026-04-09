const db = require("../config/db");

const getAll = async () => {
    const [rows] = await db.query(
        "CALL SP_Parking(?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)",
        ["GET_ALL"]
    );
    return rows[0];
};

const getById = async (id) => {
    const [rows] = await db.query(
        "CALL SP_Parking(?, ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL)",
        ["GET_BY_ID", id]
    );
    return rows[0];
};

const getByFlat = async (flatId) => {
    const [rows] = await db.query(
        "CALL SP_Parking(?, NULL, ?, NULL, NULL, NULL, NULL, NULL, NULL)",
        ["GET_BY_FLAT", flatId]
    );
    return rows[0];
};

const create = async (data) => {
    console.log("Parking Data = ", data);

    const { Flat_Id, Vehicle_Number, Vehicle_Type, parkingId, createdBy  } = data;

    const [rows] = await db.query(
        "CALL SP_Parking(?, NULL, ?, ?, ?, ?, NULL, ?, NULL)",
        [
            "INSERT",
            Flat_Id,
            Vehicle_Number,
            Vehicle_Type,
            parkingId,
            createdBy
        ]
    );

    if (!rows || !rows[0] || !rows[0][0]) {
        return {ParkingAllot_Id: 0, message: "Insert failed or no response from DB" };
    }

    return rows[0][0];
};

const update = async (data) => {
    const {
        ParkingAllot_Id,
        Flat_Id,
        Vehicle_Number,
        Vehicle_Type,
        parkingId,
        isActive,
        updatedBy 
    } = data;

    const [rows] = await db.query(
        "CALL SP_Parking(?, ?, ?, ?, ?, ?, ?, NULL, ?)",
        [
            "UPDATE",
            ParkingAllot_Id,
            Flat_Id,
            Vehicle_Number,
            Vehicle_Type,
            parkingId,
            isActive,
            updatedBy
        ]
    );

    return rows[0][0];
};

const remove = async (id) => {
    const [rows] = await db.query(
        "CALL SP_Parking(?, ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL)",
        ["DELETE", id]
    );

    return rows[0][0];
};

module.exports = {
    getAll,
    getById,
    getByFlat,
    create,
    update,
    delete: remove
};