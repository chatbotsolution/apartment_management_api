const express = require("express");
const router = express.Router();
const controller = require("../controllers/floorController");


/**
 * @swagger
 * tags:
 *   name: Floor Master
 *   description: Floor management APIs
 */


/* ======================= GET ALL ======================= */
/**
 * @swagger
 * /Floor/GetAll:
 *   get:
 *     summary: Get all floors by society
 *     tags: [Floor Master]
 *     parameters:
 *       - in: query
 *         name: society_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Floor list fetched successfully
 */
router.get("/Floor/GetAll", controller.getAll);


/* ======================= GET BY ID ======================= */
/**
 * @swagger
 * /Floor/GetById/{id}:
 *   get:
 *     summary: Get floor by ID
 *     tags: [Floor Master]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: society_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Floor fetched successfully
 */
router.get("/Floor/GetById/:id", controller.getById);


/* ======================= CREATE ======================= */
/**
 * @swagger
 * /Floor/Create:
 *   post:
 *     summary: Create floor
 *     tags: [Floor Master]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               block_id:
 *                 type: integer
 *               floor_number:
 *                 type: integer
 *               floor_label:
 *                 type: string
 *               total_flats:
 *                 type: integer
 *               society_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Floor created successfully
 */
router.post("/Floor/Create", controller.create);


/* ======================= UPDATE ======================= */
/**
 * @swagger
 * /Floor/Update:
 *   put:
 *     summary: Update floor
 *     tags: [Floor Master]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               floor_id:
 *                 type: integer
 *               block_id:
 *                 type: integer
 *               floor_number:
 *                 type: integer
 *               floor_label:
 *                 type: string
 *               total_flats:
 *                 type: integer
 *               society_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Floor updated successfully
 */
router.put("/Floor/Update", controller.update);


/* ======================= DELETE ======================= */
/**
 * @swagger
 * /Floor/Delete/{id}:
 *   delete:
 *     summary: Delete floor
 *     tags: [Floor Master]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: society_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Floor deleted successfully
 */
router.delete("/Floor/Delete/:id", controller.remove);


module.exports = router;