const express = require("express");
const router = express.Router();
const controller = require("../controllers/organizationController");

/**
 * @swagger
 * tags:
 *   name: Organization Master
 *   description: Organization management APIs
 */


/* ================= GET ALL ================= */
/**
 * @swagger
 * /Organization/GetAll:
 *   get:
 *     summary: Get all organizations
 *     description: Fetch all active organizations from the database
 *     tags: [Organization Master]
 *     responses:
 *       200:
 *         description: Organization list fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Data fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       org_id:
 *                         type: integer
 *                       org_name:
 *                         type: string
 *                       registration_number:
 *                         type: string
 *                       contact_email:
 *                         type: string
 *                       contact_phone:
 *                         type: string
 *                       address:
 *                         type: string
 *                       website:
 *                         type: string
 *                       country_id:
 *                         type: integer
 *                       Country_Name:
 *                         type: string
 *                       state_id:
 *                         type: integer
 *                       State_Name:
 *                         type: string
 *                       dist_id:
 *                         type: integer
 *                       District_Name:
 *                         type: string
 *       500:
 *         description: Internal server error
 */
router.get("/Organization/GetAll", controller.getAll);


/* ================= GET BY ID ================= */
/**
 * @swagger
 * /Organization/GetById/{id}:
 *   get:
 *     summary: Get organization by ID
 *     description: Fetch a single organization using org_id
 *     tags: [Organization Master]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Organization ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Organization fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     org_id:
 *                       type: integer
 *                     org_name:
 *                       type: string
 *                     registration_number:
 *                       type: string
 *                     contact_email:
 *                       type: string
 *                     contact_phone:
 *                       type: string
 *                     address:
 *                       type: string
 *                     website:
 *                       type: string
 *                     country_id:
 *                       type: integer
 *                     Country_Name:
 *                       type: string
 *                     state_id:
 *                       type: integer
 *                     State_Name:
 *                       type: string
 *                     dist_id:
 *                       type: integer
 *                     District_Name:
 *                       type: string
 *       404:
 *         description: Organization not found
 *       500:
 *         description: Internal server error
 */
router.get("/Organization/GetById/:id", controller.getById);


/* ================= CREATE ================= */
/**
 * @swagger
 * /Organization/Create:
 *   post:
 *     summary: Create new organization with user account
 *     description: |
 *       This API creates a new organization and automatically creates a user.
 *       
 *       - Username is taken from contact_email
 *       - Role ID is fixed internally (150)
 *       - Password is optional (default: Org@123)
 *     tags: [Organization Master]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - org_name
 *               - contact_email
 *               - country_id
 *               - state_id
 *               - dist_id
 *             properties:
 *               org_name:
 *                 type: string
 *                 example: ABC Society
 *               registration_number:
 *                 type: string
 *                 example: REG123
 *               contact_email:
 *                 type: string
 *                 example: abc@gmail.com
 *               contact_phone:
 *                 type: string
 *                 example: 9876543210
 *               address:
 *                 type: string
 *                 example: Kolkata
 *               website:
 *                 type: string
 *                 example: www.abc.com
 *               country_id:
 *                 type: integer
 *                 example: 1
 *               state_id:
 *                 type: integer
 *                 example: 5
 *               dist_id:
 *                 type: integer
 *                 example: 10
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Organization and user created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     org_id:
 *                       type: integer
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Internal server error
 */
router.post("/Organization/Create", controller.create);


/* ================= UPDATE ================= */
/**
 * @swagger
 * /Organization/Update:
 *   put:
 *     summary: Update organization details
 *     description: Update organization information using org_id
 *     tags: [Organization Master]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - org_id
 *             properties:
 *               org_id:
 *                 type: integer
 *                 example: 1
 *               org_name:
 *                 type: string
 *               registration_number:
 *                 type: string
 *               contact_email:
 *                 type: string
 *               contact_phone:
 *                 type: string
 *               address:
 *                 type: string
 *               website:
 *                 type: string
 *               country_id:
 *                 type: integer
 *               state_id:
 *                 type: integer
 *               dist_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Organization updated successfully
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Internal server error
 */
router.put("/Organization/Update", controller.update);


/* ================= DELETE ================= */
/**
 * @swagger
 * /Organization/Delete/{id}:
 *   delete:
 *     summary: Soft delete organization
 *     description: |
 *       This API performs soft delete (is_active = 0) on organization
 *       and also updates the related user status to inactive.
 *     tags: [Organization Master]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Organization ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Organization deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Organization not found
 *       500:
 *         description: Internal server error
 */
router.delete("/Organization/Delete/:id", controller.remove);


module.exports = router;