const express = require("express");
const router = express.Router();
const controller = require("../controllers/maintenanceBillController");

/**
 * @swagger
 * tags:
 *   name: Maintenance Billing
 */

/* ======================= GET ALL ======================= */
/**
 * @swagger
 * /MaintenanceBilling/GetAllBills:
 *   get:
 *     summary: Get all maintenance bills
 *     tags: [Maintenance Billing]
 *     responses:
 *       200:
 *         description: Maintenance bills list
 */
router.get("/MaintenanceBilling/GetAllBills", controller.getAll);

/* ======================= GET BY ID ======================= */
/**
 * @swagger
 * /MaintenanceBilling/GetBillById/{id}:
 *   get:
 *     summary: Get maintenance bill by ID
 *     tags: [Maintenance Billing]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Maintenance bill details
 */
router.get("/MaintenanceBilling/GetBillById/:id", controller.getById);

/* ======================= GET BY FLAT ID ======================= */
/**
 * @swagger
 * /MaintenanceBilling/GetBillByFlatId/{flatId}:
 *   get:
 *     summary: Get maintenance bills by Flat ID
 *     tags: [Maintenance Billing]
 *     parameters:
 *       - in: path
 *         name: flatId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of maintenance bills for the flat
 */
router.get("/MaintenanceBilling/GetBillByFlatId/:flatId", controller.getByFlat);

/* ======================= CREATE ======================= */
/**
 * @swagger
 * /MaintenanceBilling/CreateBill:
 *   post:
 *     summary: Create maintenance bill
 *     tags: [Maintenance Billing]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Flat_Id:
 *                 type: integer
 *               Bill_Month:
 *                 type: string
 *               Amount:
 *                 type: number
 *               Due_Date:
 *                 type: string
 *                 format: date
 *               Status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Bill generated successfully
 */
router.post("/MaintenanceBilling/CreateBill", controller.create);

/* ======================= UPDATE ======================= */
/**
 * @swagger
 * /MaintenanceBilling/UpdateBill:
 *   put:
 *     summary: Update maintenance bill
 *     tags: [Maintenance Billing]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Bill_Id:
 *                 type: integer
 *               Flat_Id:
 *                 type: integer
 *               Bill_Month:
 *                 type: string
 *               Amount:
 *                 type: number
 *               Due_Date:
 *                 type: string
 *                 format: date
 *               Status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Bill updated successfully
 */
router.put("/MaintenanceBilling/UpdateBill", controller.update);

/* ======================= UPDATE STATUS ======================= */
/**
 * @swagger
 * /MaintenanceBilling/UpdateBillStatus:
 *   patch:
 *     summary: Update maintenance bill status only
 *     tags: [Maintenance Billing]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Bill_Id:
 *                 type: integer
 *               Status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Status updated successfully
 */
router.post("/MaintenanceBilling/UpdateBillStatus", controller.updateStatus);

/* ======================= DELETE ======================= */
/**
 * @swagger
 * /MaintenanceBilling/DeleteBill/{id}:
 *   delete:
 *     summary: Delete maintenance bill (Soft delete)
 *     tags: [Maintenance Billing]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Bill deleted successfully
 */
router.delete("/MaintenanceBilling/DeleteBill/:id", controller.remove);

module.exports = router;
