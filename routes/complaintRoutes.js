const express = require("express");
const router = express.Router();
const controller = require("../controllers/complaintController");

/**
 * @swagger
 * tags:
 *   name: User Requests
 *   description: Management of user complaints and service requests
 */

/* ======================= GET ALL ======================= */
/**
 * @swagger
 * /Complaints/GetAllComplaints:
 *   get:
 *     summary: Get all user requests
 *     tags: [User Requests]
 *     responses:
 *       200:
 *         description: List of complaints/requests
 */
router.get("/Complaints/GetAllComplaints", controller.getAll);

/* ======================= GET BY ID ======================= */
/**
 * @swagger
 * /Complaints/GetComplaintById/{id}:
 *   get:
 *     summary: Get request by ID
 *     tags: [User Requests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Request details
 */
router.get("/Complaints/GetComplaintById/:id", controller.getById);

/* ======================= CREATE ======================= */
/**
 * @swagger
 * /Complaints/RegisterComplaint:
 *   post:
 *     summary: Register a new complaint/request
 *     tags: [User Requests]
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
 *               complaintTypeId:
 *                 type: integer
 *               Description:
 *                 type: string
 *               Priority:
 *                 type: string
 *               req_type:
 *                 type: string
 *               req_Id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Request submitted successfully
 */
router.post("/Complaints/RegisterComplaint", controller.create);

/* ======================= UPDATE ======================= */
/**
 * @swagger
 * /Complaints/UpdateComplaint:
 *   put:
 *     summary: Update complaint/request
 *     tags: [User Requests]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Complaint_Id:
 *                 type: integer
 *               Flat_Id:
 *                 type: integer
 *               complaintTypeId:
 *                 type: integer
 *               Description:
 *                 type: string
 *               Status:
 *                 type: string
 *               Priority:
 *                 type: string
 *               req_type:
 *                 type: string
 *               req_Id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Request updated successfully
 */
router.put("/Complaints/UpdateComplaint", controller.update);

/* ======================= DELETE ======================= */
/**
 * @swagger
 * /Complaints/DeleteComplaint/{id}:
 *   delete:
 *     summary: Delete request
 *     tags: [User Requests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Request deleted successfully
 */
router.delete("/Complaints/DeleteComplaint/:id", controller.remove);

module.exports = router;
