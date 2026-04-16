const express = require("express");
const router = express.Router();
const controller = require("../controllers/memberController");
const upload = require("../middlewares/upload.middleware");


/**
 * @swagger
 * components:
 *   schemas:

 *     MemberOwner:
 *       type: object
 *       properties:
 *         Owner_Id:
 *           type: integer
 *         First_Name:
 *           type: string
 *         Middle_Name:
 *           type: string
 *         Last_Name:
 *           type: string
 *         Gender:
 *           type: string
 *         Date_of_Birth:
 *           type: string
 *           format: date
 *         Age:
 *           type: integer
 *         Marital_Status:
 *           type: string
 *         Nationality:
 *           type: string
 *         Flat_Id:
 *           type: integer
 *         Block_Id:
 *           type: integer
 *         Flat_Name:
 *           type: string
 *         Block_Name:
 *           type: string
 *         Occupancy_Status:
 *           type: string
 *         Property_Ownership_Type:
 *           type: string
 *         Purchase_Date:
 *           type: string
 *           format: date
 *         Total_Family_Members:
 *           type: integer
 *         Live_With_Family:
 *           type: boolean
 *         Mobile_Number_1:
 *           type: string
 *         Mobile_Number_2:
 *           type: string
 *         Email_Id:
 *           type: string
 *         Emergency_Contact_Name:
 *           type: string
 *         Emergency_Contact_Number:
 *           type: string
 *         Emergency_Contact_Relation:
 *           type: string
 *         Aadhaar_Number:
 *           type: string
 *         PAN_Number:
 *           type: string
 *         Passport_Number:
 *           type: string
 *         Voter_ID:
 *           type: string
 *         Aadhaar_Document:
 *           type: string
 *         PAN_Document:
 *           type: string
 *         Profile_Photo:
 *           type: string
 *         Ownership_Deed_Doc:
 *           type: string
 *         Address_Line1:
 *           type: string
 *         Address_Line2:
 *           type: string
 *         City:
 *           type: string
 *         State:
 *           type: string
 *         Country:
 *           type: string
 *         Pincode:
 *           type: string
 *         Username:
 *           type: string
 *         Password_Hash:
 *           type: string
 *         Vehicle_1_Number:
 *           type: string
 *         Vehicle_1_Type:
 *           type: string
 *         Vehicle_2_Number:
 *           type: string
 *         KYC_Verified:
 *           type: boolean
 *         Is_Deleted:
 *           type: boolean
 *         Police_Verification_Status:
 *           type: string
 *         User_Status:
 *           type: string
 *         Created_By:
 *           type: string
 *         Has_Parking:   
 *           type: boolean
 *         Parking_Type: 
 *           type: integer
 *         Parking_Slot:
 *           type: integer

 *     MemberOwnerCreate:
 *       type: object
 *       required:
 *         - First_Name
 *         - Flat_Id
 *         - Block_Id
 *       properties:
 *         Owner_Id:
 *           type: integer
 *         First_Name:
 *           type: string
 *         Middle_Name:
 *           type: string
 *         Last_Name:
 *           type: string
 *         Gender:
 *           type: string
 *         Date_of_Birth:
 *           type: string
 *           format: date
 *         Age:
 *           type: integer
 *         Marital_Status:
 *           type: string
 *         Nationality:
 *           type: string
 *         Flat_Id:
 *           type: integer
 *         Block_Id:
 *           type: integer
 *         Occupancy_Status:
 *           type: string
 *         Property_Ownership_Type:
 *           type: string
 *         Purchase_Date:
 *           type: string
 *           format: date
 *         Total_Family_Members:
 *           type: integer
 *         Live_With_Family:
 *           type: boolean
 *         Mobile_Number_1:
 *           type: string
 *         Mobile_Number_2:
 *           type: string
 *         Email_Id:
 *           type: string
 *         Emergency_Contact_Name:
 *           type: string
 *         Emergency_Contact_Number:
 *           type: string
 *         Emergency_Contact_Relation:
 *           type: string
 *         Aadhaar_Number:
 *           type: string
 *         PAN_Number:
 *           type: string
 *         Passport_Number:
 *           type: string
 *         Voter_ID:
 *           type: string
 *         Aadhaar_Document:
 *           type: string
 *           format: binary
 *         PAN_Document:
 *           type: string
 *           format: binary
 *         Profile_Photo:
 *           type: string
 *           format: binary
 *         Ownership_Deed_Doc:
 *           type: string
 *           format: binary
 *         Address_Line1:
 *           type: string
 *         Address_Line2:
 *           type: string
 *         City:
 *           type: string
 *         State:
 *           type: string
 *         Country:
 *           type: string
 *         Pincode:
 *           type: string
 *         Username:
 *           type: string
 *         Password_Hash:
 *           type: string
 *         Vehicle_1_Number:
 *           type: string
 *         Vehicle_1_Type:
 *           type: string
 *         Vehicle_2_Number:
 *           type: string
 *         KYC_Verified:
 *           type: boolean
 *         Police_Verification_Status:
 *           type: string
 *         User_Status:
 *           type: string
 *         Created_By:
 *           type: string
 *         Has_Parking:   
 *           type: boolean
 *         Parking_Type: 
 *           type: integer
 *         Parking_Slot:
 *           type: integer
 */

