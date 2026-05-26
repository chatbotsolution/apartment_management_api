const express = require("express");
const router = express.Router();
const controller = require("../controllers/manageOrganizationController");

/**
 * @swagger
 * tags:
 *   name: Manage Organization
 *   description: Manage Organization APIs
 */

/* ================= GET ALL ================= */
/**
 * @swagger
 * /ManageOrganization/GetAll:
 *   get:
 *     summary: Get all organizations
 *     description: Fetch all active organizations (calls sp_manage_organization 'GET_ALL')
 *     tags: [Manage Organization]
 *     responses:
 *       200:
 *         description: Organizations fetched successfully
 */
router.get("/ManageOrganization/GetAll", controller.getAll);

/* ================= GET SOCIETIES BY ORG ================= */
/**
 * @swagger
 * /ManageOrganization/GetSocietiesByOrg/{id}:
 *   get:
 *     summary: Get societies by organization ID
 *     description: Fetch societies for a specific organization (calls sp_manage_organization 'GET_SOCIETIES_BY_ORG')
 *     tags: [Manage Organization]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/ManageOrganization/GetSocietiesByOrg/:id", controller.getSocietiesByOrg);


/* ================= GET BY ID ================= */
/**
 * @swagger
 * /ManageOrganization/GetById/{id}:
 *   get:
 *     summary: Get organization by ID
 *     tags: [Manage Organization]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/ManageOrganization/GetById/:id", controller.getById);

/* ================= UPDATE ================= */
/**
 * @swagger
 * /ManageOrganization/Update:
 *   put:
 *     summary: Update organization
 *     tags: [Manage Organization]
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
 *         description: Success
 */
router.put("/ManageOrganization/Update", controller.update);

/* ================= DELETE ================= */
/**
 * @swagger
 * /ManageOrganization/Delete/{id}:
 *   delete:
 *     summary: Delete organization
 *     tags: [Manage Organization]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success
 */
router.delete("/ManageOrganization/Delete/:id", controller.remove);

module.exports = router;
