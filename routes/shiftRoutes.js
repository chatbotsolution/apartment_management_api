const express = require("express");
const router = express.Router();
const controller = require("../controllers/shiftController");

/**
 * @swagger
 * tags:
 *   name: Shift Master
 */

/* ======================= GET ALL ======================= */
/**
 * @swagger
 * /Shift/GetAll:
 *   get:
 *     summary: Get all shifts
 *     tags: [Shift Master]
 *     responses:
 *       200:
 *         description: Shift list
 */
router.get("/Shift/GetAll", controller.getAll);

/* ======================= GET BY ID ======================= */
/**
 * @swagger
 * /Shift/GetById/{id}:
 *   get:
 *     summary: Get shift by ID
 *     tags: [Shift Master]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Shift details
 */
router.get("/Shift/GetById/:id", controller.getById);

/* ======================= CREATE ======================= */
/**
 * @swagger
 * /Shift/Create:
 *   post:
 *     summary: Create new shift
 *     tags: [Shift Master]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               shiftName:
 *                 type: string
 *               shiftHours:
 *                 type: string
 *                 example: "08:00:00"
 *               userId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Shift created
 */
router.post("/Shift/Create", controller.create);

/* ======================= UPDATE ======================= */
/**
 * @swagger
 * /Shift/Update:
 *   put:
 *     summary: Update shift
 *     tags: [Shift Master]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               shiftName:
 *                 type: string
 *               shiftHours:
 *                 type: string
 *                 example: "08:00:00"
 *               userId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Shift updated
 */
router.put("/Shift/Update", controller.update);

/* ======================= DELETE ======================= */
/**
 * @swagger
 * /Shift/Delete/{id}:
 *   delete:
 *     summary: Soft delete shift
 *     tags: [Shift Master]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Shift deleted
 */
router.delete("/Shift/Delete/:id", controller.remove);

module.exports = router;
