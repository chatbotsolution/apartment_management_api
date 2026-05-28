const express = require("express");
const router = express.Router();
const controller = require("../controllers/parkingController");


/**
 * @swagger
 * tags:
 *   name: Parking Allotment
 *   description: Parking allotment management APIs
 */


/* ======================= ASSIGN ======================= */
/**
 * @swagger
 * /Parking/Assign:
 *   post:
 *     summary: Assign parking slot to flat/owner/tenant
 *     tags: [Parking Allotment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               slotId:
 *                 type: integer
 *               flatId:
 *                 type: integer
 *               ownerId:
 *                 type: integer
 *               tenantId:
 *                 type: integer
 *               vehicleNumber:
 *                 type: string
 *               vehicleType:
 *                 type: string
 *               vehicleModel:
 *                 type: string
 *               vehicleColor:
 *                 type: string
 *               allotmentDate:
 *                 type: string
 *                 format: date
 *               validUntil:
 *                 type: string
 *                 format: date
 *               monthlyCharge:
 *                 type: number
 *                 format: float
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Parking assigned successfully
 */
router.post("/Parking/Assign", controller.assign);


/* ======================= UPDATE ======================= */
/**
 * @swagger
 * /Parking/Update:
 *   put:
 *     summary: Update parking allotment details
 *     tags: [Parking Allotment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               allotmentId:
 *                 type: integer
 *               vehicleNumber:
 *                 type: string
 *               vehicleType:
 *                 type: string
 *               vehicleModel:
 *                 type: string
 *               vehicleColor:
 *                 type: string
 *               validUntil:
 *                 type: string
 *                 format: date
 *               monthlyCharge:
 *                 type: number
 *                 format: float
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Parking allotment updated successfully
 */
router.put("/Parking/Update", controller.update);


/* ======================= RELEASE ======================= */
/**
 * @swagger
 * /Parking/Release:
 *   post:
 *     summary: Release parking slot (deactivate allotment)
 *     tags: [Parking Allotment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               allotmentId:
 *                 type: integer
 *               slotId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Parking slot released successfully
 */
router.post("/Parking/Release", controller.release);


/* ======================= GET BY ID ======================= */
/**
 * @swagger
 * /Parking/GetById/{id}:
 *   get:
 *     summary: Get parking allotment by ID
 *     tags: [Parking Allotment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Parking allotment details fetched successfully
 */
router.get("/Parking/GetById/:id", controller.getById);


/* ======================= GET ALL ======================= */
/**
 * @swagger
 * /Parking/GetAll:
 *   get:
 *     summary: Get all active parking allotments (by society or organization)
 *     description: >
 *       Pass `society_id` for a society/owner login, or `org_id` for an
 *       organization login. At least one of the two is required.
 *     tags: [Parking Allotment]
 *     parameters:
 *       - in: query
 *         name: society_id
 *         required: false
 *         schema:
 *           type: integer
 *           example: 47
 *         description: Filter allotments by a single society (society/owner login)
 *       - in: query
 *         name: org_id
 *         required: false
 *         schema:
 *           type: integer
 *           example: 9
 *         description: Filter allotments across all societies in an organization (org login)
 *     responses:
 *       200:
 *         description: Parking allotment list fetched successfully
 *       400:
 *         description: Either society_id or org_id is required
 */
router.get("/Parking/GetAll", controller.getAll);


/* ======================= GET HISTORY BY SLOT ======================= */
/**
 * @swagger
 * /Parking/GetHistory:
 *   get:
 *     summary: Get parking allotment history for a slot
 *     tags: [Parking Allotment]
 *     parameters:
 *       - in: query
 *         name: slot_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Parking history fetched successfully
 */
router.get("/Parking/GetHistory", controller.getHistoryBySlot);


module.exports = router;