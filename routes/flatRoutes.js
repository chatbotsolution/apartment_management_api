const express = require("express");
const router = express.Router();
const controller = require("../controllers/flatController");


/* ======================= GET ALL ======================= */
/**
 * @swagger
 * /Flat/GetAll:
 *   get:
 *     summary: Get all flats by society
 *     tags: [Flat]
 *     parameters:
 *       - in: query
 *         name: society_id
 *         required: true
 *         schema:
 *           type: integer
 */
router.get("/Flat/GetAll", controller.getAll);


/* ======================= GET BY ID ======================= */
/**
 * @swagger
 * /Flat/GetById/{id}:
 *   get:
 *     summary: Get flat by ID
 *     tags: [Flat]
 */
router.get("/Flat/GetById/:id", controller.getById);


/* ======================= CREATE ======================= */
/**
 * @swagger
 * /Flat/Create:
 *   post:
 *     summary: Create flat
 *     tags: [Flat]
 */
router.post("/Flat/Create", controller.create);


/* ======================= UPDATE ======================= */
/**
 * @swagger
 * /Flat/Update:
 *   put:
 *     summary: Update flat
 *     tags: [Flat]
 */
router.put("/Flat/Update", controller.update);


/* ======================= DELETE ======================= */
/**
 * @swagger
 * /Flat/Delete/{id}:
 *   delete:
 *     summary: Delete flat
 *     tags: [Flat]
 */
router.delete("/Flat/Delete/:id", controller.remove);

module.exports = router;