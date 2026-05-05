const express = require("express");
const router = express.Router();
const controller = require("../controllers/staffController");


/* ======================= TAG ======================= */
/**
 * @swagger
 * tags:
 *   name: Staff Master
 *   description: Staff management APIs
 */


/* ======================= INSERT ======================= */
/**
 * @swagger
 * /Staff/Insert:
 *   post:
 *     summary: Create staff
 *     tags: [Staff Master]
 */
router.post("/Staff/Insert", controller.insert);


/* ======================= UPDATE ======================= */
/**
 * @swagger
 * /Staff/Update:
 *   put:
 *     summary: Update staff
 *     tags: [Staff Master]
 */
router.put("/Staff/Update", controller.update);


/* ======================= DELETE ======================= */
/**
 * @swagger
 * /Staff/Delete:
 *   post:
 *     summary: Soft delete staff
 *     tags: [Staff Master]
 */
router.post("/Staff/Delete", controller.remove);


/* ======================= GET BY ID ======================= */
/**
 * @swagger
 * /Staff/GetById/{id}:
 *   get:
 *     summary: Get staff by id
 *     tags: [Staff Master]
 */
router.get("/Staff/GetById/:id", controller.getById);


/* ======================= GET ALL ======================= */
/**
 * @swagger
 * /Staff/GetAll:
 *   get:
 *     summary: Get all staff by society
 *     tags: [Staff Master]
 */
router.get("/Staff/GetAll", controller.getAll);


/* ======================= SEARCH ======================= */
/**
 * @swagger
 * /Staff/Search:
 *   get:
 *     summary: Search staff
 *     tags: [Staff Master]
 */
router.get("/Staff/Search", controller.search);


module.exports = router;