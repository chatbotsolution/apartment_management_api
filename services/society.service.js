const db = require("../config/db");

const getAll = async () => {
    const [rows] = await db.query(
        "CALL SP_Society(?, NULL, NULL, NULL, NULL, NULL, NULL, NULL)",
        ["GET_ALL"]
    );
    return rows[0];
};

const getById = async (id) => {
    const [rows] = await db.query(
        "CALL SP_Society(?, ?, NULL, NULL, NULL, NULL, NULL, NULL)",
        ["GET_BY_ID", id]
    );
    return rows[0];
};

const create = async (data) => {
    const { Society_Name, Address, City, State, Pincode, Created_By } = data;

    const [rows] = await db.query(
        "CALL SP_Society(?, NULL, ?, ?, ?, ?, ?, ?)",
        [
            "INSERT",
            Society_Name,
            Address,
            City,
            State,
            Pincode,
            Created_By
        ]
    );

    if (!rows || !rows[0] || !rows[0][0]) {
        return { message: "Insert failed or no response from DB" };
    }

    return rows[0][0];
};

const update = async (data) => {
    const { Society_Id, Society_Name, Address, City, State, Pincode, Created_By } = data;

    const [rows] = await db.query(
        "CALL SP_Society(?, ?, ?, ?, ?, ?, ?, ?)",
        [
            "UPDATE",
            Society_Id,
            Society_Name,
            Address,
            City,
            State,
            Pincode,
            Created_By
        ]
    );

    if (!rows || !rows[0] || !rows[0][0]) {
        return { message: "Update failed or no response from DB" };
    }

    return rows[0][0];
};

const remove = async (id) => {
    const [rows] = await db.query(
        "CALL SP_Society(?, ?, NULL, NULL, NULL, NULL, NULL, NULL)",
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
