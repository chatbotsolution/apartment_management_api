const db = require("../config/db");

const getAll = async () => {
    const [rows] = await db.query(
        "CALL SP_Staff(?, NULL, NULL, NULL, NULL, NULL, NULL)",
        ["GET_ALL"]
    );
    return rows[0];
};

const getById = async (id) => {
    const [rows] = await db.query(
        "CALL SP_Staff(?, ?, NULL, NULL, NULL, NULL, NULL)",
        ["GET_BY_ID", id]
    );
    return rows[0];
};

const create = async (data) => {
    console.log("Staff Data = ", data);

    const { Name, Role, Mobile, Shift } = data;

    const [rows] = await db.query(
        "CALL SP_Staff(?, NULL, ?, ?, ?, ?, NULL)",
        [
            "INSERT",
            Name,
            Role,
            Mobile,
            Shift
        ]
    );

    if (!rows || !rows[0] || !rows[0][0]) {
        return { message: "Insert failed or no response from DB" };
    }

    return rows[0][0];
};

const update = async (data) => {
    const { Staff_Id, Name, Role, Mobile, Shift, Is_Active } = data;

    const [rows] = await db.query(
        "CALL SP_Staff(?, ?, ?, ?, ?, ?, ?)",
        [
            "UPDATE",
            Staff_Id,
            Name,
            Role,
            Mobile,
            Shift,
            Is_Active
        ]
    );

    return rows[0][0];
};

const remove = async (id) => {
    const [rows] = await db.query(
        "CALL SP_Staff(?, ?, NULL, NULL, NULL, NULL, NULL)",
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