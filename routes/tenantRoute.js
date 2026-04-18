const express = require("express");
const router = express.Router();
const controller = require("../controllers/tenantController");
const upload = require("../middlewares/upload.middleware");
console.log("Tenant Route File Loaded");

/**
 * @swagger
 * tags:
 *   name: Tenant Master
 */


/* ======================= GET ALL ======================= */
/**
 * @swagger
 * /TenantMaster/GetAllTenant:
 *   get:
 *     summary: Get all tenants
 *     tags: [Tenant Master]
 *     responses:
 *       200:
 *         description: Tenant list
 */
router.get("/TenantMaster/GetAllTenant", controller.getAll);


/* ======================= GET BY ID ======================= */
/**
 * @swagger
 * /TenantMaster/GetTenantById/{id}:
 *   get:
 *     summary: Get tenant by ID
 *     tags: [Tenant Master]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tenant details
 */
router.get("/TenantMaster/GetTenantById/:id", controller.getById);


/* ======================= CREATE ======================= */
/**
 * @swagger
 * /TenantMaster/CreateTenant:
 *   post:
 *     summary: Create tenant
 *     tags: [Tenant Master]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:

 *               First_Name:
 *                 type: string
 *               Middle_Name:
 *                 type: string
 *               Last_Name:
 *                 type: string
 *               Gender:
 *                 type: string
 *               Date_of_Birth:
 *                 type: string
 *                 format: date
 *               Age:
 *                 type: integer
 *               Marital_Status:
 *                 type: string
 *               Nationality:
 *                 type: string
 *               Occupation:
 *                 type: string
 *               Company_Name:
 *                 type: string
 *               Job_Title:
 *                 type: string

 *               Contact_Number_1:
 *                 type: string
 *               Contact_Number_2:
 *                 type: string
 *               Email_Id:
 *                 type: string

 *               Emergency_Contact_Name:
 *                 type: string
 *               Emergency_Contact_Number:
 *                 type: string
 *               Emergency_Contact_Relation:
 *                 type: string

 *               Aadhaar_Number:
 *                 type: string
 *               PAN_Number:
 *                 type: string
 *               Passport_Number:
 *                 type: string
 *               Driving_License_Number:
 *                 type: string
 *               Voter_ID:
 *                 type: string

 *               Aadhaar_Document:
 *                 type: string
 *                 format: binary
 *               PAN_Document:
 *                 type: string
 *                 format: binary
 *               Passport_Document:
 *                 type: string
 *                 format: binary
 *               Profile_Photo:
 *                 type: string
 *                 format: binary

 *               Current_Address_Line1:
 *                 type: string
 *               Current_Address_Line2:
 *                 type: string
 *               Current_Landmark:
 *                 type: string
 *               Current_City:
 *                 type: string
 *               Current_State:
 *                 type: string
 *               Current_Country:
 *                 type: string
 *               Current_Pincode:
 *                 type: string

 *               Previous_Address_Line1:
 *                 type: string
 *               Previous_Address_Line2:
 *                 type: string
 *               Previous_Landmark:
 *                 type: string
 *               Previous_City:
 *                 type: string
 *               Previous_State:
 *                 type: string
 *               Previous_Country:
 *                 type: string
 *               Previous_Pincode:
 *                 type: string

 *               Previous_Landlord_Name:
 *                 type: string
 *               Previous_Landlord_Contact:
 *                 type: string

 *               Flat_Id:
 *                 type: integer
 *               Building_Id:
 *                 type: integer
 *               Block_Id:
 *                 type: integer
 *               Floor_Number:
 *                 type: integer
 *               Flat_Number:
 *                 type: string

 *               Lease_Start_Date:
 *                 type: string
 *                 format: date
 *               Lease_End_Date:
 *                 type: string
 *                 format: date
 *               Rent_Amount:
 *                 type: number
 *               Security_Deposit:
 *                 type: number
 *               Advance_Amount:
 *                 type: number
 *               Payment_Mode:
 *                 type: string
 *               Rent_Cycle:
 *                 type: string
 *               Agreement_Number:
 *                 type: string

 *               Number_of_Occupants:
 *                 type: integer
 *               Spouse_Name:
 *                 type: string
 *               Children_Count:
 *                 type: integer

 *               Has_Vehicle:
 *                 type: integer
 *               Vehicle_Type:
 *                 type: string
 *               Vehicle_Number:
 *                 type: string
 *               Parking_Slot_Number:
 *                 type: string

 *               Police_Verification_Status:
 *                 type: string
 *               Police_Verification_Date:
 *                 type: string
 *                 format: date
 *               Verified_By:
 *                 type: integer
 *               Verification_Remarks:
 *                 type: string

 *               Blood_Group:
 *                 type: string
 *               Religion:
 *                 type: string
 *               Preferred_Language:
 *                 type: string

 *               Move_In_Date:
 *                 type: string
 *                 format: date
 *               Move_Out_Date:
 *                 type: string
 *                 format: date
 *               Reason_For_Leaving:
 *                 type: string

 *               Reference_Name:
 *                 type: string
 *               Reference_Contact:
 *                 type: string

 *               Digital_Signature:
 *                 type: string
 *               Agreement_Document:
 *                 type: string

 *               Tenant_Status:
 *                 type: string
 *               Created_By:
 *                 type: integer
 *               Remarks:
 *                 type: string
 *               Owner_Id:
 *                  type: integer

 *     responses:
 *       200:
 *         description: Tenant created successfully
 */
