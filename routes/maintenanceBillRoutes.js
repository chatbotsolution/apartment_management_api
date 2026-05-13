const express = require("express");
const router = express.Router();
const controller = require("../controllers/maintenanceBillController");

/**
 * @swagger
 * tags:
 *   name: Maintenance Fee
 *   description: Society maintenance billing and payment APIs
 */

/* ======================= SCHEMAS ======================= */

/**
 * @swagger
 * components:
 *   schemas:
 *     MaintenanceFee:
 *       type: object
 *       properties:
 *         maintenance_fee_id:
 *           type: integer
 *           example: 1
 *         society_id:
 *           type: integer
 *           example: 1
 *         flat_id:
 *           type: integer
 *           example: 101
 *         amount:
 *           type: number
 *           format: float
 *           example: 2500
 *         penalty_amount:
 *           type: number
 *           format: float
 *           example: 100
 *         billing_month:
 *           type: string
 *           example: "2026-05"
 *         due_date:
 *           type: string
 *           format: date
 *           example: "2026-05-10"
 *         payment_status:
 *           type: string
 *           example: "Paid"
 *         payment_date:
 *           type: string
 *           format: date-time
 *           nullable: true
 *         transaction_reference:
 *           type: string
 *           example: "TXN987654321"
 *         receipt_url:
 *           type: string
 *           example: "https://example.com/receipt.pdf"
 *         remarks:
 *           type: string
 *           example: "Monthly maintenance fee"
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *
 *     CreateMaintenanceFeeRequest:
 *       type: object
 *       required:
 *         - society_id
 *         - flat_id
 *         - amount
 *         - billing_month
 *         - due_date
 *       properties:
 *         society_id:
 *           type: integer
 *           example: 1
 *         flat_id:
 *           type: integer
 *           example: 101
 *         amount:
 *           type: number
 *           example: 2500
 *         penalty_amount:
 *           type: number
 *           example: 0
 *         billing_month:
 *           type: string
 *           example: "2026-05"
 *         due_date:
 *           type: string
 *           format: date
 *           example: "2026-05-10"
 *         remarks:
 *           type: string
 *           example: "Monthly maintenance"
 *
 *     GenerateMonthlyRequest:
 *       type: object
 *       required:
 *         - society_id
 *         - billing_month
 *         - due_date
 *         - amount
 *       properties:
 *         society_id:
 *           type: integer
 *           example: 1
 *         billing_month:
 *           type: string
 *           example: "2026-05"
 *         due_date:
 *           type: string
 *           format: date
 *           example: "2026-05-10"
 *         amount:
 *           type: number
 *           example: 2500
 *
 *     PayMaintenanceFeeRequest:
 *       type: object
 *       required:
 *         - maintenance_fee_id
 *         - payment_date
 *         - transaction_reference
 *       properties:
 *         maintenance_fee_id:
 *           type: integer
 *           example: 1
 *         payment_date:
 *           type: string
 *           format: date-time
 *           example: "2026-05-12T10:30:00Z"
 *         transaction_reference:
 *           type: string
 *           example: "TXN123456789"
 *         receipt_url:
 *           type: string
 *           example: "https://example.com/receipt.pdf"
 *
 *     UpdateMaintenanceFeeRequest:
 *       type: object
 *       properties:
 *         maintenance_fee_id:
 *           type: integer
 *           example: 1
 *         amount:
 *           type: number
 *           example: 2600
 *         penalty_amount:
 *           type: number
 *           example: 100
 *         due_date:
 *           type: string
 *           format: date
 *           example: "2026-05-15"
 *         remarks:
 *           type: string
 *           example: "Updated due date"
 *
 *     SuccessResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "Operation completed successfully"
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: "Something went wrong"
 */

/* ======================= POST ROUTES ======================= */

/**
 * @swagger
 * /MaintenanceFee/Create:
 *   post:
 *     summary: Generate an individual maintenance fee record
 *     tags: [Maintenance Fee]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateMaintenanceFeeRequest'
 *     responses:
 *       201:
 *         description: Maintenance fee created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Invalid request data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server error
 */
router.post("/MaintenanceFee/Create", controller.create);

/**
 * @swagger
 * /MaintenanceFee/GenerateMonthly:
 *   post:
 *     summary: Bulk generate maintenance fees for all active flats for a specific month
 *     tags: [Maintenance Fee]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GenerateMonthlyRequest'
 *     responses:
 *       201:
 *         description: Monthly maintenance fees generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Invalid request data
 *       500:
 *         description: Server error
 */
router.post("/MaintenanceFee/GenerateMonthly", controller.generateMonthly);

/**
 * @swagger
 * /MaintenanceFee/Pay:
 *   post:
 *     summary: Record a payment, transaction reference, and receipt for a fee
 *     tags: [Maintenance Fee]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PayMaintenanceFeeRequest'
 *     responses:
 *       200:
 *         description: Payment recorded successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Invalid request data
 *       404:
 *         description: Maintenance fee not found
 *       500:
 *         description: Server error
 */
router.post("/MaintenanceFee/Pay", controller.pay);

/* ======================= PUT ROUTES ======================= */

/**
 * @swagger
 * /MaintenanceFee/Update:
 *   put:
 *     summary: Update existing fee details (amount, penalty, due date, etc.)
 *     tags: [Maintenance Fee]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateMaintenanceFeeRequest'
 *     responses:
 *       200:
 *         description: Maintenance fee updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Invalid request data
 *       404:
 *         description: Maintenance fee not found
 *       500:
 *         description: Server error
 */
router.put("/MaintenanceFee/Update", controller.update);

/* ======================= GET ROUTES ======================= */

/**
 * @swagger
 * /MaintenanceFee/GetById/{id}:
 *   get:
 *     summary: Fetch full details of a specific maintenance fee by its ID
 *     tags: [Maintenance Fee]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Maintenance fee details fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/MaintenanceFee'
 *       404:
 *         description: Maintenance fee not found
 *       500:
 *         description: Server error
 */
router.get("/MaintenanceFee/GetById/:id", controller.getById);

/**
 * @swagger
 * /MaintenanceFee/GetAll:
 *   get:
 *     summary: Get all maintenance fee history for a specific flat
 *     tags: [Maintenance Fee]
 *     parameters:
 *       - in: query
 *         name: flatId
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Maintenance fee list fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/MaintenanceFee'
 *       400:
 *         description: flatId is required
 *       500:
 *         description: Server error
 */
router.get("/MaintenanceFee/GetAll", controller.getAll);

module.exports = router;