const express = require("express");
const router = express.Router();
const controller = require("../controllers/societyController");


/* ======================= TAG ======================= */
/**
 * @swagger
 * tags:
 *   name: Society Master
 *   description: Society management APIs
 */


/* ======================= INSERT ======================= */
/**
 * @swagger
 * /Society/Insert:
 *   post:
 *     summary: Create new society
 *     tags: [Society Master]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               city:
 *                 type: integer
 *               state:
 *                 type: integer
 *               pincode:
 *                 type: string
 *               registrationNo:
 *                 type: string
 *               establishedDate:
 *                 type: string
 *                 format: date
 *               contactEmail:
 *                 type: string
 *               contactPhone:
 *                 type: string
 *               totalBlocks:
 *                 type: integer
 *               totalUnits:
 *                 type: integer
 *               website:
 *                 type: string
 */
router.post("/Society/Insert", controller.insert);


/* ======================= UPDATE ======================= */
/**
 * @swagger
 * /Society/Update:
 *   put:
 *     summary: Update society details
 *     tags: [Society Master]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               societyId:
 *                 type: integer
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               city:
 *                 type: integer
 *               state:
 *                 type: integer
 *               pincode:
 *                 type: string
 *               registrationNo:
 *                 type: string
 *               establishedDate:
 *                 type: string
 *                 format: date
 *               contactEmail:
 *                 type: string
 *               contactPhone:
 *                 type: string
 *               totalBlocks:
 *                 type: integer
 *               totalUnits:
 *                 type: integer
 *               website:
 *                 type: string
 */
router.put("/Society/Update", controller.update);


/* ======================= DELETE (SOFT) ======================= */
/**
 * @swagger
 * /Society/Delete:
 *   post:
 *     summary: Soft delete society
 *     tags: [Society Master]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               societyId:
 *                 type: integer
 */
router.post("/Society/Delete", controller.remove);


/* ======================= GET BY ID ======================= */
/**
 * @swagger
 * /Society/GetById/{id}:
 *   get:
 *     summary: Get society by id
 *     tags: [Society Master]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router.get("/Society/GetById/:id", controller.getById);


/* ======================= GET ALL ======================= */
/**
 * @swagger
 * /Society/GetAll:
 *   get:
 *     summary: Get all active societies
 *     tags: [Society Master]
 */
router.get("/Society/GetAll", controller.getAll);


module.exports = router;