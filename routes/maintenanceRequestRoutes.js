const express = require("express");
const router = express.Router();
const controller = require("../controllers/maintenanceRequestController");


/* ======================= TAG ======================= */
/**
 * @swagger
 * tags:
 *   name: Maintenance Request
 *   description: Society maintenance management APIs
 */


/* ======================= CREATE ======================= */
/**
 * @swagger
 * /Maintenance/Create:
 *   post:
 *     summary: Create maintenance request
 *     tags: [Maintenance Request]
 */
router.post("/Maintenance/Create", controller.create);


/* ======================= UPDATE ======================= */
/**
 * @swagger
 * /Maintenance/Update:
 *   put:
 *     summary: Update maintenance request
 *     tags: [Maintenance Request]
 */
router.put("/Maintenance/Update", controller.update);


/* ======================= ASSIGN ======================= */
/**
 * @swagger
 * /Maintenance/Assign:
 *   post:
 *     summary: Assign staff to request
 *     tags: [Maintenance Request]
 */
router.post("/Maintenance/Assign", controller.assign);


/* ======================= COMPLETE ======================= */
/**
 * @swagger
 * /Maintenance/Complete:
 *   post:
 *     summary: Complete maintenance request
 *     tags: [Maintenance Request]
 */
router.post("/Maintenance/Complete", controller.complete);


/* ======================= GET BY ID ======================= */
/**
 * @swagger
 * /Maintenance/GetById/{id}:
 *   get:
 *     summary: Get request by id
 *     tags: [Maintenance Request]
 */
router.get("/Maintenance/GetById/:id", controller.getById);


/* ======================= GET ALL ======================= */
/**
 * @swagger
 * /Maintenance/GetAll:
 *   get:
 *     summary: Get all maintenance requests
 *     tags: [Maintenance Request]
 */
router.get("/Maintenance/GetAll", controller.getAll);


module.exports = router;