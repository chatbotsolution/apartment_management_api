const express = require("express");
const router = express.Router();
const controller = require("../controllers/designationController");

/* ======================= GET ALL ======================= */
/**
 * @swagger
 * /Designation/GetAll:
 *   get:
 *     summary: Get all designations
 *     tags: [Designation Master]
 */
router.get("/Designation/GetAll", controller.getAll);

/* ======================= GET BY ID ======================= */
/**
 * @swagger
 * /Designation/GetById/{id}:
 *   get:
 *     summary: Get designation by ID
 *     tags: [Designation Master]
 */
router.get("/Designation/GetById/:id", controller.getById);

/* ======================= CREATE ======================= */
/**
 * @swagger
 * /Designation/Create:
 *   post:
 *     summary: Create designation
 *     tags: [Designation Master]
 */
router.post("/Designation/Create", controller.create);

/* ======================= UPDATE ======================= */
/**
 * @swagger
 * /Designation/Update:
 *   put:
 *     summary: Update designation
 *     tags: [Designation Master]
 */
router.put("/Designation/Update", controller.update);

/* ======================= DELETE ======================= */
/**
 * @swagger
 * /Designation/Delete/{id}:
 *   delete:
 *     summary: Delete designation (soft delete)
 *     tags: [Designation Master]
 */
router.delete("/Designation/Delete/:id", controller.remove);

module.exports = router;