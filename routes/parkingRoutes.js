const express = require("express");
const router = express.Router();
const controller = require("../controllers/parkingController");


/* ======================= ASSIGN ======================= */
/**
 * @swagger
 * /Parking/Assign:
 *   post:
 *     summary: Assign parking slot
 *     tags: [Parking Allotment]
 */
router.post("/Parking/Assign", controller.assign);


/* ======================= UPDATE ======================= */
/**
 * @swagger
 * /Parking/Update:
 *   put:
 *     summary: Update parking allotment
 *     tags: [Parking Allotment]
 */
router.put("/Parking/Update", controller.update);


/* ======================= RELEASE ======================= */
/**
 * @swagger
 * /Parking/Release:
 *   post:
 *     summary: Release parking slot
 *     tags: [Parking Allotment]
 */
router.post("/Parking/Release", controller.release);


/* ======================= GET BY ID ======================= */
/**
 * @swagger
 * /Parking/GetById/{id}:
 *   get:
 *     summary: Get parking allotment by id
 *     tags: [Parking Allotment]
 */
router.get("/Parking/GetById/:id", controller.getById);


/* ======================= GET ALL ======================= */
/**
 * @swagger
 * /Parking/GetAll:
 *   get:
 *     summary: Get all active parking allotments
 *     tags: [Parking Allotment]
 */
router.get("/Parking/GetAll", controller.getAll);


/* ======================= HISTORY ======================= */
/**
 * @swagger
 * /Parking/GetHistory:
 *   get:
 *     summary: Get parking history by slot
 *     tags: [Parking Allotment]
 */
router.get("/Parking/GetHistory", controller.getHistoryBySlot);


module.exports = router;