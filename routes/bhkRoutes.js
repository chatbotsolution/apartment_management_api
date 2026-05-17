const express = require("express");
const router = express.Router();
const controller = require("../controllers/bhkController");

/**
 * @swagger
 * tags:
 *   name: BHKMaster
 *   description: BHK Configuration Management
 */

/**
 * @swagger
 * /BHKMaster/GetAll:
 *   get:
 *     summary: Get all BHK records
 *     tags: [BHKMaster]
 *     parameters:
 *       - in: query
 *         name: society_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: BHK records fetched successfully
 */
router.get("/BHKMaster/GetAll", controller.getAll);

/**
 * @swagger
 * /BHKMaster/GetById/{id}:
 *   get:
 *     summary: Get BHK record by ID
 *     tags: [BHKMaster]
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
router.get("/BHKMaster/GetById/:id", controller.getById);

/**
 * @swagger
 * /BHKMaster/Create:
 *   post:
 *     summary: Create new BHK configuration
 *     tags: [BHKMaster]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - society_id
 *               - bhk_type_id
 *               - area_sqft
 *               - monthly_maintenance
 *             properties:
 *               society_id:
 *                 type: integer
 *               bhk_type_id:
 *                 type: integer
 *               area_sqft:
 *                 type: number
 *               monthly_maintenance:
 *                 type: number
 *     responses:
 *       200:
 *         description: Created
 */
router.post("/BHKMaster/Create", controller.create);

/**
 * @swagger
 * /BHKMaster/Update:
 *   put:
 *     summary: Update BHK configuration
 *     tags: [BHKMaster]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bhk_id
 *             properties:
 *               bhk_id:
 *                 type: integer
 *               society_id:
 *                 type: integer
 *               bhk_type_id:
 *                 type: integer
 *               area_sqft:
 *                 type: number
 *               monthly_maintenance:
 *                 type: number
 *     responses:
 *       200:
 *         description: Updated
 */
router.put("/BHKMaster/Update", controller.update);

/**
 * @swagger
 * /BHKMaster/Delete/{id}:
 *   delete:
 *     summary: Delete BHK record
 *     tags: [BHKMaster]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Deleted
 */
router.delete("/BHKMaster/Delete/:id", controller.remove);

module.exports = router;