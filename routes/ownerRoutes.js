const express = require("express");
const router = express.Router();

const controller = require("../controllers/ownerController");
const upload = require("../middlewares/upload.middleware");

/* =========================================================
   OWNER MASTER ROUTES
========================================================= */

/**
 * @swagger
 * tags:
 *   name: Owner Master
 *   description: Owner management APIs
 */

/* =========================================================
   GET ALL OWNERS
========================================================= */

/**
 * @swagger
 * /OwnerMaster/GetAll:
 *   get:
 *     summary: Get all owners
 *     tags: [Owner Master]
 *     parameters:
 *       - in: query
 *         name: society_id
 *         schema:
 *           type: string
 *         required: false
 *         description: Single or comma separated society IDs
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *         example: 1
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *         required: false
 *         example: 10
 *     responses:
 *       200:
 *         description: Owners fetched successfully
 */
router.get("/OwnerMaster/GetAll", controller.getAll);


/* =========================================================
   SEARCH OWNERS
========================================================= */

/**
 * @swagger
 * /OwnerMaster/Search:
 *   get:
 *     summary: Search owners
 *     tags: [Owner Master]
 *     parameters:
 *       - in: query
 *         name: society_id
 *         schema:
 *           type: string
 *         required: false
 *         description: Single or comma separated society IDs
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         required: false
 *         description: Search by first name, last name or phone
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Search result fetched successfully
 */
router.get("/OwnerMaster/Search", controller.search);


/* =========================================================
   GET OWNER BY ID
========================================================= */

/**
 * @swagger
 * /OwnerMaster/GetById/{id}:
 *   get:
 *     summary: Get owner details by ID
 *     tags: [Owner Master]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Owner ID
 *       - in: query
 *         name: society_id
 *         required: false
 *         schema:
 *           type: string
 *         description: Society ID
 *     responses:
 *       200:
 *         description: Owner fetched successfully
 *       404:
 *         description: Owner not found
 */
router.get("/OwnerMaster/GetById/:id", controller.getById);


/* =========================================================
   CREATE OWNER
========================================================= */

/**
 * @swagger
 * /OwnerMaster/Create:
 *   post:
 *     summary: Create owner and user account
 *     tags: [Owner Master]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - society_id
 *               - first_name
 *               - email
 *               - phone
 *             properties:
 *               user_id:
 *                 type: integer
 *               society_id:
 *                 type: integer
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               alternate_phone:
 *                 type: string
 *               aadhaar_number:
 *                 type: string
 *               pan_number:
 *                 type: string
 *               date_of_birth:
 *                 type: string
 *                 format: date
 *               gender_id:
 *                 type: integer
 *               is_active:
 *                 type: integer
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
 *               notes:
 *                 type: string
 *               username:
 *                 type: string
 *               password_hash:
 *                 type: string
 *               role_id:
 *                 type: integer
 *               profile_photo_url:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Owner created successfully
 *       400:
 *         description: Bad request
 */
router.post(
    "/OwnerMaster/Create",
    upload.single("profile_photo_url"),
    controller.insert
);


/* =========================================================
   UPDATE OWNER
========================================================= */

/**
 * @swagger
 * /OwnerMaster/Update:
 *   put:
 *     summary: Update owner details
 *     tags: [Owner Master]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - owner_id
 *               - society_id
 *             properties:
 *               user_id:
 *                 type: integer
 *               owner_id:
 *                 type: integer
 *               society_id:
 *                 type: integer
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               alternate_phone:
 *                 type: string
 *               aadhaar_number:
 *                 type: string
 *               pan_number:
 *                 type: string
 *               date_of_birth:
 *                 type: string
 *                 format: date
 *               gender_id:
 *                 type: integer
 *               is_active:
 *                 type: integer
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
 *               notes:
 *                 type: string
 *               profile_photo_url:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Owner updated successfully
 */
router.put(
    "/OwnerMaster/Update",
    upload.single("profile_photo_url"),
    controller.update
);


/* =========================================================
   UPDATE STATUS
========================================================= */

/**
 * @swagger
 * /OwnerMaster/UpdateStatus:
 *   put:
 *     summary: Update owner status
 *     tags: [Owner Master]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - owner_id
 *               - society_id
 *               - is_active
 *             properties:
 *               user_id:
 *                 type: integer
 *               owner_id:
 *                 type: integer
 *               society_id:
 *                 type: integer
 *               is_active:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Status updated successfully
 */
router.put(
    "/OwnerMaster/UpdateStatus",
    controller.updateStatus
);


/* =========================================================
   DELETE OWNER
========================================================= */

/**
 * @swagger
 * /OwnerMaster/Delete/{id}:
 *   delete:
 *     summary: Soft delete owner
 *     tags: [Owner Master]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Owner ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - society_id
 *             properties:
 *               society_id:
 *                 type: integer
 *               user_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Owner deleted successfully
 */
router.delete(
    "/OwnerMaster/Delete/:id",
    controller.remove
);

module.exports = router;