router.post(
  "/TenantMaster/CreateTenant",
  upload.fields([
    { name: "Aadhaar_Document", maxCount: 1 },
    { name: "PAN_Document", maxCount: 1 },
    { name: "Passport_Document", maxCount: 1 },
    { name: "Profile_Photo", maxCount: 1 }
  ]),
  controller.create
);


/* ======================= UPDATE ======================= */
/**
 * @swagger
 * /TenantMaster/UpdateTenant:
 *   put:
 *     summary: Update tenant
 *     tags: [Tenant Master]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:

 *               Tenant_Id:
 *                 type: integer

 *               First_Name:
 *                 type: string
 *               Middle_Name:
 *                 type: string
 *               Last_Name:
 *                 type: string
 *               Gender:
 *                 type: string
 *               Date_of_Birth:
 *                 type: string
 *                 format: date
 *               Age:
 *                 type: integer
 *               Marital_Status:
 *                 type: string
 *               Nationality:
 *                 type: string
 *               Occupation:
 *                 type: string
 *               Company_Name:
 *                 type: string
 *               Job_Title:
 *                 type: string

 *               Contact_Number_1:
 *                 type: string
 *               Contact_Number_2:
 *                 type: string
 *               Email_Id:
 *                 type: string

 *               Emergency_Contact_Name:
 *                 type: string
 *               Emergency_Contact_Number:
 *                 type: string
 *               Emergency_Contact_Relation:
 *                 type: string

 *               Aadhaar_Number:
 *                 type: string
 *               PAN_Number:
 *                 type: string
 *               Passport_Number:
 *                 type: string
 *               Driving_License_Number:
 *                 type: string
 *               Voter_ID:
 *                 type: string

 *               Aadhaar_Document:
 *                 type: string
 *                 format: binary
 *               PAN_Document:
 *                 type: string
 *                 format: binary
 *               Passport_Document:
 *                 type: string
 *                 format: binary
 *               Profile_Photo:
 *                 type: string
 *                 format: binary

 *               Current_Address_Line1:
 *                 type: string
 *               Current_Address_Line2:
 *                 type: string
 *               Current_Landmark:
 *                 type: string
 *               Current_City:
 *                 type: string
 *               Current_State:
 *                 type: string
 *               Current_Country:
 *                 type: string
 *               Current_Pincode:
 *                 type: string

 *               Previous_Address_Line1:
 *                 type: string
 *               Previous_Address_Line2:
 *                 type: string
 *               Previous_Landmark:
 *                 type: string
 *               Previous_City:
 *                 type: string
 *               Previous_State:
 *                 type: string
 *               Previous_Country:
 *                 type: string
 *               Previous_Pincode:
 *                 type: string

 *               Previous_Landlord_Name:
 *                 type: string
 *               Previous_Landlord_Contact:
 *                 type: string

 *               Flat_Id:
 *                 type: integer
 *               Building_Id:
 *                 type: integer
 *               Block_Id:
 *                 type: integer
 *               Floor_Number:
 *                 type: integer
 *               Flat_Number:
 *                 type: string

 *               Lease_Start_Date:
 *                 type: string
 *                 format: date
 *               Lease_End_Date:
 *                 type: string
 *                 format: date
 *               Rent_Amount:
 *                 type: number
 *               Security_Deposit:
 *                 type: number
 *               Advance_Amount:
 *                 type: number
 *               Payment_Mode:
 *                 type: string
 *               Rent_Cycle:
 *                 type: string
 *               Agreement_Number:
 *                 type: string

 *               Number_of_Occupants:
 *                 type: integer
 *               Spouse_Name:
 *                 type: string
 *               Children_Count:
 *                 type: integer

 *               Has_Vehicle:
 *                 type: integer
 *               Vehicle_Type:
 *                 type: string
 *               Vehicle_Number:
 *                 type: string
 *               Parking_Slot_Number:
 *                 type: string

 *               Police_Verification_Status:
 *                 type: string
 *               Police_Verification_Date:
 *                 type: string
 *                 format: date
 *               Verified_By:
 *                 type: integer
 *               Verification_Remarks:
 *                 type: string

 *               Blood_Group:
 *                 type: string
 *               Religion:
 *                 type: string
 *               Preferred_Language:
 *                 type: string

 *               Move_In_Date:
 *                 type: string
 *                 format: date
 *               Move_Out_Date:
 *                 type: string
 *                 format: date
 *               Reason_For_Leaving:
 *                 type: string

 *               Reference_Name:
 *                 type: string
 *               Reference_Contact:
 *                 type: string

 *               Digital_Signature:
 *                 type: string
 *               Agreement_Document:
 *                 type: string

 *               Tenant_Status:
 *                 type: string
 *               Is_Active:
 *                 type: integer
 *               Updated_By:
 *                 type: integer
 *               Remarks:
 *                 type: string
 *               Owner_Id:
 *                  type: string

 *     responses:
 *       200:
 *         description: Tenant updated successfully
 */
