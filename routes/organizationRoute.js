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
 *     tags: [Organization Master]
 *     responses:
 *       200:
 *         description: Organization list fetched successfully
 */
router.get("/Organization/GetAll", controller.getAll);


/* ================= GET BY ID ================= */
/**
 * @swagger
 * /Organization/GetById/{id}:
 *   get:
 *     summary: Get organization by ID
 *     tags: [Organization Master]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Organization fetched successfully
 */
router.get("/Organization/GetById/:id", controller.getById);


/* ================= CREATE ================= */
/**
 * @swagger
 * /Organization/Create:
 *   post:
 *     summary: Create organization
 *     tags: [Organization Master]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
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
 *     responses:
 *       200:
 *         description: Organization created successfully
 */
router.post("/Organization/Create", controller.create);


/* ================= UPDATE ================= */
/**
 * @swagger
 * /Organization/Update:
 *   put:
 *     summary: Update organization
 *     tags: [Organization Master]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
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
 *     responses:
 *       200:
 *         description: Organization updated successfully
 */
router.put("/Organization/Update", controller.update);


/* ================= DELETE ================= */
/**
 * @swagger
 * /Organization/Delete/{id}:
 *   delete:
 *     summary: Delete organization
 *     tags: [Organization Master]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Organization deleted successfully
 */
router.delete("/Organization/Delete/:id", controller.remove);


module.exports = router;