const express = require("express");
const router = express.Router();
const controller = require("../controllers/blockController");


/**
 * @swagger
 * tags:
 *   name: Block Master
 *   description: Block management APIs
 */


/* ======================= GET ALL ======================= */
/**
 * @swagger
 * /Block/GetAll:
 *   get:
 *     summary: Get all blocks by single or multiple societies
 *     tags: [Block Master]
 *     parameters:
 *       - in: query
 *         name: society_id
 *         required: true
 *         schema:
 *           type: string
 *           example: "26,25"
 *         description: Pass a single society ID (e.g., 25) or a comma-separated list of IDs (e.g., 26,25)
 *     responses:
 *       200:
 *         description: Block list fetched successfully
 */
router.get("/Block/GetAll", controller.getAll);


/* ======================= GET BY ID ======================= */
/**
 * @swagger
 * /Block/GetById/{id}:
 *   get:
 *     summary: Get block by ID
 *     tags: [Block Master]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Block fetched successfully
 */
router.get("/Block/GetById/:id", controller.getById);


/* ======================= CREATE ======================= */
/**
 * @swagger
 * /Block/Create:
 *   post:
 *     summary: Create block
 *     tags: [Block Master]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               society_id:
 *                 type: integer
 *               block_name:
 *                 type: string
 *               block_code:
 *                 type: string
 *               total_floors:
 *                 type: integer
 *               total_flats:
 *                 type: integer
 *               block_type_id:
 *                 type: integer
 *               year_built:
 *                 type: integer
 *               lift_count:
 *                 type: integer
 *               is_active:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Block created successfully
 */
router.post("/Block/Create", controller.create);


/* ======================= UPDATE ======================= */
/**
 * @swagger
 * /Block/Update:
 *   put:
 *     summary: Update block
 *     tags: [Block Master]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               block_id:
 *                 type: integer
 *               society_id:
 *                 type: integer
 *               block_name:
 *                 type: string
 *               block_code:
 *                 type: string
 *               total_floors:
 *                 type: integer
 *               total_flats:
 *                 type: integer
 *               block_type_id:
 *                 type: integer
 *               year_built:
 *                 type: integer
 *               lift_count:
 *                 type: integer
 *               is_active:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Block updated successfully
 */
router.put("/Block/Update", controller.update);


/* ======================= DELETE ======================= */
/**
 * @swagger
 * /Block/Delete/{id}:
 *   delete:
 *     summary: Delete block
 *     tags: [Block Master]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Block deleted successfully
 */
router.delete("/Block/Delete/:id", controller.remove);


module.exports = router;