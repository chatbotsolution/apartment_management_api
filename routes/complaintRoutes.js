const express = require("express");
const router = express.Router();
const controller = require("../controllers/complaintController");
const upload = require("../middlewares/upload.middleware");

/* ======================= SWAGGER COMPONENTS ======================= */
/**
 * @swagger
 * components:
 *   schemas:
 *     ComplaintResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *         message:
 *           type: string
 *         data:
 *           type: object
 */

/* ======================= GET ALL ======================= */
/**
 * @swagger
 * /Complaint/GetAll:
 *   get:
 *     summary: Get all complaints with pagination (filtered by society or org)
 *     tags: [Complaint]
 *     parameters:
 *       - in: query
 *         name: society_id
 *         schema:
 *           type: string
 *           example: "25"
 *         description: Single society ID or comma-separated list (e.g., "25,26"). Either this or org_id is required.
 *       - in: query
 *         name: org_id
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Organization ID. Either this or society_id is required.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 50
 *         description: Number of records to return
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Number of records to skip
 *     responses:
 *       200:
 *         description: A list of complaints
 *       400:
 *         description: Bad Request — society_id or org_id missing
 *       500:
 *         description: Server error
 */
router.get("/Complaint/GetAll", controller.getAll);

/* ======================= GET BY ID ======================= */
/**
 * @swagger
 * /Complaint/GetById/{id}:
 *   get:
 *     summary: Get complaint by ID
 *     tags: [Complaint]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The complaint ID
 *     responses:
 *       200:
 *         description: Complaint details
 *       404:
 *         description: Complaint not found
 */
router.get("/Complaint/GetById/:id", controller.getById);

/* ======================= CREATE ======================= */
/**
 * @swagger
 * /Complaint/Create:
 *   post:
 *     summary: Create a new complaint with an optional image
 *     tags: [Complaint]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - flat_id
 *               - title
 *               - description
 *               - category_id
 *               - priority_id
 *               - status_id
 *             properties:
 *               flat_id:
 *                 type: integer
 *               owner_id:
 *                 type: integer
 *               tenant_id:
 *                 type: integer
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               category_id:
 *                 type: integer
 *               priority_id:
 *                 type: integer
 *               status_id:
 *                 type: integer
 *               attachment_url:
 *                 type: string
 *                 format: binary
 *                 description: Image attachment for the complaint
 *     responses:
 *       200:
 *         description: Complaint created successfully
 *       400:
 *         description: Invalid input data
 */
router.post(
  "/Complaint/Create",
  upload.single("attachment_url"),
  controller.create
);

/* ======================= UPDATE ======================= */
/**
 * @swagger
 * /Complaint/Update/{id}:
 *   put:
 *     summary: Update basic info of a complaint
 *     tags: [Complaint]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               category_id:
 *                 type: integer
 *               priority_id:
 *                 type: integer
 *               status_id:
 *                 type: integer
 *               attachment_url:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Complaint updated successfully
 *       404:
 *         description: Complaint not found
 */
router.put(
  "/Complaint/Update/:id",
  upload.single("attachment_url"),
  controller.update
);

/* ======================= ASSIGN ======================= */
/**
 * @swagger
 * /Complaint/Assign/{id}:
 *   patch:
 *     summary: Assign complaint to a staff member
 *     tags: [Complaint]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - assigned_staff_id
 *               - status_id
 *             properties:
 *               assigned_staff_id:
 *                 type: integer
 *               status_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Staff assigned successfully
 */
router.patch("/Complaint/Assign/:id", controller.assign);

/* ======================= RESOLVE ======================= */
/**
 * @swagger
 * /Complaint/Resolve/{id}:
 *   patch:
 *     summary: Resolve a complaint
 *     tags: [Complaint]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - resolution_note
 *               - status_id
 *             properties:
 *               resolution_note:
 *                 type: string
 *               status_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Complaint resolved successfully
 */
router.patch("/Complaint/Resolve/:id", controller.resolve);

/* ======================= RATE ======================= */
/**
 * @swagger
 * /Complaint/Rate/{id}:
 *   patch:
 *     summary: Rate a resolved complaint
 *     tags: [Complaint]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rating
 *             properties:
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *     responses:
 *       200:
 *         description: Rating submitted successfully
 */
router.patch("/Complaint/Rate/:id", controller.rate);

module.exports = router;