const express = require("express");
const router = express.Router();
const controller = require("../controllers/parkingslotController");


/**
 * @swagger
 * tags:
 *   name: Parking Slot
 *   description: Parking slot management APIs
 */


/* ======================= INSERT ======================= */
/**
 * @swagger
 * /ParkingSlot/Insert:
 *   post:
 *     summary: Create new parking slot
 *     tags: [Parking Slot]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               societyId:
 *                 type: integer
 *               slotNumber:
 *                 type: string
 *               level:
 *                 type: string
 *               slotTypeId:
 *                 type: integer
 *               isCovered:
 *                 type: boolean
 *               isOccupied:
 *                 type: boolean
 *               hasCharger:
 *                 type: boolean
 *               statusId:
 *                 type: integer
 *               monthlyCharge:
 *                 type: number
 *                 format: float
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Parking slot created successfully
 */
router.post("/ParkingSlot/Insert", controller.insert);


/* ======================= UPDATE ======================= */
/**
 * @swagger
 * /ParkingSlot/Update:
 *   put:
 *     summary: Update parking slot details
 *     tags: [Parking Slot]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               slotId:
 *                 type: integer
 *               societyId:
 *                 type: integer
 *               slotNumber:
 *                 type: string
 *               level:
 *                 type: string
 *               slotTypeId:
 *                 type: integer
 *               isCovered:
 *                 type: boolean
 *               isOccupied:
 *                 type: boolean
 *               hasCharger:
 *                 type: boolean
 *               statusId:
 *                 type: integer
 *               monthlyCharge:
 *                 type: number
 *                 format: float
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Parking slot updated successfully
 */
router.put("/ParkingSlot/Update", controller.update);


/* ======================= DELETE ======================= */
/**
 * @swagger
 * /ParkingSlot/Delete:
 *   post:
 *     summary: Soft delete parking slot
 *     tags: [Parking Slot]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               slotId:
 *                 type: integer
 *               statusId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Parking slot deleted successfully
 */
router.post("/ParkingSlot/Delete", controller.remove);


/* ======================= UPDATE OCCUPANCY ======================= */
/**
 * @swagger
 * /ParkingSlot/UpdateOccupancy:
 *   post:
 *     summary: Update parking slot occupancy
 *     tags: [Parking Slot]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               slotId:
 *                 type: integer
 *               isOccupied:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Occupancy updated successfully
 */
router.post("/ParkingSlot/UpdateOccupancy", controller.updateOccupancy);


/* ======================= GET BY ID ======================= */
/**
 * @swagger
 * /ParkingSlot/GetById/{id}:
 *   get:
 *     summary: Get parking slot by ID
 *     tags: [Parking Slot]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Parking slot details fetched successfully
 */
router.get("/ParkingSlot/GetById/:id", controller.getById);


/* ======================= GET ALL ======================= */
/**
 * @swagger
 * /ParkingSlot/GetAll:
 *   get:
 *     summary: Get all parking slots by society
 *     tags: [Parking Slot]
 *     parameters:
 *       - in: query
 *         name: society_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Parking slot list fetched successfully
 */
router.get("/ParkingSlot/GetAll", controller.getAll);


/* ======================= GET AVAILABLE ======================= */
/**
 * @swagger
 * /ParkingSlot/GetAvailable:
 *   get:
 *     summary: Get available parking slots by society
 *     tags: [Parking Slot]
 *     parameters:
 *       - in: query
 *         name: society_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Available parking slot list fetched successfully
 */
router.get("/ParkingSlot/GetAvailable", controller.getAvailable);


module.exports = router;