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
 *     summary: Get all active (currently parked) visitor records by society or organization
 *     description: >
 *       Pass `society_id` for a society/owner login, or `org_id` for an
 *       organization login. At least one of the two is required.
 *     tags: [Visitor Parking]
 *     parameters:
 *       - in: query
 *         name: society_id
 *         required: false
 *         schema:
 *           type: integer
 *           example: 47
 *         description: Filter active records by a single society (society/owner login)
 *       - in: query
 *         name: org_id
 *         required: false
 *         schema:
 *           type: integer
 *           example: 9
 *         description: Filter active records across all societies in an organization (org login)
 *     responses:
 *       200:
 *         description: Active visitor parking list fetched successfully
 *       400:
 *         description: Either society_id or org_id is required
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
 *     summary: Get full visitor parking history (active + released) by society or organization
 *     description: >
 *       Pass `society_id` for a society/owner login, or `org_id` for an
 *       organization login. At least one of the two is required.
 *     tags: [Visitor Parking]
 *     parameters:
 *       - in: query
 *         name: society_id
 *         required: false
 *         schema:
 *           type: integer
 *           example: 47
 *         description: Filter history by a single society (society/owner login)
 *       - in: query
 *         name: org_id
 *         required: false
 *         schema:
 *           type: integer
 *           example: 9
 *         description: Filter history across all societies in an organization (org login)
 *     responses:
 *       200:
 *         description: Visitor parking history fetched successfully
 *       400:
 *         description: Either society_id or org_id is required
 */
router.get("/VisitorParking/GetHistory", controller.getHistory);


module.exports = router;