const express = require("express");
const router = express.Router();
const controller = require("../controllers/visitorController");

/**
 * @swagger
 * tags:
 *   name: Visitor Management
 *   description: Visitor management APIs
 */


/* ======================= CHECK-IN ======================= */

/**
 * @swagger
 * /Visitor/CheckIn:
 *   post:
 *     summary: Visitor Check-In (Entry)
 *     tags: [Visitor Management]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - host_flat_id
 *               - visitor_name
 *               - visitor_phone
 *               - society_id
 *             properties:
 *               host_flat_id:
 *                 type: integer
 *                 example: 101
 *               visitor_name:
 *                 type: string
 *                 example: John Doe
 *               visitor_phone:
 *                 type: string
 *                 example: 9876543210
 *               vehicle_number:
 *                 type: string
 *                 example: WB12AB1234
 *               vehicle_type:
 *                 type: string
 *                 example: Car
 *               purpose:
 *                 type: string
 *                 example: Delivery
 *               expected_checkout:
 *                 type: string
 *                 format: date-time
 *               id_proof_type_id:
 *                 type: integer
 *                 example: 1
 *               id_proof_number:
 *                 type: string
 *                 example: A1234567
 *               approved_by:
 *                 type: string
 *                 example: Security
 *               entry_status_id:
 *                 type: integer
 *                 example: 1
 *               visitor_type_id:
 *                 type: integer
 *                 example: 2
 *               notes:
 *                 type: string
 *                 example: Carrying parcel
 *               created_by:
 *                 type: integer
 *                 example: 1
 *               society_id:
 *                 type: integer
 *                 example: 10
 *     responses:
 *       200:
 *         description: Visitor checked-in successfully
 */
router.post("/Visitor/CheckIn", controller.checkInVisitor);


/* ======================= CHECK-OUT ======================= */

/**
 * @swagger
 * /Visitor/CheckOut:
 *   post:
 *     summary: Visitor Check-Out (Exit)
 *     tags: [Visitor Management]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - visitor_id
 *               - society_id
 *             properties:
 *               visitor_id:
 *                 type: integer
 *                 example: 1
 *               entry_status_id:
 *                 type: integer
 *                 example: 2
 *               society_id:
 *                 type: integer
 *                 example: 10
 *     responses:
 *       200:
 *         description: Visitor checked-out successfully
 */
router.post("/Visitor/CheckOut", controller.checkOutVisitor);


/* ======================= UPDATE ======================= */

/**
 * @swagger
 * /Visitor/Update:
 *   put:
 *     summary: Update Visitor Details
 *     tags: [Visitor Management]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - visitor_id
 *               - host_flat_id
 *               - visitor_name
 *               - visitor_phone
 *               - society_id
 *             properties:
 *               visitor_id:
 *                 type: integer
 *                 example: 1
 *               host_flat_id:
 *                 type: integer
 *                 example: 101
 *               visitor_name:
 *                 type: string
 *                 example: John Updated
 *               visitor_phone:
 *                 type: string
 *                 example: 9999999999
 *               vehicle_number:
 *                 type: string
 *               vehicle_type:
 *                 type: string
 *               purpose:
 *                 type: string
 *               expected_checkout:
 *                 type: string
 *                 format: date-time
 *               id_proof_type_id:
 *                 type: integer
 *               id_proof_number:
 *                 type: string
 *               approved_by:
 *                 type: string
 *               entry_status_id:
 *                 type: integer
 *               visitor_type_id:
 *                 type: integer
 *               notes:
 *                 type: string
 *               created_by:
 *                 type: integer
 *               society_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Visitor updated successfully
 */
router.put("/Visitor/Update", controller.updateVisitor);


/* ======================= GET BY ID ======================= */

/**
 * @swagger
 * /Visitor/GetById/{id}:
 *   get:
 *     summary: Get Visitor By ID
 *     tags: [Visitor Management]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Visitor fetched successfully
 *       404:
 *         description: Data not found
 */
router.get("/Visitor/GetById/:id", controller.getVisitorById);


/* ======================= GET TODAY ======================= */

/**
 * @swagger
 * /Visitor/GetToday:
 *   get:
 *     summary: Get Today's Visitors
 *     tags: [Visitor Management]
 *     parameters:
 *       - in: query
 *         name: society_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Today's visitors fetched successfully
 */
router.get("/Visitor/GetToday", controller.getTodayVisitors);


/* ======================= GET ACTIVE ======================= */

/**
 * @swagger
 * /Visitor/GetActive:
 *   get:
 *     summary: Get Active Visitors (Inside Society)
 *     tags: [Visitor Management]
 *     parameters:
 *       - in: query
 *         name: society_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Active visitors fetched successfully
 */
router.get("/Visitor/GetActive", controller.getActiveVisitors);


/* ======================= HISTORY BY FLAT ======================= */

/**
 * @swagger
 * /Visitor/GetHistoryByFlat:
 *   get:
 *     summary: Get Visitor History By Flat
 *     tags: [Visitor Management]
 *     parameters:
 *       - in: query
 *         name: flat_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Visitor history fetched successfully
 */
router.get("/Visitor/GetHistoryByFlat", controller.getVisitorHistoryByFlat);


/* ======================= SEARCH ======================= */

/**
 * @swagger
 * /Visitor/Search:
 *   post:
 *     summary: Search Visitors
 *     tags: [Visitor Management]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - search_text
 *               - society_id
 *             properties:
 *               search_text:
 *                 type: string
 *                 example: John
 *               society_id:
 *                 type: integer
 *                 example: 10
 *     responses:
 *       200:
 *         description: Search result fetched successfully
 */
router.post("/Visitor/Search", controller.searchVisitors);

/* ======================= VISITOR ENTRY STATUS ======================= */

/**
 * @swagger
 * /Dropdown/VisitorEntryStatus:
 *   get:
 *     summary: Get Visitor Entry Status dropdown
 *     description: Returns lookup values for group `visitor_entry_status`.
 *     tags: [Dropdown Master]
 *     responses:
 *       200:
 *         description: List of visitor entry statuses
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DropdownResponse'
 *       500:
 *         description: Internal server error
 */
router.get("/Dropdown/VisitorEntryStatus", controller.visitorEntryStatus);


/* ======================= VISITOR TYPE ======================= */

/**
 * @swagger
 * /Dropdown/VisitorType:
 *   get:
 *     summary: Get Visitor Type dropdown
 *     description: Returns lookup values for group `visitor_type`.
 *     tags: [Dropdown Master]
 *     responses:
 *       200:
 *         description: List of visitor types
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DropdownResponse'
 *       500:
 *         description: Internal server error
 */
router.get("/Dropdown/VisitorType", controller.visitorType);


module.exports = router;