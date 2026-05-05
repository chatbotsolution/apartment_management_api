const express = require("express");
const router = express.Router();
const controller = require("../controllers/noticeController");


/* ======================= GET ALL ======================= */
/**
 * @swagger
 * /Notice/GetAll:
 *   get:
 *     summary: Get all notices by society
 *     tags: [Notice]
 *     parameters:
 *       - in: query
 *         name: society_id
 *         required: true
 *         schema:
 *           type: integer
 */
router.get("/Notice/GetAll", controller.getAll);


/* ======================= GET BY ID ======================= */
/**
 * @swagger
 * /Notice/GetById/{id}:
 *   get:
 *     summary: Get notice by ID
 *     tags: [Notice]
 */
router.get("/Notice/GetById/:id", controller.getById);


/* ======================= CREATE ======================= */
/**
 * @swagger
 * /Notice/Create:
 *   post:
 *     summary: Create notice
 *     tags: [Notice]
 */
router.post("/Notice/Create", controller.create);


/* ======================= UPDATE ======================= */
/**
 * @swagger
 * /Notice/Update:
 *   put:
 *     summary: Update notice
 *     tags: [Notice]
 */
router.put("/Notice/Update", controller.update);


/* ======================= DELETE ======================= */
/**
 * @swagger
 * /Notice/Delete/{id}:
 *   delete:
 *     summary: Delete notice
 *     tags: [Notice]
 */
router.delete("/Notice/Delete/:id", controller.remove);

module.exports = router;