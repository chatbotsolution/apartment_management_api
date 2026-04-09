const express = require("express");
const router = express.Router();
const controller = require("../controllers/parkingController");

/**
 * @swagger
 * tags:
 *   name: Parking 
 */

/* ======================= GET ALL ======================= */
/**
 * @swagger
 * /Parking/GetAllParking:
 *   get:
 *     summary: Get all parking records
 *     tags: [Parking]
 *     responses:
 *       200:
 *         description: Parking list
 */
router.get("/Parking/GetAllParking", controller.getAll);

/* ======================= GET BY ID ======================= */
/**
 * @swagger
 * /Parking/GetParkingById/{id}:
 *   get:
 *     summary: Get parking by ID
 *     tags: [Parking]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Parking details
 */
router.get("/Parking/GetParkingById/:id", controller.getById);

/* ======================= GET BY FLAT ======================= */
/**
 * @swagger
 * /Parking/GetParkingByFlat/{flatId}:
 *   get:
 *     summary: Get parking by Flat ID
 *     tags: [Parking]
 *     parameters:
 *       - in: path
 *         name: flatId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Parking list for a flat
 */
router.get("/Parking/GetParkingByFlat/:flatId", controller.getByFlat);

/* ======================= CREATE ======================= */
/**
 * @swagger
 * /Parking/CreateParking:
 *   post:
 *     summary: Create parking
 *     tags: [Parking]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Flat_Id:
 *                 type: integer
 *               Vehicle_Number:
 *                 type: string
 *               Vehicle_Type:
 *                 type: string
 *               parkingId:
 *                 type: integer
 *               createdBy:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Parking created successfully
 */
router.post("/Parking/CreateParking", controller.create);

/* ======================= UPDATE ======================= */
/**
 * @swagger
 * /Parking/UpdateParking:
 *   put:
 *     summary: Update parking
 *     tags: [Parking]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ParkingAllot_Id:
 *                 type: integer
 *               Flat_Id:
 *                 type: integer
 *               Vehicle_Number:
 *                 type: string
 *               Vehicle_Type:
 *                 type: string
 *               parkingId:
 *                 type: integer
 *               isActive:
 *                 type: integer
 *               updatedBy:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Parking updated successfully
 */
router.put("/Parking/UpdateParking", controller.update);

/* ======================= DELETE ======================= */
/**
 * @swagger
 * /Parking/DeleteParking/{id}:
 *   delete:
 *     summary: Delete parking
 *     tags: [Parking]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Parking deleted successfully
 */
router.delete("/Parking/DeleteParking/:id", controller.remove);

module.exports = router;
