const db = require("../config/db");

/* ======================= GET ALL ======================= */
const getAll = async () => {

    const values = new Array(85).fill(null);
    values[84] = "GET"; // last param = Action

    const placeholders = values.map(() => "?").join(",");

    const [rows] = await db.query(
        `CALL SP_Tenant_Master(${placeholders})`,
        values
    );

    return rows[0];
};


/* ======================= GET BY ID ======================= */
const getById = async (id) => {

    const values = new Array(85).fill(null);

    values[0] = id;       // P_Tenant_Id
    values[84] = "GET";   // P_Action

    const placeholders = values.map(() => "?").join(",");

    const [rows] = await db.query(
        `CALL SP_Tenant_Master(${placeholders})`,
        values
    );

    return rows[0];
};


/* ======================= CREATE ======================= */
const create = async (data) => {

    const values = new Array(85).fill(null);

    values[0] = null;

    values[1] = data.First_Name;
    values[2] = data.Middle_Name;
    values[3] = data.Last_Name;
    values[4] = data.Gender;
    values[5] = data.Date_of_Birth;
    values[6] = data.Age;

    values[7] = data.Marital_Status;
    values[8] = data.Nationality;
    values[9] = data.Occupation;
    values[10] = data.Company_Name;
    values[11] = data.Job_Title;

    values[12] = data.Contact_Number_1;
    values[13] = data.Contact_Number_2;
    values[14] = data.Email_Id;

    values[15] = data.Emergency_Contact_Name;
    values[16] = data.Emergency_Contact_Number;
    values[17] = data.Emergency_Contact_Relation;

    values[18] = data.Aadhaar_Number;
    values[19] = data.PAN_Number;
    values[20] = data.Passport_Number;
    values[21] = data.Driving_License_Number;
    values[22] = data.Voter_ID;

    values[23] = data.Aadhaar_Document;
    values[24] = data.PAN_Document;
    values[25] = data.Passport_Document;
    values[26] = data.Profile_Photo;

    values[27] = data.Current_Address_Line1;
    values[28] = data.Current_Address_Line2;
    values[29] = data.Current_Landmark;
    values[30] = data.Current_City;
    values[31] = data.Current_State;
    values[32] = data.Current_Country;
    values[33] = data.Current_Pincode;

    values[34] = data.Previous_Address_Line1;
    values[35] = data.Previous_Address_Line2;
    values[36] = data.Previous_Landmark;
    values[37] = data.Previous_City;
    values[38] = data.Previous_State;
    values[39] = data.Previous_Country;
    values[40] = data.Previous_Pincode;

    values[41] = data.Previous_Landlord_Name;
    values[42] = data.Previous_Landlord_Contact;

    values[43] = data.Flat_Id;
    values[44] = data.Building_Id;
    values[45] = data.Block_Id;
    values[46] = data.Floor_Number;
    values[47] = data.Flat_Number;

    values[48] = data.Lease_Start_Date;
    values[49] = data.Lease_End_Date;
    values[50] = data.Rent_Amount;
    values[51] = data.Security_Deposit;
    values[52] = data.Advance_Amount;
    values[53] = data.Payment_Mode;
    values[54] = data.Rent_Cycle;
    values[55] = data.Agreement_Number;

    values[56] = data.Number_of_Occupants;
    values[57] = data.Spouse_Name;
    values[58] = data.Children_Count;

    values[59] = data.Has_Vehicle;
    values[60] = data.Vehicle_Type;
    values[61] = data.Vehicle_Number;
    values[62] = data.Parking_Slot_Number;

    values[63] = data.Police_Verification_Status;
    values[64] = data.Police_Verification_Date;
    values[65] = data.Verified_By;
    values[66] = data.Verification_Remarks;

    values[67] = data.Blood_Group;
    values[68] = data.Religion;
    values[69] = data.Preferred_Language;

    values[70] = data.Move_In_Date;
    values[71] = data.Move_Out_Date;
    values[72] = data.Reason_For_Leaving;

    values[73] = data.Reference_Name;
    values[74] = data.Reference_Contact;

    values[75] = data.Digital_Signature;
    values[76] = data.Agreement_Document;

    values[77] = data.Tenant_Status;
    values[78] = 1; // Is_Active

    values[79] = data.Created_By;
    values[80] = null; // Created_Date
    values[81] = null; // Updated_By
    values[82] = null; // Updated_Date
    values[83] = data.Remarks;

    values[84] = "INSERT";

    const placeholders = values.map(() => "?").join(",");

    const [rows] = await db.query(
        `CALL SP_Tenant_Master(${placeholders})`,
        values
    );

    return rows[0][0];
};


