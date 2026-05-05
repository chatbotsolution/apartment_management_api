const express = require("express");
const router = express.Router();
const controller = require("../controllers/visitorController");


/* ======================= TAG ======================= */
/**
 * @swagger
 * tags:
 *   name: Visitor Management
 *   description: Visitor entry & security APIs
 */


/* ======================= CHECK-IN ======================= */
/**
 * @swagger
 * /Visitor/CheckIn:
 *   post:
 *     summary: Visitor check-in
 *     tags: [Visitor Management]
 */
router.post("/Visitor/CheckIn", controller.checkIn);


/* ======================= CHECK-OUT ======================= */
/**
 * @swagger
 * /Visitor/CheckOut:
 *   post:
 *     summary: Visitor check-out
 *     tags: [Visitor Management]
 */
router.post("/Visitor/CheckOut", controller.checkOut);


/* ======================= UPDATE ======================= */
/**
 * @swagger
 * /Visitor/Update:
 *   put:
 *     summary: Update visitor details
 *     tags: [Visitor Management]
 */
router.put("/Visitor/Update", controller.update);


/* ======================= GET BY ID ======================= */
/**
 * @swagger
 * /Visitor/GetById/{id}:
 *   get:
 *     summary: Get visitor by id
 *     tags: [Visitor Management]
 */
router.get("/Visitor/GetById/:id", controller.getById);


/* ======================= TODAY ======================= */
/**
 * @swagger
 * /Visitor/GetToday:
 *   get:
 *     summary: Today's visitors
 *     tags: [Visitor Management]
 */
router.get("/Visitor/GetToday", controller.getToday);


/* ======================= ACTIVE ======================= */
/**
 * @swagger
 * /Visitor/GetActive:
 *   get:
 *     summary: Active visitors inside society
 *     tags: [Visitor Management]
 */
router.get("/Visitor/GetActive", controller.getActive);


/* ======================= SEARCH ======================= */
/**
 * @swagger
 * /Visitor/Search:
 *   get:
 *     summary: Search visitors
 *     tags: [Visitor Management]
 */
router.get("/Visitor/Search", controller.search);


module.exports = router;