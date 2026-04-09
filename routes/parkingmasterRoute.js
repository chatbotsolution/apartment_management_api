const express = require("express");
const router = express.Router();
const controller = require("../controllers/parkingmasterController");

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
 *     summary: Get all parking
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
 *               ParkingNumber:
 *                 type: string
 *               ParkingType_Id:
 *                 type: integer
 *               Block_Id:
 *                 type: integer
 *               Society_Id:
 *                 type: integer
 *               CreatedBy:
 *                 type: integer
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
 *               ParkingId:
 *                 type: integer
 *               ParkingNumber:
 *                 type: string
 *               ParkingType_Id:
 *                 type: integer
 *               Block_Id:
 *                 type: integer
 *               Society_Id:
 *                 type: integer
 *               UpdatedBy:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Parking updated successfully
 */
router.put("/ParkingMaster/UpdateParking", controller.update);


/* ======================= STATUS CHANGE ======================= */
/**
 * @swagger
 * /ParkingMaster/ChangeStatus/{ParkingId}/{IsActive}/{UpdatedBy}:
 *   patch:
 *     summary: Change parking status
 *     tags: [Parking Master]
 *     parameters:
 *       - in: path
 *         name: ParkingId
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: path
 *         name: IsActive
 *         required: true
 *         schema:
 *           type: boolean
 *           example: true
 *       - in: path
 *         name: UpdatedBy
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Status changed successfully
 */
router.patch("/ParkingMaster/ChangeStatus/:ParkingId/:IsActive/:UpdatedBy", controller.changeStatus);

module.exports = router;