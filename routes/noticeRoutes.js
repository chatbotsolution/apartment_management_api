const express = require("express");
const router = express.Router();
const controller = require("../controllers/noticeController");

/**
 * @swagger
 * tags:
 *   name: Notice
 *   description: Notice Management APIs
 */


/* ======================= GET ALL ======================= */
/**
 * @swagger
 * /Notice/GetAll:
 *   get:
 *     summary: Get all notices by single or multiple societies
 *     tags: [Notice]
 *     parameters:
 *       - in: query
 *         name: society_id
 *         required: true
 *         schema:
 *           type: string
 *           example: "26,25"
 *         description: Pass a single society ID (e.g., "25") or a comma-separated list of IDs (e.g., "26,25")
 *     responses:
 *       200:
 *         description: Notices fetched successfully
 */
router.get("/Notice/GetAll", controller.getAll);

/* ======================= GET BY ID ======================= */
/**
 * @swagger
 * /Notice/GetById/{id}:
 *   get:
 *     summary: Get notice by ID
 *     tags: [Notice]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Notice fetched successfully
 */
router.get("/Notice/GetById/:id", controller.getById);


/* ======================= CREATE ======================= */
/**
 * @swagger
 * /Notice/Create:
 *   post:
 *     summary: Create new notice
 *     tags: [Notice]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Society_Id:
 *                 type: integer
 *               Posted_By_Staff_Id:
 *                 type: integer
 *               Title:
 *                 type: string
 *               Body:
 *                 type: string
 *               Category_Id:
 *                 type: integer
 *               Target_Audience_Id:
 *                 type: integer
 *               Valid_Until:
 *                 type: string
 *                 format: date
 *               Is_Pinned:
 *                 type: boolean
 *               Attachment_Url:
 *                 type: string
 *     responses:
 *       200:
 *         description: Notice created successfully
 */
router.post("/Notice/Create", controller.create);


/* ======================= UPDATE ======================= */
/**
 * @swagger
 * /Notice/Update:
 *   put:
 *     summary: Update notice
 *     tags: [Notice]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Notice_Id:
 *                 type: integer
 *               Society_Id:
 *                 type: integer
 *               Posted_By_Staff_Id:
 *                 type: integer
 *               Title:
 *                 type: string
 *               Body:
 *                 type: string
 *               Category_Id:
 *                 type: integer
 *               Target_Audience_Id:
 *                 type: integer
 *               Valid_Until:
 *                 type: string
 *                 format: date
 *               Is_Pinned:
 *                 type: boolean
 *               Attachment_Url:
 *                 type: string
 *     responses:
 *       200:
 *         description: Notice updated successfully
 */
router.put("/Notice/Update", controller.update);


/* ======================= DELETE ======================= */
/**
 * @swagger
 * /Notice/Delete/{id}:
 *   delete:
 *     summary: Delete notice
 *     tags: [Notice]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Notice deleted successfully
 */
router.delete("/Notice/Delete/:id", controller.remove);

module.exports = router;