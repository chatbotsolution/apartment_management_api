const express = require("express");
const router = express.Router();
const controller = require("../controllers/maintenanceRequestController");

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
 */
router.post("/MaintenanceRequest/Create", controller.create);

/**
 * @swagger
 * /MaintenanceRequest/Assign:
 *   post:
 *     summary: Assign a staff member and schedule a time for the request
 *     tags: [Maintenance Request]
 */
router.post("/MaintenanceRequest/Assign", controller.assign);

/**
 * @swagger
 * /MaintenanceRequest/Complete:
 *   post:
 *     summary: Close a ticket, record actual costs, and upload "after" photos
 *     tags: [Maintenance Request]
 */
router.post("/MaintenanceRequest/Complete", controller.complete);


/* ======================= PUT ROUTES ======================= */

/**
 * @swagger
 * /MaintenanceRequest/Update:
 *   put:
 *     summary: Update basic ticket info (Title, Description, Priority)
 *     tags: [Maintenance Request]
 */
router.put("/MaintenanceRequest/Update", controller.update);


/* ======================= GET ROUTES ======================= */

/**
 * @swagger
 * /MaintenanceRequest/GetById/{id}:
 *   get:
 *     summary: Fetch full details of a specific request
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     tags: [Maintenance Request]
 */
router.get("/MaintenanceRequest/GetById/:id", controller.getById);

/**
 * @swagger
 * /MaintenanceRequest/GetAll:
 *   get:
 *     summary: Fetch all maintenance requests (Staff/Admin view)
 *     tags: [Maintenance Request]
 */
router.get("/MaintenanceRequest/GetAll", controller.getAll);

module.exports = router;