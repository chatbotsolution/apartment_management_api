const db = require("../config/db");
const NULL_PARAMS = new Array(48).fill(null);
// GET ALL
const getAll = async () => {
    const [rows] = await db.query(
        "CALL sp_Owner_Master_CRUD(?" + ",?".repeat(48) + ")",
        ["GET_ALL", ...NULL_PARAMS]
    );
    return rows[0];
};

// GET ACTIVE MEMBERS
const getActive = async () => {
    const [rows] = await db.query(
        "CALL sp_Owner_Master_CRUD(?" + ",?".repeat(48) + ")",
        ["GET_ACTIVE", ...NULL_PARAMS]
    );
    return rows[0];
};

// GET BY ID
const getById = async (id) => {
    const [rows] = await db.query(
        "CALL sp_Owner_Master_CRUD(?" + ",?".repeat(48) + ")",
        ["SELECT_BY_ID", id, ...NULL_PARAMS.slice(1)]
    );
    return rows[0][0];
};

// GET BY FLAT
const getByFlat = async (flatId) => {
    const [rows] = await db.query(
       "CALL sp_Owner_Master_CRUD(?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,null, ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)",
        ["GET_BY_FLAT", flatId]
    );
    return rows[0];
};

// CREATE
const create = async (data) => {
    const values = ["INSERT",null,data.First_Name, data.Middle_Name,data.Last_Name,data.Gender,data.Date_of_Birth,data.Age,
        data.Marital_Status,data.Nationality, data.Flat_Id, data.Block_Id,data.Occupancy_Status,data.Property_Ownership_Type,
        data.Purchase_Date,data.Total_Family_Members, data.Live_With_Family,data.Mobile_Number_1,data.Mobile_Number_2,data.Email_Id,
        data.Emergency_Contact_Name,data.Emergency_Contact_Number,data.Emergency_Contact_Relation,data.Aadhaar_Number,
        data.PAN_Number,data.Passport_Number,data.Voter_ID,data.Aadhaar_Document || null,data.PAN_Document || null,
        data.Profile_Photo || null,data.Ownership_Deed_Doc || null,data.Address_Line1,data.Address_Line2,data.City,data.State,
        data.Country,data.Pincode,data.Username,data.Password_Hash,data.Vehicle_1_Number,data.Vehicle_1_Type,data.Vehicle_2_Number,
        data.KYC_Verified,data.Police_Verification_Status,data.User_Status,data.Created_By,  data.Has_Parking || 0,
        data.Parking_Type || null,data.Parking_Slot || null
    ];

    const placeholders = values.map(() => "?").join(",");

    const [rows] = await db.query(
        `CALL sp_Owner_Master_CRUD(${placeholders})`,
        values
    );

    return rows[0][0];
};

const update = async (data) => {
    const values = ["UPDATE",data.Owner_Id,data.First_Name, data.Middle_Name,data.Last_Name,data.Gender,data.Date_of_Birth,data.Age,
        data.Marital_Status,data.Nationality, data.Flat_Id, data.Block_Id,data.Occupancy_Status,data.Property_Ownership_Type,
        data.Purchase_Date,data.Total_Family_Members, data.Live_With_Family,data.Mobile_Number_1,data.Mobile_Number_2,data.Email_Id,
        data.Emergency_Contact_Name,data.Emergency_Contact_Number,data.Emergency_Contact_Relation,data.Aadhaar_Number,
        data.PAN_Number,data.Passport_Number,data.Voter_ID,data.Aadhaar_Document || null,data.PAN_Document || null,
        data.Profile_Photo || null,data.Ownership_Deed_Doc || null,data.Address_Line1,data.Address_Line2,data.City,
        data.State,data.Country,data.Pincode,data.Username,data.Password_Hash,data.Vehicle_1_Number,data.Vehicle_1_Type,
        data.Vehicle_2_Number,data.KYC_Verified,data.Police_Verification_Status,data.User_Status,data.Created_By,  data.Has_Parking || 0,
        data.Parking_Type || null,data.Parking_Slot || null
    ];

    const placeholders = values.map(() => "?").join(",");

    const [rows] = await db.query(
        `CALL sp_Owner_Master_CRUD(${placeholders})`,
        values
    );

    return rows[0];
};
// DELETE
const remove = async (id) => {
    const [rows] = await db.query(
        "CALL sp_Owner_Master_CRUD(?, ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)",
        ["DELETE", id]
    );
    return rows[0];
};
const toggleStatus = async (id) => {
    const [rows] = await db.query(
        "CALL sp_Owner_Master_CRUD(?, ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)",
        ["TOGGLE_STATUS", id]
    );

    return rows[0][0]; // returns updated status
};

module.exports = {
    getAll,
    getActive,
    getById,
    getByFlat,
    create,
    update,
    delete: remove,
    toggleStatus
};