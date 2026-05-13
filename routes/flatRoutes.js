const express = require("express");
const router = express.Router();
const controller = require("../controllers/flatController");


/**
 * @swagger
 * tags:
 *   name: Flat Master
 *   description: Flat management APIs
 */


/* ======================= GET ALL ======================= */
/**
 * @swagger
 * /Flat/GetAll:
 *   get:
 *     summary: Get all flats by society
 *     tags: [Flat Master]
 *     parameters:
 *       - in: query
 *         name: society_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Flat list fetched successfully
 */
router.get("/Flat/GetAll", controller.getAll);


/* ======================= GET BY ID ======================= */
/**
 * @swagger
 * /Flat/GetById/{id}:
 *   get:
 *     summary: Get flat by ID
 *     tags: [Flat Master]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Flat fetched successfully
 */
router.get("/Flat/GetById/:id", controller.getById);


/* ======================= CREATE ======================= */
/**
 * @swagger
 * /Flat/Create:
 *   post:
 *     summary: Create flat
 *     tags: [Flat Master]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               floor_id:
 *                 type: integer
 *               block_id:
 *                 type: integer
 *               flat_number:
 *                 type: string
 *               flat_type:
 *                 type: integer
 *               area_sqft:
 *                 type: number
 *               bedrooms:
 *                 type: integer
 *               bathrooms:
 *                 type: integer
 *               balconies:
 *                 type: integer
 *               facing_id:
 *                 type: integer
 *               status_id:
 *                 type: integer
 *               is_corner_flat:
 *                 type: boolean
 *               monthly_maintenance:
 *                 type: number
 *     responses:
 *       200:
 *         description: Flat created successfully
 */
router.post("/Flat/Create", controller.create);


/* ======================= UPDATE ======================= */
/**
 * @swagger
 * /Flat/Update:
 *   put:
 *     summary: Update flat
 *     tags: [Flat Master]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               flat_id:
 *                 type: integer
 *               floor_id:
 *                 type: integer
 *               block_id:
 *                 type: integer
 *               flat_number:
 *                 type: string
 *               flat_type:
 *                 type: integer
 *               area_sqft:
 *                 type: number
 *               bedrooms:
 *                 type: integer
 *               bathrooms:
 *                 type: integer
 *               balconies:
 *                 type: integer
 *               facing_id:
 *                 type: integer
 *               status_id:
 *                 type: integer
 *               is_corner_flat:
 *                 type: boolean
 *               monthly_maintenance:
 *                 type: number
 *     responses:
 *       200:
 *         description: Flat updated successfully
 */
router.put("/Flat/Update", controller.update);


/* ======================= DELETE ======================= */
/**
 * @swagger
 * /Flat/Delete/{id}:
 *   delete:
 *     summary: Delete flat
 *     tags: [Flat Master]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Flat deleted successfully
 */
router.delete("/Flat/Delete/:id", controller.remove);


module.exports = router;