const express = require("express");
const router = express.Router();
const controller = require("../controllers/block.controller");


/**
 * @swagger
 * tags:
 *   name: Block Master
 *   description: Block management APIs
 */


/* ======================= GET ALL ======================= */
/**
 * @swagger
 * /Block/GetAll:
 *   get:
 *     summary: Get all blocks by society
 *     tags: [Block Master]
 *     parameters:
 *       - in: query
 *         name: society_id
 *         required: true
 *         schema:
 *           type: integer
 */
router.get("/Block/GetAll", controller.getAll);


/* ======================= GET BY ID ======================= */
/**
 * @swagger
 * /Block/GetById/{id}:
 *   get:
 *     summary: Get block by ID
 *     tags: [Block Master]
 */
router.get("/Block/GetById/:id", controller.getById);


/* ======================= CREATE ======================= */
/**
 * @swagger
 * /Block/Create:
 *   post:
 *     summary: Create block
 *     tags: [Block Master]
 */
router.post("/Block/Create", controller.create);


/* ======================= UPDATE ======================= */
/**
 * @swagger
 * /Block/Update:
 *   put:
 *     summary: Update block
 *     tags: [Block Master]
 */
router.put("/Block/Update", controller.update);


/* ======================= DELETE ======================= */
/**
 * @swagger
 * /Block/Delete/{id}:
 *   delete:
 *     summary: Delete block
 *     tags: [Block Master]
 */
router.delete("/Block/Delete/:id", controller.remove);


module.exports = router;