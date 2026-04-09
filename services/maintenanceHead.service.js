const db = require("../config/db");

/**
 * Service to handle Maintenance Heads data operations using stored procedure.
 */
const getAll = async () => {
    const [rows] = await db.query(
        "CALL sp_MaintenanceHeads(?, NULL, NULL, NULL, NULL, NULL, NULL)",
        ["GET_ALL"]
    );
    return rows[0];
};

const getById = async (id) => {
    const [rows] = await db.query(
        "CALL sp_MaintenanceHeads(?, ?, NULL, NULL, NULL, NULL, NULL)",
        ["GET_BY_ID", id]
    );
    return rows[0][0];
};

const create = async (data) => {
    const { Head_Name, Is_Chargeable, Default_Amount, Description, Created_By } = data;
    const [rows] = await db.query(
        "CALL sp_MaintenanceHeads(?, NULL, ?, ?, ?, ?, ?)",
        [
            "INSERT",
            Head_Name,
            Is_Chargeable ? 1 : 0,
            Default_Amount,
            Description,
            Created_By || 1
        ]
    );

    return rows[0][0];
};

const update = async (data) => {
    const { Head_Id, Head_Name, Is_Chargeable, Default_Amount, Description } = data;
    const [rows] = await db.query(
        "CALL sp_MaintenanceHeads(?, ?, ?, ?, ?, ?, NULL)",
        [
            "UPDATE",
            Head_Id,
            Head_Name,
            Is_Chargeable ? 1 : 0,
            Default_Amount,
            Description
        ]
    );

    return rows[0][0];
};

const remove = async (id) => {
    const [rows] = await db.query(
        "CALL sp_MaintenanceHeads(?, ?, NULL, NULL, NULL, NULL, NULL)",
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
