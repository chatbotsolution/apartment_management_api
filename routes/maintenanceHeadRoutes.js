const express = require("express");
const router = express.Router();
const controller = require("../controllers/maintenanceHeadController");

/**
 * @swagger
 * tags:
 *   name: Maintenance Head
 */

/* ======================= GET ALL ======================= */
/**
 * @swagger
 * /MaintenanceHead/GetAll:
 *   get:
 *     summary: Get all maintenance heads
 *     tags: [Maintenance Head]
 *     responses:
 *       200:
 *         description: Maintenance head list
 */
router.get("/MaintenanceHead/GetAll", controller.getAll);

/* ======================= GET BY ID ======================= */
/**
 * @swagger
 * /MaintenanceHead/GetById/{id}:
 *   get:
 *     summary: Get maintenance head by ID
 *     tags: [Maintenance Head]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Maintenance head details
 */
router.get("/MaintenanceHead/GetById/:id", controller.getById);

/* ======================= CREATE ======================= */
/**
 * @swagger
 * /MaintenanceHead/Create:
 *   post:
 *     summary: Create maintenance head
 *     tags: [Maintenance Head]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Head_Name:
 *                 type: string
 *               Is_Chargeable:
 *                 type: boolean
 *               Default_Amount:
 *                 type: number
 *               Description:
 *                 type: string
 *               Created_By:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Maintenance head created successfully
 */
router.post("/MaintenanceHead/Create", controller.create);

/* ======================= UPDATE ======================= */
/**
 * @swagger
 * /MaintenanceHead/Update:
 *   put:
 *     summary: Update maintenance head
 *     tags: [Maintenance Head]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Head_Id:
 *                 type: integer
 *               Head_Name:
 *                 type: string
 *               Is_Chargeable:
 *                 type: boolean
 *               Default_Amount:
 *                 type: number
 *               Description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Maintenance head updated successfully
 */
router.put("/MaintenanceHead/Update", controller.update);

/* ======================= DELETE ======================= */
/**
 * @swagger
 * /MaintenanceHead/Delete/{id}:
 *   delete:
 *     summary: Delete maintenance head
 *     tags: [Maintenance Head]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Maintenance head deleted successfully
 */
router.delete("/MaintenanceHead/Delete/:id", controller.remove);

module.exports = router;
