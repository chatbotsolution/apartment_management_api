const express = require("express");
const router = express.Router();
const controller = require("../controllers/complaintController");

/**
 * @swagger
 * tags:
 *   name: Complaints
 */

/* ======================= GET ALL ======================= */
/**
 * @swagger
 * /Complaints/GetAllComplaints:
 *   get:
 *     summary: Get all active complaints
 *     tags: [Complaints]
 *     responses:
 *       200:
 *         description: Complaints list
 */
router.get("/Complaints/GetAllComplaints", controller.getAll);

/* ======================= GET BY ID ======================= */
/**
 * @swagger
 * /Complaints/GetComplaintById/{id}:
 *   get:
 *     summary: Get complaint by ID
 *     tags: [Complaints]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Complaint details
 */
router.get("/Complaints/GetComplaintById/:id", controller.getById);

/* ======================= GET BY USER ID ======================= */
/**
 * @swagger
 * /Complaints/GetComplaintsByUserId/{userId}:
 *   get:
 *     summary: Get complaints by User ID
 *     tags: [Complaints]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of complaints by user
 */
router.get("/Complaints/GetComplaintsByUserId/:userId", controller.getByUserId);

/* ======================= CREATE ======================= */
/**
 * @swagger
 * /Complaints/RegisterComplaint:
 *   post:
 *     summary: Register a new complaint
 *     tags: [Complaints]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Flat_Id:
 *                 type: integer
 *               User_Id:
 *                 type: integer
 *               Title:
 *                 type: string
 *               Description:
 *                 type: string
 *               Priority:
 *                 type: string
 *     responses:
 *       200:
 *         description: Complaint registered successfully
 */
router.post("/Complaints/RegisterComplaint", controller.create);

/* ======================= UPDATE ======================= */
/**
 * @swagger
 * /Complaints/UpdateComplaint:
 *   put:
 *     summary: Update complaint details or status
 *     tags: [Complaints]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Complaint_Id:
 *                 type: integer
 *               Title:
 *                 type: string
 *               Description:
 *                 type: string
 *               Status:
 *                 type: string
 *               Priority:
 *                 type: string
 *     responses:
 *       200:
 *         description: Complaint updated successfully
 */
router.put("/Complaints/UpdateComplaint", controller.update);

/* ======================= DELETE ======================= */
/**
 * @swagger
 * /Complaints/DeleteComplaint/{id}:
 *   delete:
 *     summary: Delete complaint (Soft delete)
 *     tags: [Complaints]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Complaint deleted successfully
 */
router.delete("/Complaints/DeleteComplaint/:id", controller.remove);

module.exports = router;
