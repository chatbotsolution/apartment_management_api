const express = require("express");
const router = express.Router();
const controller = require("../controllers/floorController");


/* ======================= GET ALL ======================= */
/**
 * @swagger
 * /Floor/GetAll:
 *   get:
 *     summary: Get all floors by society
 *     tags: [Floor]
 *     parameters:
 *       - in: query
 *         name: society_id
 *         required: true
 *         schema:
 *           type: integer
 */
router.get("/Floor/GetAll", controller.getAll);


/* ======================= GET BY ID ======================= */
/**
 * @swagger
 * /Floor/GetById/{id}:
 *   get:
 *     summary: Get floor by ID
 *     tags: [Floor]
 */
router.get("/Floor/GetById/:id", controller.getById);


/* ======================= CREATE ======================= */
/**
 * @swagger
 * /Floor/Create:
 *   post:
 *     summary: Create floor
 *     tags: [Floor]
 */
router.post("/Floor/Create", controller.create);


/* ======================= UPDATE ======================= */
/**
 * @swagger
 * /Floor/Update:
 *   put:
 *     summary: Update floor
 *     tags: [Floor]
 */
router.put("/Floor/Update", controller.update);


/* ======================= DELETE ======================= */
/**
 * @swagger
 * /Floor/Delete/{id}:
 *   delete:
 *     summary: Delete floor
 *     tags: [Floor]
 */
router.delete("/Floor/Delete/:id", controller.remove);

module.exports = router;