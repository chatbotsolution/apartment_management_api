const express = require("express");
const router = express.Router();
const controller = require("../controllers/visitorController");

/**
 * @swagger
 * tags:
 *   name: Visitor Master
 */


/* ======================= GET ALL ======================= */
/**
 * @swagger
 * /VisitorMaster/GetAllVisitor:
 *   get:
 *     summary: Get all visitors
 *     tags: [Visitor Master]
 *     responses:
 *       200:
 *         description: Visitor list
 */
router.get("/VisitorMaster/GetAllVisitor", controller.getAll);


/* ======================= GET BY ID ======================= */
/**
 * @swagger
 * /VisitorMaster/GetVisitorById/{id}:
 *   get:
 *     summary: Get visitor by ID
 *     tags: [Visitor Master]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Visitor details
 */
router.get("/VisitorMaster/GetVisitorById/:id", controller.getById);


/* ======================= GET BY FLAT ======================= */
/**
 * @swagger
 * /VisitorMaster/GetVisitorByFlat/{flatId}:
 *   get:
 *     summary: Get visitors by Flat ID
 *     tags: [Visitor Master]
 *     parameters:
 *       - in: path
 *         name: flatId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Visitor list for a flat
 */
router.get("/VisitorMaster/GetVisitorByFlat/:flatId", controller.getByFlat);


/* ======================= CREATE ======================= */
/**
 * @swagger
 * /VisitorMaster/CreateVisitor:
 *   post:
 *     summary: Create visitor entry
 *     tags: [Visitor Master]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Name:
 *                 type: string
 *               Mobile:
 *                 type: string
 *               Flat_Id:
 *                 type: integer
 *               Entry_Time:
 *                 type: string
 *               Purpose:
 *                 type: string
 *     responses:
 *       200:
 *         description: Visitor created successfully
 */
router.post("/VisitorMaster/CreateVisitor", controller.create);


/* ======================= UPDATE ======================= */
/**
 * @swagger
 * /VisitorMaster/UpdateVisitor:
 *   put:
 *     summary: Update visitor
 *     tags: [Visitor Master]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Visitor_Id:
 *                 type: integer
 *               Name:
 *                 type: string
 *               Mobile:
 *                 type: string
 *               Flat_Id:
 *                 type: integer
 *               Purpose:
 *                 type: string
 *     responses:
 *       200:
 *         description: Visitor updated successfully
 */
router.put("/VisitorMaster/UpdateVisitor", controller.update);


/* ======================= EXIT ======================= */
/**
 * @swagger
 * /VisitorMaster/ExitVisitor:
 *   put:
 *     summary: Mark visitor exit
 *     tags: [Visitor Master]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Visitor_Id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Visitor exit recorded
 */
router.put("/VisitorMaster/ExitVisitor", controller.exitVisitor);

module.exports = router;