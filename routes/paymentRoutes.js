const express = require("express");
const router = express.Router();
const controller = require("../controllers/paymentController");

/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: Management of accounting transactions
 */

/* ======================= GET ALL ======================= */
/**
 * @swagger
 * /Payments/GetAllPayments:
 *   get:
 *     summary: Get all transactions
 *     tags: [Transactions]
 *     responses:
 *       200:
 *         description: Transactions list
 */
router.get("/Payments/GetAllPayments", controller.getAll);

/* ======================= GET BY ID ======================= */
/**
 * @swagger
 * /Payments/GetPaymentById/{id}:
 *   get:
 *     summary: Get transaction by ID
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Transaction details
 */
router.get("/Payments/GetPaymentById/:id", controller.getById);

/* ======================= CREATE ======================= */
/**
 * @swagger
 * /Payments/CreatePayment:
 *   post:
 *     summary: Record a new transaction
 *     tags: [Transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Flat_Id:
 *                 type: integer
 *               Transaction_Type:
 *                 type: string
 *               Invoice_No:
 *                 type: string
 *               Debit:
 *                 type: number
 *               Credit:
 *                 type: number
 *               Payment_Mode:
 *                 type: string
 *               Remarks:
 *                 type: string
 *     responses:
 *       200:
 *         description: Transaction recorded successfully
 */
router.post("/Payments/CreatePayment", controller.create);

/* ======================= UPDATE ======================= */
/**
 * @swagger
 * /Payments/UpdatePayment:
 *   put:
 *     summary: Update transaction details
 *     tags: [Transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Transaction_Id:
 *                 type: integer
 *               Flat_Id:
 *                 type: integer
 *               Transaction_Type:
 *                 type: string
 *               Invoice_No:
 *                 type: string
 *               Debit:
 *                 type: number
 *               Credit:
 *                 type: number
 *               Payment_Mode:
 *                 type: string
 *               Remarks:
 *                 type: string
 *     responses:
 *       200:
 *         description: Transaction updated successfully
 */
router.put("/Payments/UpdatePayment", controller.update);

/* ======================= DELETE ======================= */
/**
 * @swagger
 * /Payments/DeletePayment/{id}:
 *   delete:
 *     summary: Delete transaction
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Transaction deleted successfully
 */
router.delete("/Payments/DeletePayment/:id", controller.remove);

module.exports = router;
