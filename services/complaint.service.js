const db = require("../config/db");

/**
 * Service to handle User Request (Complaint) operations using stored procedure sp_UserRequests.
 */
const getAll = async () => {
    const [rows] = await db.query(
        "CALL sp_UserRequests(?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)",
        ["GET_ALL"]
    );
    return rows[0];
};

const getById = async (id) => {
    const [rows] = await db.query(
        "CALL sp_UserRequests(?, ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)",
        ["GET_BY_ID", id]
    );
    return rows[0][0];
};

const create = async (data) => {
    const { Flat_Id, User_Id, complaintTypeId, Description, Status, Priority, req_type, req_Id } = data;
    const [rows] = await db.query(
        "CALL sp_UserRequests(?, NULL, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
            "INSERT",
            Flat_Id,
            User_Id,
            complaintTypeId,
            Description,
            Status || 'Open',
            Priority || 'Medium',
            req_type,
            req_Id
        ]
    );
    
    return rows[0][0];
};

const update = async (data) => {
    const { Complaint_Id, Flat_Id, User_Id, complaintTypeId, Description, Status, Priority, req_type, req_Id } = data;
    const [rows] = await db.query(
        "CALL sp_UserRequests(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
            "UPDATE",
            Complaint_Id,
            Flat_Id,
            User_Id,
            complaintTypeId,
            Description,
            Status,
            Priority,
            req_type,
            req_Id
        ]
    );

    return rows[0][0];
};

const remove = async (id) => {
    const [rows] = await db.query(
        "CALL sp_UserRequests(?, ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)",
        ["DELETE", id]
    );

    return rows[0][0];
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: remove
};
