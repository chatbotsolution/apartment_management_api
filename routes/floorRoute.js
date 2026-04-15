const express = require("express");
const router = express.Router();
const controller = require("../controllers/floorController");

/**
 * @swagger
 * tags:
 *   name: Floor
 */

/* ======================= GET ALL ======================= */
/**
 * @swagger
 * /Floor/GetAllFloor:
 *   get:
 *     summary: Get all floor records
 *     tags: [Floor]
 *     responses:
 *       200:
 *         description: Floor list
 */
router.get("/Floor/GetAllFloor", controller.getAll);

/* ======================= GET BY ID ======================= */
/**
 * @swagger
 * /Floor/GetFloorById/{id}:
 *   get:
 *     summary: Get floor by ID
 *     tags: [Floor]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Floor details
 */
router.get("/Floor/GetFloorById/:id", controller.getById);

/* ======================= CREATE ======================= */
/**
 * @swagger
 * /Floor/CreateFloor:
 *   post:
 *     summary: Create floor
 *     tags: [Floor]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Block_Id:
 *                 type: integer
 *               Floor_Number:
 *                 type: integer
 *               Floor_Name:
 *                 type: string
 *               Created_By:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Floor created successfully
 */
router.post("/Floor/CreateFloor", controller.create);

/* ======================= UPDATE ======================= */
/**
 * @swagger
 * /Floor/UpdateFloor:
 *   put:
 *     summary: Update floor
 *     tags: [Floor]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Floor_Id:
 *                 type: integer
 *               Block_Id:
 *                 type: integer
 *               Floor_Number:
 *                 type: integer
 *               Floor_Name:
 *                 type: string
 *               Updated_By:
 *                 type: integer
 *               Is_Active:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Floor updated successfully
 */
router.put("/Floor/UpdateFloor", controller.update);

/* ======================= DELETE ======================= */
/**
 * @swagger
 * /Floor/DeleteFloor/{id}:
 *   delete:
 *     summary: Delete floor
 *     tags: [Floor]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Floor deleted successfully
 */
router.delete("/Floor/DeleteFloor/:id", controller.remove);

module.exports = router;
