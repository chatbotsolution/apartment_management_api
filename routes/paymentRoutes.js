const express = require("express");
const router = express.Router();
const controller = require("../controllers/paymentController");

/**
 * @swagger
 * tags:
 *   name: Payments
 */

/* ======================= GET ALL ======================= */
/**
 * @swagger
 * /Payments/GetAllPayments:
 *   get:
 *     summary: Get all payments
 *     tags: [Payments]
 *     responses:
 *       200:
 *         description: Payments list
 */
router.get("/Payments/GetAllPayments", controller.getAll);

/* ======================= GET BY ID ======================= */
/**
 * @swagger
 * /Payments/GetPaymentById/{id}:
 *   get:
 *     summary: Get payment by ID
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Payment details
 */
router.get("/Payments/GetPaymentById/:id", controller.getById);

/* ======================= GET BY BILL ID ======================= */
/**
 * @swagger
 * /Payments/GetPaymentByBillId/{billId}:
 *   get:
 *     summary: Get payments by Bill ID
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: billId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of payments for the bill
 */
router.get("/Payments/GetPaymentByBillId/:billId", controller.getByBillId);

/* ======================= CREATE ======================= */
/**
 * @swagger
 * /Payments/CreatePayment:
 *   post:
 *     summary: Record a payment
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Bill_Id:
 *                 type: integer
 *               Paid_Amount:
 *                 type: number
 *               Payment_Date:
 *                 type: string
 *                 format: date-time
 *               Payment_Mode:
 *                 type: string
 *               Transaction_Id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Payment recorded successfully
 */
router.post("/Payments/CreatePayment", controller.create);

/* ======================= UPDATE ======================= */
/**
 * @swagger
 * /Payments/UpdatePayment:
 *   put:
 *     summary: Update payment details
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Payment_Id:
 *                 type: integer
 *               Bill_Id:
 *                 type: integer
 *               Paid_Amount:
 *                 type: number
 *               Payment_Date:
 *                 type: string
 *                 format: date-time
 *               Payment_Mode:
 *                 type: string
 *               Transaction_Id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Payment updated successfully
 */
router.put("/Payments/UpdatePayment", controller.update);

/* ======================= DELETE ======================= */
/**
 * @swagger
 * /Payments/DeletePayment/{id}:
 *   delete:
 *     summary: Delete payment
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Payment deleted successfully
 */
router.delete("/Payments/DeletePayment/:id", controller.remove);

module.exports = router;
