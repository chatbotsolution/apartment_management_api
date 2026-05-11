const express = require("express");
const router = express.Router();
const controller = require("../controllers/visitorParkingController");


/* ======================= TAG ======================= */
/**
 * @swagger
 * tags:
 *   name: Visitor Parking
 *   description: Visitor parking slot management
 */


/* ======================= ASSIGN SLOT ======================= */
/**
 * @swagger
 * /VisitorParking/Assign:
 *   post:
 *     summary: Assign parking slot to visitor
 *     tags: [Visitor Parking]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               visitorId:
 *                 type: integer
 *               slotId:
 *                 type: integer
 *               vehicleNumber:
 *                 type: string
 *               vehicleType:
 *                 type: string
 *               statusId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Parking slot assigned successfully
 */
router.post("/VisitorParking/Assign", controller.assign);


/* ======================= UPDATE ======================= */
/**
 * @swagger
 * /VisitorParking/Update:
 *   put:
 *     summary: Update visitor parking details
 *     tags: [Visitor Parking]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               visitorParkingId:
 *                 type: integer
 *               vehicleNumber:
 *                 type: string
 *               vehicleType:
 *                 type: string
 *               statusId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Visitor parking updated successfully
 */
router.put("/VisitorParking/Update", controller.update);


/* ======================= RELEASE SLOT ======================= */
/**
 * @swagger
 * /VisitorParking/Release:
 *   post:
 *     summary: Release visitor parking slot
 *     tags: [Visitor Parking]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               visitorParkingId:
 *                 type: integer
 *               slotId:
 *                 type: integer
 *               statusId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Visitor parking slot released successfully
 */
router.post("/VisitorParking/Release", controller.release);


/* ======================= GET ACTIVE ======================= */
/**
 * @swagger
 * /VisitorParking/GetActive:
 *   get:
 *     summary: Get all active (currently parked) visitor records
 *     tags: [Visitor Parking]
 *     responses:
 *       200:
 *         description: Active visitor parking list fetched successfully
 */
router.get("/VisitorParking/GetActive", controller.getActive);


/* ======================= GET BY ID ======================= */
/**
 * @swagger
 * /VisitorParking/GetById/{id}:
 *   get:
 *     summary: Get visitor parking record by ID
 *     tags: [Visitor Parking]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Visitor parking record fetched successfully
 */
router.get("/VisitorParking/GetById/:id", controller.getById);


/* ======================= GET HISTORY ======================= */
/**
 * @swagger
 * /VisitorParking/GetHistory:
 *   get:
 *     summary: Get full visitor parking history (active + released)
 *     tags: [Visitor Parking]
 *     responses:
 *       200:
 *         description: Visitor parking history fetched successfully
 */
router.get("/VisitorParking/GetHistory", controller.getHistory);


module.exports = router;