/* ======================= UPDATE ======================= */
const update = async (data) => {

    const values = [
        data.Tenant_Id,
        data.First_Name, data.Middle_Name, data.Last_Name, data.Gender, data.Date_of_Birth, data.Age,
        data.Marital_Status, data.Nationality, data.Occupation, data.Company_Name, data.Job_Title,

        data.Contact_Number_1, data.Contact_Number_2, data.Email_Id,

        data.Emergency_Contact_Name, data.Emergency_Contact_Number, data.Emergency_Contact_Relation,

        data.Aadhaar_Number, data.PAN_Number, data.Passport_Number, data.Driving_License_Number, data.Voter_ID,

        data.Aadhaar_Document, data.PAN_Document, data.Passport_Document, data.Profile_Photo,

        data.Current_Address_Line1, data.Current_Address_Line2, data.Current_Landmark, data.Current_City,
        data.Current_State, data.Current_Country, data.Current_Pincode,

        data.Previous_Address_Line1, data.Previous_Address_Line2, data.Previous_Landmark,
        data.Previous_City, data.Previous_State, data.Previous_Country, data.Previous_Pincode,

        data.Previous_Landlord_Name, data.Previous_Landlord_Contact,

        data.Flat_Id, data.Building_Id, data.Block_Id, data.Floor_Number, data.Flat_Number,

        data.Lease_Start_Date, data.Lease_End_Date, data.Rent_Amount, data.Security_Deposit,
        data.Advance_Amount, data.Payment_Mode, data.Rent_Cycle, data.Agreement_Number,

        data.Number_of_Occupants, data.Spouse_Name, data.Children_Count,

        data.Has_Vehicle, data.Vehicle_Type, data.Vehicle_Number, data.Parking_Slot_Number,

        data.Police_Verification_Status, data.Police_Verification_Date, data.Verified_By, data.Verification_Remarks,

        data.Blood_Group, data.Religion, data.Preferred_Language,

        data.Move_In_Date, data.Move_Out_Date, data.Reason_For_Leaving,

        data.Reference_Name, data.Reference_Contact,

        data.Digital_Signature, data.Agreement_Document,

        data.Tenant_Status,
        data.Is_Active,

        null,
        null,
        data.Updated_By,
        null,
        data.Remarks,

        "UPDATE"
    ];

    const placeholders = values.map(() => "?").join(",");

    const [rows] = await db.query(`CALL SP_Tenant_Master(${placeholders})`, values);

    return rows[0][0];
};


/* ======================= STATUS CHANGE ======================= */
const changeStatus = async (data) => {

    const values = new Array(85).fill(null);
    values[0] = data.Tenant_Id;
    values[78] = data.Is_Active;
    values[81] = data.Updated_By;
    values[84] = "STATUS_CHNG";

    const placeholders = values.map(() => "?").join(",");

    const [rows] = await db.query(`CALL SP_Tenant_Master(${placeholders})`, values);

    return rows[0][0];
};


/* ======================= DELETE ======================= */
const remove = async (data) => {

    const values = new Array(85).fill(null);

    values[0] = data.Tenant_Id;
    values[81] = data.Updated_By;
    values[84] = "DELETE";

    const placeholders = values.map(() => "?").join(",");

    const [rows] = await db.query(`CALL SP_Tenant_Master(${placeholders})`, values);

    return rows[0][0];
};


module.exports = {
    getAll,
    getById,
    create,
    update,
    changeStatus,
    remove
};