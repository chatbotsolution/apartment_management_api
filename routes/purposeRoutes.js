const express = require("express");
const router = express.Router();
const controller = require("../controllers/purposeController");

/**
 * @swagger
 * tags:
 *   name: Purpose Master
 */

/* ======================= GET ALL ======================= */
/**
 * @swagger
 * /Purpose/GetAll:
 *   get:
 *     summary: Get all purposes
 *     tags: [Purpose Master]
 *     responses:
 *       200:
 *         description: Purpose list
 */
router.get("/Purpose/GetAll", controller.getAll);

/* ======================= GET BY ID ======================= */
/**
 * @swagger
 * /Purpose/GetById/{id}:
 *   get:
 *     summary: Get purpose by ID
 *     tags: [Purpose Master]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Purpose details
 */
router.get("/Purpose/GetById/:id", controller.getById);

/* ======================= CREATE ======================= */
/**
 * @swagger
 * /Purpose/Create:
 *   post:
 *     summary: Create new purpose
 *     tags: [Purpose Master]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               purpose:
 *                 type: string
 *               createdBy:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Purpose created
 */
router.post("/Purpose/Create", controller.create);

/* ======================= UPDATE ======================= */
/**
 * @swagger
 * /Purpose/Update:
 *   put:
 *     summary: Update purpose
 *     tags: [Purpose Master]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               purpose:
 *                 type: string
 *               updatedBy:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Purpose updated
 */
router.put("/Purpose/Update", controller.update);

/* ======================= DELETE ======================= */
/**
 * @swagger
 * /Purpose/Delete/{id}:
 *   delete:
 *     summary: Soft delete purpose
 *     tags: [Purpose Master]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Purpose deleted
 */
router.delete("/Purpose/Delete/:id", controller.remove);

module.exports = router;
