const express = require("express");
const router = express.Router();
const controller = require("../controllers/blockController");

/**
 * @swagger
 * tags:
 *   name: Block Master
 */


/* ======================= GET ALL ======================= */
/**
 * @swagger
 * /BlockMaster/GetAllBlock:
 *   get:
 *     summary: Get all blocks
 *     tags: [Block Master]
 *     responses:
 *       200:
 *         description: Block list
 */
router.get("/BlockMaster/GetAllBlock", controller.getAll);


/* ======================= GET BY ID ======================= */
/**
 * @swagger
 * /BlockMaster/GetBlockById/{id}:
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
 *         description: Block details
 */
router.get("/BlockMaster/GetBlockById/:id", controller.getById);


/* ======================= GET BY SOCIETY ======================= */
/**
 * @swagger
 * /BlockMaster/GetBlockBySociety/{societyId}:
 *   get:
 *     summary: Get blocks by Society ID
 *     tags: [Block Master]
 *     parameters:
 *       - in: path
 *         name: societyId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Block list for society
 */
router.get("/BlockMaster/GetBlockBySociety/:societyId", controller.getBySociety);


/* ======================= CREATE ======================= */
/**
 * @swagger
 * /BlockMaster/CreateBlock:
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
 *               Society_Id:
 *                 type: integer
 *               Block_Name:
 *                 type: string
 *               Total_Floors:
 *                 type: integer
 *               Created_By:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Block created successfully
 */
router.post("/BlockMaster/CreateBlock", controller.create);


/* ======================= UPDATE ======================= */
/**
 * @swagger
 * /BlockMaster/UpdateBlock:
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
 *               Block_Id:
 *                 type: integer
 *               Society_Id:
 *                 type: integer
 *               Block_Name:
 *                 type: string
 *               Total_Floors:
 *                 type: integer
 *               Created_By:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Block updated successfully
 */
router.put("/BlockMaster/UpdateBlock", controller.update);


/* ======================= DELETE ======================= */
/**
 * @swagger
 * /BlockMaster/DeleteBlock/{id}:
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
router.delete("/BlockMaster/DeleteBlock/:id", controller.remove);

module.exports = router;
