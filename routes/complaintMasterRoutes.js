const express = require("express");
const router = express.Router();
const controller = require("../controllers/complaintMasterController");

/**
 * @swagger
 * tags:
 *   name: Complaint Master
 */

/* ======================= GET ALL ======================= */
/**
 * @swagger
 * /ComplaintMaster/GetAllComplaintMaster:
 *   get:
 *     summary: Get all complaint types from master
 *     tags: [Complaint Master]
 *     responses:
 *       200:
 *         description: Complaint type list
 */
router.get("/ComplaintMaster/GetAllComplaintMaster", controller.getAll);

/* ======================= GET BY ID ======================= */
/**
 * @swagger
 * /ComplaintMaster/GetComplaintMasterById/{id}:
 *   get:
 *     summary: Get complaint type by ID
 *     tags: [Complaint Master]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Complaint type details
 */
router.get("/ComplaintMaster/GetComplaintMasterById/:id", controller.getById);

/* ======================= CREATE ======================= */
/**
 * @swagger
 * /ComplaintMaster/CreateComplaintMaster:
 *   post:
 *     summary: Create complaint type
 *     tags: [Complaint Master]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               complaintType:
 *                 type: string
 *               userId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Complaint type created successfully
 */
router.post("/ComplaintMaster/CreateComplaintMaster", controller.create);

/* ======================= UPDATE ======================= */
/**
 * @swagger
 * /ComplaintMaster/UpdateComplaintMaster:
 *   put:
 *     summary: Update complaint type
 *     tags: [Complaint Master]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               complaintType:
 *                 type: string
 *               userId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Complaint type updated successfully
 */
router.put("/ComplaintMaster/UpdateComplaintMaster", controller.update);

/* ======================= DELETE ======================= */
/**
 * @swagger
 * /ComplaintMaster/DeleteComplaintMaster/{id}:
 *   delete:
 *     summary: Delete complaint type
 *     tags: [Complaint Master]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Complaint type deleted successfully
 */
router.delete("/ComplaintMaster/DeleteComplaintMaster/:id", controller.remove);

module.exports = router;
