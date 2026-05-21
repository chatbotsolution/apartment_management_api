const express = require("express");
const router = express.Router();

const controller = require("../controllers/staffController");
const upload = require("../middlewares/upload.middleware");

/* =========================================================
   STAFF MASTER ROUTES
========================================================= */

/**
 * @swagger
 * tags:
 *   name: Staff Master
 *   description: Staff management APIs
 */

/* =========================================================
   INSERT STAFF
========================================================= */

/**
 * @swagger
 * /Staff/Insert:
 *   post:
 *     summary: Create a new staff member
 *     description: Create staff profile and login credentials
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
 *               user_id:
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
 *               salary:
 *                 type: number
 *               shift_timing:
 *                 type: string
 *               country_id:
 *                 type: integer
 *               state_id:
 *                 type: integer
 *               district_id:
 *                 type: integer
 *               postal_code:
 *                 type: string
 *               address:
 *                 type: string
 *               emergency_contact:
 *                 type: string
 *               status_id:
 *                 type: integer
 *                 default: 92
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               role_id:
 *                 type: integer
 *                 default: 3
 *               photo_url:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Staff created successfully
 *       400:
 *         description: Bad request
 */
router.post(
  "/Staff/Insert",
  upload.single("photo_url"),
  controller.insert
);

/* =========================================================
   UPDATE STAFF
========================================================= */

/**
 * @swagger
 * /Staff/Update:
 *   put:
 *     summary: Update staff details
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
 *               user_id:
 *                 type: integer
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
 *               state_id:
 *                 type: integer
 *               district_id:
 *                 type: integer
 *               postal_code:
 *                 type: string
 *               address:
 *                 type: string
 *               emergency_contact:
 *                 type: string
 *               status_id:
 *                 type: integer
 *               photo_url:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Staff updated successfully
 *       400:
 *         description: Bad request
 */
router.put(
  "/Staff/Update",
  upload.single("photo_url"),
  controller.update
);

/* =========================================================
   UPDATE STATUS
========================================================= */

/**
 * @swagger
 * /Staff/UpdateStatus:
 *   put:
 *     summary: Update staff status
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
 *               user_id:
 *                 type: integer
 *               staff_id:
 *                 type: integer
 *               status_id:
 *                 type: integer
 *                 description: 92=Active, 93=Inactive, 94=On Leave, 95=Terminated
 *     responses:
 *       200:
 *         description: Status updated successfully
 *       400:
 *         description: Missing required fields
 */
router.put("/Staff/UpdateStatus", controller.updateStatus);

/* =========================================================
   DELETE STAFF
========================================================= */

/**
 * @swagger
 * /Staff/Delete:
 *   post:
 *     summary: Soft delete staff
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
 *               user_id:
 *                 type: integer
 *               staff_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Staff deleted successfully
 */
router.post("/Staff/Delete", controller.remove);

/* =========================================================
   GET STAFF BY ID
========================================================= */

/**
 * @swagger
 * /Staff/GetById/{id}:
 *   get:
 *     summary: Get staff by ID
 *     tags: [Staff Master]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Staff ID
 *     responses:
 *       200:
 *         description: Staff details fetched successfully
 *       404:
 *         description: Staff not found
 */
router.get("/Staff/GetById/:id", controller.getById);

/* =========================================================
   GET ALL STAFF
========================================================= */

/**
 * @swagger
 * /Staff/GetAll:
 *   get:
 *     summary: Get all staff members
 *     tags: [Staff Master]
 *     parameters:
 *       - in: query
 *         name: society_id
 *         schema:
 *           type: integer
 *         required: false
 *         description: Filter by society ID
 *     responses:
 *       200:
 *         description: Staff list fetched successfully
 */
router.get("/Staff/GetAll", controller.getAll);

/* =========================================================
   SEARCH STAFF
========================================================= */

/**
 * @swagger
 * /Staff/Search:
 *   get:
 *     summary: Search staff
 *     tags: [Staff Master]
 *     parameters:
 *       - in: query
 *         name: society_id
 *         schema:
 *           type: integer
 *         required: false
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         required: false
 *         description: Search by name, phone, designation
 *     responses:
 *       200:
 *         description: Search result fetched successfully
 */
router.get("/Staff/Search", controller.search);

module.exports = router;