router.put(
    "/TenantMaster/UpdateTenant",
    upload.fields([
        { name: "Aadhaar_Document", maxCount: 1 },
        { name: "PAN_Document", maxCount: 1 },
        { name: "Passport_Document", maxCount: 1 },
        { name: "Profile_Photo", maxCount: 1 }
    ]),
    controller.update
);


/* ======================= STATUS CHANGE ======================= */
/**
 * @swagger
 * /TenantMaster/ChangeStatus/{Tenant_Id}/{Is_Active}/{Updated_By}:
 *   patch:
 *     summary: Change tenant status
 *     tags: [Tenant Master]
 *     parameters:
 *       - in: path
 *         name: Tenant_Id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: Is_Active
 *         required: true
 *         schema:
 *           type: boolean
 *       - in: path
 *         name: Updated_By
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Status changed successfully
 */
router.patch("/TenantMaster/ChangeStatus/:Tenant_Id/:Is_Active/:Updated_By", controller.changeStatus);


/* ======================= DELETE ======================= */
/**
 * @swagger
 * /TenantMaster/DeleteTenant/{Tenant_Id}/{Updated_By}:
 *   delete:
 *     summary: Soft delete tenant
 *     tags: [Tenant Master]
 *     parameters:
 *       - in: path
 *         name: Tenant_Id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: Updated_By
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tenant deleted successfully
 */
router.delete("/TenantMaster/DeleteTenant/:Tenant_Id/:Updated_By", controller.remove);


module.exports = router;