const express = require("express");
const router = express.Router();
const controller = require("../controllers/vehicleController");


/* ======================= TAG ======================= */
/**
 * @swagger
 * tags:
 *   name: Vehicle Master
 *   description: Vehicle management APIs
 */


/* ======================= INSERT ======================= */
/**
 * @swagger
 * /Vehicle/Insert:
 *   post:
 *     summary: Add vehicle
 *     tags: [Vehicle Master]
 */
router.post("/Vehicle/Insert", controller.insert);


/* ======================= UPDATE ======================= */
/**
 * @swagger
 * /Vehicle/Update:
 *   put:
 *     summary: Update vehicle
 *     tags: [Vehicle Master]
 */
router.put("/Vehicle/Update", controller.update);


/* ======================= DELETE ======================= */
/**
 * @swagger
 * /Vehicle/Delete:
 *   post:
 *     summary: Soft delete vehicle
 *     tags: [Vehicle Master]
 */
router.post("/Vehicle/Delete", controller.remove);


/* ======================= GET BY ID ======================= */
/**
 * @swagger
 * /Vehicle/GetById/{id}:
 *   get:
 *     summary: Get vehicle by id
 *     tags: [Vehicle Master]
 */
router.get("/Vehicle/GetById/:id", controller.getById);


/* ======================= GET ALL ======================= */
/**
 * @swagger
 * /Vehicle/GetAll:
 *   get:
 *     summary: Get all vehicles
 *     tags: [Vehicle Master]
 */
router.get("/Vehicle/GetAll", controller.getAll);


/* ======================= SEARCH ======================= */
/**
 * @swagger
 * /Vehicle/Search:
 *   get:
 *     summary: Search vehicles
 *     tags: [Vehicle Master]
 */
router.get("/Vehicle/Search", controller.search);


module.exports = router;