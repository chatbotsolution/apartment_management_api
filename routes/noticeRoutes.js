const express = require("express");
const router = express.Router();
const controller = require("../controllers/noticeController");

/**
 * @swagger
 * tags:
 *   name: Notice Master
 */


/* ======================= GET ALL ======================= */
/**
 * @swagger
 * /NoticeMaster/GetAllNotice:
 *   get:
 *     summary: Get all notices
 *     tags: [Notice Master]
 *     responses:
 *       200:
 *         description: Notice list
 */
router.get("/NoticeMaster/GetAllNotice", controller.getAll);


/* ======================= GET BY ID ======================= */
/**
 * @swagger
 * /NoticeMaster/GetNoticeById/{id}:
 *   get:
 *     summary: Get notice by ID
 *     tags: [Notice Master]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Notice details
 */
router.get("/NoticeMaster/GetNoticeById/:id", controller.getById);


/* ======================= CREATE ======================= */
/**
 * @swagger
 * /NoticeMaster/CreateNotice:
 *   post:
 *     summary: Create notice
 *     tags: [Notice Master]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Title:
 *                 type: string
 *               Description:
 *                 type: string
 *               Posted_By:
 *                 type: integer
 *               Posted_On:
 *                 type: string
 *               Expiry_Date:
 *                 type: string
 *     responses:
 *       200:
 *         description: Notice created successfully
 */
router.post("/NoticeMaster/CreateNotice", controller.create);


/* ======================= UPDATE ======================= */
/**
 * @swagger
 * /NoticeMaster/UpdateNotice:
 *   put:
 *     summary: Update notice
 *     tags: [Notice Master]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Notice_Id:
 *                 type: integer
 *               Title:
 *                 type: string
 *               Description:
 *                 type: string
 *               Posted_By:
 *                 type: integer
 *               Posted_On:
 *                 type: string
 *               Expiry_Date:
 *                 type: string
 *     responses:
 *       200:
 *         description: Notice updated successfully
 */
router.put("/NoticeMaster/UpdateNotice", controller.update);


/* ======================= DELETE ======================= */
/**
 * @swagger
 * /NoticeMaster/DeleteNotice/{id}:
 *   delete:
 *     summary: Delete notice
 *     tags: [Notice Master]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Notice deleted successfully
 */
router.delete("/NoticeMaster/DeleteNotice/:id", controller.remove);

module.exports = router;