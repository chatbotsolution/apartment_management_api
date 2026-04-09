const express = require("express");
const router = express.Router();
const controller = require("../controllers/flatController");

/**
 * @swagger
 * tags:
 *   name: Flat
 *   description: Flat management APIs
 */


/* ======================= GET ALL ======================= */
/**
 * @swagger
 * /FlatMaster/GetAllFlat:
 *   get:
 *     summary: Get all flats
 *     tags: [Flat]
 *     responses:
 *       200:
 *         description: Flat list retrieved successfully
 */
router.get("/FlatMaster/GetAllFlat", controller.getAll);


/* ======================= GET BY ID ======================= */
/**
 * @swagger
 * /FlatMaster/GetFlatById/{id}:
 *   get:
 *     summary: Get flat by ID
 *     tags: [Flat]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Flat details retrieved successfully
 */
router.get("/FlatMaster/GetFlatById/:id", controller.getById);


/* ======================= CREATE ======================= */
/**
 * @swagger
 * /FlatMaster/CreateFlat:
 *   post:
 *     summary: Create a new flat
 *     tags: [Flat]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Block_Id:
 *                 type: integer
 *               Flat_Number:
 *                 type: string
 *               Floor_Number:
 *                 type: integer
 *               Flat_Type:
 *                 type: string
 *               Area:
 *                 type: number
 *                 format: float
 *               Occup_Status:
 *                 type: integer
 *               isRent:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Flat created successfully
 */
router.post("/FlatMaster/CreateFlat", controller.create);


/* ======================= UPDATE ======================= */
/**
 * @swagger
 * /FlatMaster/UpdateFlat:
 *   put:
 *     summary: Update an existing flat
 *     tags: [Flat]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Flat_Id:
 *                 type: integer
 *               Block_Id:
 *                 type: integer
 *               Flat_Number:
 *                 type: string
 *               Floor_Number:
 *                 type: integer
 *               Flat_Type:
 *                 type: string
 *               Area:
 *                 type: number
 *                 format: float
 *               Occup_Status:
 *                 type: string
 *               isRent:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Flat updated successfully
 */
router.put("/FlatMaster/UpdateFlat", controller.update);


/* ======================= DELETE ======================= */
/**
 * @swagger
 * /FlatMaster/DeleteFlat/{id}:
 *   delete:
 *     summary: Delete flat
 *     tags: [Flat]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Flat deleted successfully
 */
router.delete("/FlatMaster/DeleteFlat/:id", controller.remove);


module.exports = router;