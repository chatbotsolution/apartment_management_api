const db = require("../config/db");

/* ======================= GET ALL ======================= */
const getAll = async (societyId, page = 1, pageSize = 10) => {
    const [rows] = await db.query(
        "CALL sp_owner(?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [
            "GET_ALL",
            null,
            societyId,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            page,
            pageSize
        ]
    );

    return {
        data: rows[0] || [],
        total: rows[1]?.[0]?.total_records || 0
    };
};


/* ======================= SEARCH ======================= */
const search = async (societyId, keyword, page = 1, pageSize = 10) => {
    const [rows] = await db.query(
        "CALL sp_owner(?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [
            "SEARCH",
            null,
            societyId,
            keyword,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            page,
            pageSize
        ]
    );

    return {
        data: rows[0] || [],
        total: rows[1]?.[0]?.total_records || 0
    };
};


/* ======================= GET BY ID ======================= */
const getById = async (id, societyId) => {
    const [rows] = await db.query(
        "CALL sp_owner(?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [
            "GET_BY_ID",
            id,
            societyId,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
        ]
    );

    return rows[0];
};

module.exports = {
    getAll,
    search,
    getById
};