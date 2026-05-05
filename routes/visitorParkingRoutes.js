const express = require("express");
const router = express.Router();
const controller = require("../controllers/visitorParkingController");


/* ======================= TAG ======================= */
/**
 * @swagger
 * tags:
 *   name: Visitor Parking
 *   description: Visitor parking slot management
 */


/* ======================= ASSIGN SLOT ======================= */
/**
 * @swagger
 * /VisitorParking/Assign:
 *   post:
 *     summary: Assign parking slot to visitor
 *     tags: [Visitor Parking]
 */
router.post("/VisitorParking/Assign", controller.assign);


/* ======================= RELEASE SLOT ======================= */
/**
 * @swagger
 * /VisitorParking/Release:
 *   post:
 *     summary: Release visitor parking slot
 *     tags: [Visitor Parking]
 */
router.post("/VisitorParking/Release", controller.release);


/* ======================= GET ACTIVE ======================= */
/**
 * @swagger
 * /VisitorParking/GetActive:
 *   get:
 *     summary: Get active visitor parking
 *     tags: [Visitor Parking]
 */
router.get("/VisitorParking/GetActive", controller.getActive);


module.exports = router;