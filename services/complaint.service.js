const db = require("../config/db");

/**
 * Service to handle Complaints operations using stored procedure SP_Complaints.
 */
const getAll = async () => {
    const [rows] = await db.query(
        "CALL SP_Complaints(?, NULL, NULL, NULL, NULL, NULL, NULL, NULL)",
        ["GET_ALL"]
    );
    return rows[0];
};

const getById = async (id) => {
    const [rows] = await db.query(
        "CALL SP_Complaints(?, ?, NULL, NULL, NULL, NULL, NULL, NULL)",
        ["GET_BY_ID", id]
    );
    return rows[0][0];
};

const getByUserId = async (userId) => {
    const [rows] = await db.query(
        "CALL SP_Complaints(?, NULL, NULL, ?, NULL, NULL, NULL, NULL)",
        ["GET_BY_USER", userId]
    );
    return rows[0];
};

const create = async (data) => {
    const { Flat_Id, User_Id, Title, Description, Priority } = data;
    const [rows] = await db.query(
        "CALL SP_Complaints(?, NULL, ?, ?, ?, ?, NULL, ?)",
        ["INSERT", Flat_Id, User_Id, Title, Description, Priority]
    );
    
    if (!rows || !rows[0] || !rows[0][0]) {
        return { message: "Failed to register complaint" };
    }
    return rows[0][0];
};

const update = async (data) => {
    const { Complaint_Id, Title, Description, Status, Priority } = data;
    const [rows] = await db.query(
        "CALL SP_Complaints(?, ?, NULL, NULL, ?, ?, ?, ?)",
        ["UPDATE", Complaint_Id, Title, Description, Status, Priority]
    );

    return rows[0][0];
};

const remove = async (id) => {
    const [rows] = await db.query(
        "CALL SP_Complaints(?, ?, NULL, NULL, NULL, NULL, NULL, NULL)",
        ["DELETE", id]
    );

    return rows[0][0];
};

module.exports = {
    getAll,
    getById,
    getByUserId,
    create,
    update,
    delete: remove
};
