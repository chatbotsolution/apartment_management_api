const express = require("express");
const router = express.Router();
const controller = require("../controllers/staffController");
const upload = require("../middlewares/upload.middleware");

/* ======================= TAG ======================= */
/**
 * @swagger
 * tags:
 *   name: Staff Master
 *   description: Staff management and user credential APIs
 */

/* ======================= INSERT ======================= */
/**
 * @swagger
 * /Staff/Insert:
 *   post:
 *     summary: Create a new staff member and generate their user account
 *     tags: [Staff Master]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - first_name
 *               - phone
 *               - email
 *               - society_id
 *               - password
 *             properties:
 *               society_id:
 *                 type: integer
 *                 description: ID of the society
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               designation:
 *                 type: string
 *               department:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               aadhaar_number:
 *                 type: string
 *               date_of_birth:
 *                 type: string
 *                 format: date
 *               gender_id:
 *                 type: integer
 *               joining_date:
 *                 type: string
 *                 format: date
 *               salary:
 *                 type: number
 *               shift_timing:
 *                 type: string
 *               country_id:
 *                 type: integer
 *                 description: ID of the selected country
 *               state_id:
 *                 type: integer
 *                 description: ID of the selected state
 *               district_id:
 *                 type: integer
 *                 description: ID of the selected district
 *               postal_code:
 *                 type: string
 *                 description: Postal or Zip code
 *               address:
 *                 type: string
 *               emergency_contact:
 *                 type: string
 *               status_id:
 *                 type: integer
 *                 default: 92
 *               photo_url:
 *                 type: string
 *                 format: binary
 *                 description: Staff profile photo
 *               username:
 *                 type: string
 *                 description: Synced with email from frontend
 *               password:
 *                 type: string
 *                 description: User login password
 *               role_id:
 *                 type: integer
 *                 default: 3
 *     responses:
 *       200:
 *         description: Staff and User account created successfully
 *       400:
 *         description: Bad request / Missing required fields
 */
router.post("/Staff/Insert", upload.single("photo_url"), controller.insert);

/* ======================= UPDATE ======================= */
/**
 * @swagger
 * /Staff/Update:
 *   put:
 *     summary: Update an existing staff member's profile
 *     tags: [Staff Master]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - staff_id
 *             properties:
 *               staff_id:
 *                 type: integer
 *               society_id:
 *                 type: integer
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               designation:
 *                 type: string
 *               department:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               aadhaar_number:
 *                 type: string
 *               date_of_birth:
 *                 type: string
 *                 format: date
 *               gender_id:
 *                 type: integer
 *               joining_date:
 *                 type: string
 *                 format: date
 *               leaving_date:
 *                 type: string
 *                 format: date
 *               salary:
 *                 type: number
 *               shift_timing:
 *                 type: string
 *               country_id:
 *                 type: integer
 *                 description: ID of the selected country
 *               state_id:
 *                 type: integer
 *                 description: ID of the selected state
 *               district_id:
 *                 type: integer
 *                 description: ID of the selected district
 *               postal_code:
 *                 type: string
 *                 description: Postal or Zip code
 *               address:
 *                 type: string
 *               emergency_contact:
 *                 type: string
 *               status_id:
 *                 type: integer
 *               photo_url:
 *                 type: string
 *                 format: binary
 *                 description: Upload new photo or pass existing URL string
 *     responses:
 *       200:
 *         description: Staff updated successfully
 *       400:
 *         description: Bad request
 */
router.put("/Staff/Update", upload.single("photo_url"), controller.update);

/* ======================= UPDATE STATUS ======================= */
/**
 * @swagger
 * /Staff/UpdateStatus:
 *   put:
 *     summary: Change the active status of a staff member
 *     tags: [Staff Master]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - staff_id
 *               - status_id
 *             properties:
 *               staff_id:
 *                 type: integer
 *                 example: 1
 *               status_id:
 *                 type: integer
 *                 example: 93
 *                 description: New status ID (92=Active, 93=Inactive, 94=On Leave, 95=Terminated)
 *     responses:
 *       200:
 *         description: Status updated successfully
 *       400:
 *         description: Missing required fields
 */
router.put("/Staff/UpdateStatus", controller.updateStatus);

/* ======================= DELETE ======================= */
/**
 * @swagger
 * /Staff/Delete:
 *   post:
 *     summary: Soft delete/deactivate a staff member
 *     tags: [Staff Master]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - staff_id
 *             properties:
 *               staff_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Staff deactivated successfully
 */
router.post("/Staff/Delete", controller.remove);

/* ======================= GET BY ID ======================= */
/**
 * @swagger
 * /Staff/GetById/{id}:
 *   get:
 *     summary: Get full profile of a staff member by their ID
 *     tags: [Staff Master]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The staff ID
 *     responses:
 *       200:
 *         description: Staff details fetched successfully
 *       404:
 *         description: Staff not found
 */
router.get("/Staff/GetById/:id", controller.getById);

/* ======================= GET ALL ======================= */
/**
 * @swagger
 * /Staff/GetAll:
 *   get:
 *     summary: Get a list of all staff members
 *     tags: [Staff Master]
 *     parameters:
 *       - in: query
 *         name: society_id
 *         required: false
 *         schema:
 *           type: integer
 *         description: Filter staff by society ID
 *     responses:
 *       200:
 *         description: List of staff fetched successfully
 */
router.get("/Staff/GetAll", controller.getAll);

/* ======================= SEARCH ======================= */
/**
 * @swagger
 * /Staff/Search:
 *   get:
 *     summary: Search staff by keyword (name, phone, designation)
 *     tags: [Staff Master]
 *     parameters:
 *       - in: query
 *         name: society_id
 *         required: false
 *         schema:
 *           type: integer
 *         description: Scope search to a specific society ID
 *       - in: query
 *         name: keyword
 *         required: false
 *         schema:
 *           type: string
 *         description: Keyword to search for
 *     responses:
 *       200:
 *         description: Search results
 */
router.get("/Staff/Search", controller.search);

module.exports = router;