const express = require("express");
const router = express.Router();
const controller = require("../controllers/ownerController");
const upload = require("../middlewares/upload.middleware");

/**
 * @swagger
 * tags:
 *   name: Owner Master
 */

/* ======================= GET ALL ======================= */
/**
 * @swagger
 * /OwnerMaster/GetAll:
 *   get:
 *     summary: Get all owners with pagination
 *     tags: [Owner Master]
 *     parameters:
 *       - in: query
 *         name: society_id
 *       - in: query
 *         name: page
 *       - in: query
 *         name: pageSize
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/OwnerMaster/GetAll", controller.getAll);


/* ======================= SEARCH ======================= */
/**
 * @swagger
 * /OwnerMaster/Search:
 *   get:
 *     summary: Search owners by name or phone
 *     tags: [Owner Master]
 *     parameters:
 *       - in: query
 *         name: society_id
 *       - in: query
 *         name: keyword
 *       - in: query
 *         name: page
 *       - in: query
 *         name: pageSize
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/OwnerMaster/Search", controller.search);


/* ======================= GET BY ID ======================= */
/**
 * @swagger
 * /OwnerMaster/GetById/{id}:
 *   get:
 *     summary: Get owner by id
 *     tags: [Owner Master]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *       - in: query
 *         name: society_id
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/OwnerMaster/GetById/:id", controller.getById);


/* ======================= CREATE ======================= */
/**
 * @swagger
 * /OwnerMaster/Create:
 *   post:
 *     summary: Register a new owner (and user account)
 *     tags: [Owner Master]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: society_id
 *         type: integer
 *         required: true
 *       - in: formData
 *         name: first_name
 *         type: string
 *         required: true
 *       - in: formData
 *         name: last_name
 *         type: string
 *         required: true
 *       - in: formData
 *         name: email
 *         type: string
 *         required: true
 *       - in: formData
 *         name: phone
 *         type: string
 *         required: true
 *       - in: formData
 *         name: username
 *         type: string
 *         description: For user account creation
 *       - in: formData
 *         name: password_hash
 *         type: string
 *         description: Initial password
 *       - in: formData
 *         name: profile_photo_url
 *         type: file
 *         description: Profile photo upload
 *     responses:
 *       200:
 *         description: Owner created successfully
 */
// 👉 FIXED: Changed controller.create to controller.insert
router.post("/OwnerMaster/Create", upload.single("profile_photo_url"), controller.insert);


/* ======================= UPDATE ======================= */
/**
 * @swagger
 * /OwnerMaster/Update:
 *   put:
 *     summary: Update an existing owner
 *     tags: [Owner Master]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: owner_id
 *         type: integer
 *         required: true
 *       - in: formData
 *         name: society_id
 *         type: integer
 *         required: true
 *       - in: formData
 *         name: first_name
 *         type: string
 *       - in: formData
 *         name: is_active
 *         type: integer
 *         description: 1 for Active, 0 for Inactive
 *       - in: formData
 *         name: profile_photo_url
 *         type: file
 *     responses:
 *       200:
 *         description: Owner updated successfully
 */
router.put("/OwnerMaster/Update", upload.single("profile_photo_url"), controller.update);


/* ======================= UPDATE STATUS ======================= */
/**
 * @swagger
 * /OwnerMaster/UpdateStatus:
 *   put:
 *     summary: Toggle Owner Account Status (Active/Inactive)
 *     tags: [Owner Master]
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             owner_id:
 *               type: integer
 *             society_id:
 *               type: integer
 *             is_active:
 *               type: integer
 *     responses:
 *       200:
 *         description: Status updated successfully
 */
// 👉 FIXED: Added the missing route for toggling the switch in the UI
router.put("/OwnerMaster/UpdateStatus", controller.updateStatus);


/* ======================= DELETE ======================= */
/**
 * @swagger
 * /OwnerMaster/Delete/{id}:
 *   delete:
 *     summary: Soft delete an owner and deactivate user account
 *     tags: [Owner Master]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: integer
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             society_id:
 *               type: integer
 *     responses:
 *       200:
 *         description: Owner deleted successfully
 */
router.delete("/OwnerMaster/Delete/:id", controller.remove);

module.exports = router;