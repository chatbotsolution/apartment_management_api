const express = require("express");
const router = express.Router();
const controller = require("../controllers/parkingController");

/**
 * @swagger
 * tags:
 *   name: Parking Master
 */


/* ======================= GET ALL ======================= */
/**
 * @swagger
 * /ParkingMaster/GetAllParking:
 *   get:
 *     summary: Get all parking records
 *     tags: [Parking Master]
 *     responses:
 *       200:
 *         description: Parking list
 */
router.get("/ParkingMaster/GetAllParking", controller.getAll);


/* ======================= GET BY ID ======================= */
/**
 * @swagger
 * /ParkingMaster/GetParkingById/{id}:
 *   get:
 *     summary: Get parking by ID
 *     tags: [Parking Master]
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
router.get("/ParkingMaster/GetParkingById/:id", controller.getById);


/* ======================= GET BY FLAT ======================= */
/**
 * @swagger
 * /ParkingMaster/GetParkingByFlat/{flatId}:
 *   get:
 *     summary: Get parking by Flat ID
 *     tags: [Parking Master]
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
router.get("/ParkingMaster/GetParkingByFlat/:flatId", controller.getByFlat);


/* ======================= CREATE ======================= */
/**
 * @swagger
 * /ParkingMaster/CreateParking:
 *   post:
 *     summary: Create parking
 *     tags: [Parking Master]
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
 *               Parking_Slot:
 *                 type: string
 *     responses:
 *       200:
 *         description: Parking created successfully
 */
router.post("/ParkingMaster/CreateParking", controller.create);


/* ======================= UPDATE ======================= */
/**
 * @swagger
 * /ParkingMaster/UpdateParking:
 *   put:
 *     summary: Update parking
 *     tags: [Parking Master]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Parking_Id:
 *                 type: integer
 *               Flat_Id:
 *                 type: integer
 *               Vehicle_Number:
 *                 type: string
 *               Vehicle_Type:
 *                 type: string
 *               Parking_Slot:
 *                 type: string
 *               Is_Active:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Parking updated successfully
 */
router.put("/ParkingMaster/UpdateParking", controller.update);


/* ======================= DELETE ======================= */
/**
 * @swagger
 * /ParkingMaster/DeleteParking/{id}:
 *   delete:
 *     summary: Delete parking
 *     tags: [Parking Master]
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
router.delete("/ParkingMaster/DeleteParking/:id", controller.remove);

module.exports = router;