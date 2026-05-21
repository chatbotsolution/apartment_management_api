const express = require("express");
const router = express.Router();
const controller = require("../controllers/tenantController");
const upload = require("../middlewares/upload.middleware");

/* ======================= TAG ======================= */
/**
 * @swagger
 * tags:
 *   name: Tenant Master
 *   description: Tenant management APIs
 */

/* ======================= INSERT ======================= */
/**
 * @swagger
 * /Tenant/Insert:
 *   post:
 *     summary: Create new tenant
 *     tags: [Tenant Master]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *                 description: ID of the user performing the action
 *               society_id:
 *                 type: integer
 *               block_id:
 *                 type: integer
 *               flat_id:
 *                 type: integer
 *               owner_id:
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
 *               date_of_birth:
 *                 type: string
 *                 format: date
 *               gender_id:
 *                 type: integer
 *               occupation:
 *                 type: string
 *               employer_name:
 *                 type: string
 *               total_occupants:
 *                 type: integer
 *               lease_start:
 *                 type: string
 *                 format: date
 *               lease_end:
 *                 type: string
 *                 format: date
 *               monthly_rent:
 *                 type: number
 *               security_deposit:
 *                 type: number
 *               rent_due_day:
 *                 type: integer
 *               is_active:
 *                 type: integer
 *               address:
 *                 type: string
 *               country_id:
 *                 type: integer
 *               state_id:
 *                 type: integer
 *               district_id:
 *                 type: integer
 *               postal_code:
 *                 type: string
 *               emergency_contact_name:
 *                 type: string
 *               emergency_contact_phone:
 *                 type: string
 *               police_verification:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               role_id:
 *                 type: integer
 *               profile_photo_url:
 *                 type: string
 *                 format: binary
 *               agreement_doc_url:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Tenant created successfully
 */
router.post("/Tenant/Insert", upload.any(), controller.insert);

/* ======================= UPDATE ======================= */
/**
 * @swagger
 * /Tenant/Update:
 *   put:
 *     summary: Update tenant details
 *     tags: [Tenant Master]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *                 description: ID of the user performing the update
 *               tenant_id:
 *                 type: integer
 *               society_id:
 *                 type: integer
 *               block_id:
 *                 type: integer
 *               flat_id:
 *                 type: integer
 *               owner_id:
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
 *               date_of_birth:
 *                 type: string
 *                 format: date
 *               gender_id:
 *                 type: integer
 *               occupation:
 *                 type: string
 *               employer_name:
 *                 type: string
 *               total_occupants:
 *                 type: integer
 *               lease_start:
 *                 type: string
 *                 format: date
 *               lease_end:
 *                 type: string
 *                 format: date
 *               monthly_rent:
 *                 type: number
 *               security_deposit:
 *                 type: number
 *               rent_due_day:
 *                 type: integer
 *               is_active:
 *                 type: integer
 *               address:
 *                 type: string
 *               country_id:
 *                 type: integer
 *               state_id:
 *                 type: integer
 *               district_id:
 *                 type: integer
 *               postal_code:
 *                 type: string
 *               emergency_contact_name:
 *                 type: string
 *               emergency_contact_phone:
 *                 type: string
 *               police_verification:
 *                 type: string
 *               profile_photo_url:
 *                 type: string
 *                 format: binary
 *               agreement_doc_url:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Tenant updated successfully
 */
router.put("/Tenant/Update", upload.any(), controller.update);

/* ======================= UPDATE STATUS ======================= */
/**
 * @swagger
 * /Tenant/UpdateStatus:
 *   put:
 *     summary: Update tenant account status (Active/Inactive)
 *     tags: [Tenant Master]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tenant_id:
 *                 type: integer
 *               is_active:
 *                 type: integer
 *               user_id:
 *                 type: integer
 *                 description: ID of the user performing the action
 *     responses:
 *       200:
 *         description: Status updated successfully
 */
router.put("/Tenant/UpdateStatus", controller.updateStatus);

/* ======================= DELETE ======================= */
/**
 * @swagger
 * /Tenant/Delete:
 *   post:
 *     summary: Soft delete tenant
 *     tags: [Tenant Master]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tenant_id:
 *                 type: integer
 *               user_id:
 *                 type: integer
 *                 description: ID of the user performing the deletion
 *     responses:
 *       200:
 *         description: Tenant deleted/deactivated successfully
 */
router.post("/Tenant/Delete", controller.remove);

/* ======================= GET BY ID ======================= */
/**
 * @swagger
 * /Tenant/GetById/{id}:
 *   get:
 *     summary: Get tenant by id
 *     tags: [Tenant Master]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Data fetched successfully
 */
router.get("/Tenant/GetById/:id", controller.getById);

/* ======================= GET ALL ======================= */
/**
 * @swagger
 * /Tenant/GetAll:
 *   get:
 *     summary: Get all tenants by society
 *     tags: [Tenant Master]
 *     parameters:
 *       - in: query
 *         name: society_id
 *         required: false
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of tenants fetched successfully
 */
router.get("/Tenant/GetAll", controller.getAll);

/* ======================= SEARCH ======================= */
/**
 * @swagger
 * /Tenant/Search:
 *   get:
 *     summary: Search tenants
 *     tags: [Tenant Master]
 *     parameters:
 *       - in: query
 *         name: society_id
 *         required: false
 *         schema:
 *           type: integer
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Search results
 */
router.get("/Tenant/Search", controller.search);

module.exports = router;