const express = require("express");
const router = express.Router();
const controller = require("../controllers/maintenanceRequestController");
const upload = require("../middlewares/upload.middleware");

/**
 * @swagger
 * tags:
 *   name: Maintenance Request
 *   description: Society maintenance ticketing and staff assignment APIs
 */


/* ======================= POST ROUTES ======================= */

/**
 * @swagger
 * /MaintenanceRequest/Create:
 *   post:
 *     summary: Raise a new maintenance request (Ticket)
 *     tags: [Maintenance Request]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - flatId
 *               - title
 *               - categoryId
 *               - priorityId
 *             properties:
 *               flatId:
 *                 type: integer
 *                 example: 101
 *               ownerId:
 *                 type: integer
 *                 example: 1
 *               tenantId:
 *                 type: integer
 *                 nullable: true
 *                 example: null
 *               title:
 *                 type: string
 *                 example: Leaking bathroom pipe
 *               description:
 *                 type: string
 *                 example: Continuous water leak under the master bathroom sink.
 *               categoryId:
 *                 type: integer
 *                 description: ID from master_lookup for category (e.g., Plumbing)
 *                 example: 2
 *               priorityId:
 *                 type: integer
 *                 description: ID from master_lookup for priority (e.g., High)
 *                 example: 1
 *               statusId:
 *                 type: integer
 *                 description: Default to 1 (Open)
 *                 example: 1
 *               estimatedCost:
 *                 type: number
 *                 format: float
 *                 example: 500.00
 *               beforePhotoUrl:
 *                 type: string
 *                 example: https://bucket.s3.amazonaws.com/leak.jpg
 *     responses:
 *       200:
 *         description: Maintenance request created successfully
 *       500:
 *         description: Server error
 */
router.post("/MaintenanceRequest/Create", upload.single("beforePhotoUrl"), controller.create);


/**
 * @swagger
 * /MaintenanceRequest/Assign:
 *   post:
 *     summary: Assign a staff member and schedule a time for the request
 *     tags: [Maintenance Request]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - requestId
 *               - assignedStaffId
 *               - statusId
 *             properties:
 *               requestId:
 *                 type: integer
 *                 example: 15
 *               assignedStaffId:
 *                 type: integer
 *                 example: 4
 *               statusId:
 *                 type: integer
 *                 description: ID for 'In Progress' or 'Assigned'
 *                 example: 2
 *               scheduledAt:
 *                 type: string
 *                 format: date-time
 *                 example: 2026-05-14T10:00:00Z
 *               estimatedCost:
 *                 type: number
 *                 format: float
 *                 example: 650.00
 *     responses:
 *       200:
 *         description: Staff assigned successfully
 */
router.post("/MaintenanceRequest/Assign", controller.assign);


/**
 * @swagger
 * /MaintenanceRequest/Complete:
 *   post:
 *     summary: Close a ticket, record actual costs, and upload after photos
 *     tags: [Maintenance Request]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - requestId
 *               - statusId
 *               - actualCost
 *             properties:
 *               requestId:
 *                 type: integer
 *                 example: 15
 *               statusId:
 *                 type: integer
 *                 description: ID for Completed
 *                 example: 3
 *               completedAt:
 *                 type: string
 *                 format: date-time
 *                 description: Optional. Defaults to NOW() if not provided.
 *                 example: 2026-05-14T14:30:00Z
 *               actualCost:
 *                 type: number
 *                 format: float
 *                 example: 700.00
 *               costBorneById:
 *                 type: integer
 *                 description: ID for who pays (e.g., Owner, Society)
 *                 example: 1
 *               remarks:
 *                 type: string
 *                 example: Replaced the U-bend pipe completely.
 *               afterPhotoUrl:
 *                 type: string
 *                 example: https://bucket.s3.amazonaws.com/fixed.jpg
 *     responses:
 *       200:
 *         description: Request completed successfully
 */
router.post("/MaintenanceRequest/Complete", upload.single("afterPhotoUrl"), controller.complete);


/* ======================= PUT ROUTES ======================= */

/**
 * @swagger
 * /MaintenanceRequest/Update:
 *   put:
 *     summary: Update basic ticket info (Title, Description, Priority)
 *     tags: [Maintenance Request]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - requestId
 *             properties:
 *               requestId:
 *                 type: integer
 *                 example: 15
 *               title:
 *                 type: string
 *                 example: Leaking bathroom pipe - UPDATED
 *               description:
 *                 type: string
 *                 example: Continuous water leak. Getting worse.
 *               categoryId:
 *                 type: integer
 *                 example: 2
 *               priorityId:
 *                 type: integer
 *                 example: 3
 *               statusId:
 *                 type: integer
 *                 example: 1
 *               estimatedCost:
 *                 type: number
 *                 format: float
 *                 example: 600.00
 *               beforePhotoUrl:
 *                 type: string
 *                 example: https://bucket.s3.amazonaws.com/leak_updated.jpg
 *     responses:
 *       200:
 *         description: Maintenance request updated successfully
 */
router.put("/MaintenanceRequest/Update", upload.single("photo_url"), controller.update);


/* ======================= GET ROUTES ======================= */

/**
 * @swagger
 * /MaintenanceRequest/GetById/{id}:
 *   get:
 *     summary: Fetch full details of a specific request
 *     tags: [Maintenance Request]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The maintenance request ID
 *     responses:
 *       200:
 *         description: Successfully fetched request details
 *       404:
 *         description: Request not found
 */
router.get("/MaintenanceRequest/GetById/:id", controller.getById);


/**
 * @swagger
 * /MaintenanceRequest/GetAll:
 *   get:
 *     summary: Fetch all maintenance requests (Staff/Admin view)
 *     tags: [Maintenance Request]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 100
 *         description: Number of records to return
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Number of records to skip
 *     responses:
 *       200:
 *         description: Successfully fetched list of maintenance requests
 */
router.get("/MaintenanceRequest/GetAll", controller.getAll);

module.exports = router;