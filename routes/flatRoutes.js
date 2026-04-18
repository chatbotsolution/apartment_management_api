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

/* ======================= GET BY BLOCK ======================= */
/**
 * @swagger
 * /FlatMaster/GetFlatsByBlock/{blockId}:
 *   get:
 *     summary: Get all flats belonging to a specific block
 *     tags: [Flat]
 *     parameters:
 *       - in: path
 *         name: blockId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the block
 *     responses:
 *       200:
 *         description: List of flats for the block retrieved successfully
 *       400:
 *         description: Invalid block ID supplied
 *       404:
 *         description: Flats not found for the given block
 */
router.get("/FlatMaster/GetFlatsByBlock/:blockId", controller.getByBlock);

/* ======================= GET AVAILABLE PARKING ======================= */
/**
 * @swagger
 * /FlatMaster/GetAvailableParking:
 *   get:
 *     summary: Get available parking slots for dropdown
 *     tags: [Flat]
 *     responses:
 *       200:
 *         description: Available parking slots retrieved successfully
 */
router.get("/FlatMaster/GetAvailableParking", controller.getAvailableParking);


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
 *             required:
 *               - Block_Id
 *               - Flat_Number
 *             properties:
 *               Block_Id:
 *                 type: integer
 *               Flat_Number:
 *                 type: string
 *               Floor_Number:
 *                 type: integer
 *               Flat_Type:
 *                 type: string
 *               Super_Builtup_Area:
 *                 type: number
 *                 format: float
 *               BuiltUp_Area:
 *                 type: number
 *                 format: float
 *               Carpet_Area:
 *                 type: number
 *                 format: float
 *               Occup_Status:
 *                 type: integer
 *               isRent:
 *                 type: integer
 *               Parking:
 *                 type: integer
 *               parkingId:
 *                 type: string
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
 *             required:
 *               - Flat_Id
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
 *               Super_Builtup_Area:
 *                 type: number
 *                 format: float
 *               BuiltUp_Area:
 *                 type: number
 *                 format: float
 *               Carpet_Area:
 *                 type: number
 *                 format: float
 *               Occup_Status:
 *                 type: integer
 *               isRent:
 *                 type: integer
 *               Parking:
 *                 type: integer
 *               parkingId:
 *                 type: string
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