/**
 * @swagger
 * tags:
 *   name: Member
 *   description: Member management APIs
 */


/* ======================= GET ALL ======================= */
/**
 * @swagger
 * /Member/GetAllMember:
 *   get:
 *     summary: Get all members (owners)
 *     tags: [Member]
 *     responses:
 *       200:
 *         description: List retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/MemberOwner'
 */
router.get("/Member/GetAllMember", controller.getAll);

/* ======================= GET ACTIVE ======================= */
/**
 * @swagger
 * /Member/GetActiveMember:
 *   get:
 *     summary: Get active members (owners)
 *     tags: [Member]
 *     responses:
 *       200:
 *         description: Active list retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/MemberOwner'
 */
router.get("/Member/GetActiveMember", controller.getActive);

/* ======================= GET BY ID ======================= */
/**
 * @swagger
 * /Member/GetMemberById/{id}:
 *   get:
 *     summary: Get member (owner) by ID
 *     tags: [Member]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Record retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/MemberOwner'
 */
router.get("/Member/GetMemberById/:id", controller.getById);

/* ======================= GET BY FLAT ======================= */
/**
  * @swagger
 * /Member/GetMemberByFlat/{flatId}:
 *   get:
 *     summary: Get members by flat ID
 *     tags: [Member]
 *     parameters:
 *       - in: path
 *         name: flatId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/MemberOwner'
 */
router.get("/Member/GetMemberByFlat/:flatId", controller.getByFlat);

/* ======================= CREATE ======================= */
/**
 * @swagger
 * /Member/CreateMember:
 *   post:
 *     summary: Create member (owner)
 *     tags: [Member]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/MemberOwnerCreate'
 *     responses:
 *       200:
 *         description: Created successfully
 */
router.post(
  "/Member/CreateMember",
  upload.fields([
    { name: "Aadhaar_Document", maxCount: 1 },
    { name: "PAN_Document", maxCount: 1 },
    { name: "Profile_Photo", maxCount: 1 },
    { name: "Ownership_Deed_Doc", maxCount: 1 }
  ]),
  controller.create
);

/* ======================= UPDATE ======================= */
/**
 * @swagger
 * /Member/UpdateMember:
 *   put:
 *     summary: Update member (owner)
 *     tags: [Member]
 *     requestBody:
 *       required: true
 *       content:
 *          multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/MemberOwnerCreate'
 *     responses:
 *       200:
 *         description: Updated successfully
 */
router.put(
  "/Member/UpdateMember",
  upload.fields([
    { name: "Aadhaar_Document", maxCount: 1 },
    { name: "PAN_Document", maxCount: 1 },
    { name: "Profile_Photo", maxCount: 1 },
    { name: "Ownership_Deed_Doc", maxCount: 1 }
  ]),
  controller.update
);

/* ======================= DELETE ======================= */
/**
  * @swagger
 * /Member/DeleteMember/{id}:
 *   delete:
 *     summary: Delete member (owner)
 *     tags: [Member]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Deleted successfully
 */
router.delete("/Member/DeleteMember/:id", controller.remove);

/**
 * @swagger
 * /Member/ToggleStatus/{id}:
 *   put:
 *     summary: Toggle Active/Inactive status
 *     tags: [Member]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Status toggled successfully
 */
router.put("/Member/ToggleStatus/:id", controller.toggleStatus);


module.exports = router;