const express = require("express");
const router = express.Router();
const controller = require("../controllers/departmentController");

/* ======================= GET ALL ======================= */
/**
 * @swagger
 * /Department/GetAll:
 *   get:
 *     summary: Get all departments
 *     tags: [Department Master]
 */
router.get("/Department/GetAll", controller.getAll);

/* ======================= GET BY ID ======================= */
/**
 * @swagger
 * /Department/GetById/{id}:
 *   get:
 *     summary: Get department by ID
 *     tags: [Department Master]
 */
router.get("/Department/GetById/:id", controller.getById);

/* ======================= CREATE ======================= */
/**
 * @swagger
 * /Department/Create:
 *   post:
 *     summary: Create department
 *     tags: [Department Master]
 */
router.post("/Department/Create", controller.create);

/* ======================= UPDATE ======================= */
/**
 * @swagger
 * /Department/Update:
 *   put:
 *     summary: Update department
 *     tags: [Department Master]
 */
router.put("/Department/Update", controller.update);

/* ======================= DELETE ======================= */
/**
 * @swagger
 * /Department/Delete/{id}:
 *   delete:
 *     summary: Delete department (soft delete)
 *     tags: [Department Master]
 */
router.delete("/Department/Delete/:id", controller.remove);

module.exports = router;