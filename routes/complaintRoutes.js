const express = require("express");
const router = express.Router();
const controller = require("../controllers/complaint.controller");

/* ======================= GET ALL ======================= */
/**
 * @swagger
 * /Complaint/GetAll:
 *   get:
 *     summary: Get all complaints
 *     tags: [Complaint]
 */
router.get("/Complaint/GetAll", controller.getAll);

/* ======================= GET BY ID ======================= */
/**
 * @swagger
 * /Complaint/GetById/{id}:
 *   get:
 *     summary: Get complaint by ID
 *     tags: [Complaint]
 */
router.get("/Complaint/GetById/:id", controller.getById);

/* ======================= CREATE ======================= */
/**
 * @swagger
 * /Complaint/Create:
 *   post:
 *     summary: Create complaint
 *     tags: [Complaint]
 */
router.post("/Complaint/Create", controller.create);

/* ======================= UPDATE ======================= */
/**
 * @swagger
 * /Complaint/Update:
 *   put:
 *     summary: Update complaint
 *     tags: [Complaint]
 */
router.put("/Complaint/Update", controller.update);

/* ======================= ASSIGN ======================= */
/**
 * @swagger
 * /Complaint/Assign:
 *   patch:
 *     summary: Assign complaint to staff
 *     tags: [Complaint]
 */
router.patch("/Complaint/Assign", controller.assign);

/* ======================= RESOLVE ======================= */
/**
 * @swagger
 * /Complaint/Resolve:
 *   patch:
 *     summary: Resolve complaint
 *     tags: [Complaint]
 */
router.patch("/Complaint/Resolve", controller.resolve);

/* ======================= RATE ======================= */
/**
 * @swagger
 * /Complaint/Rate:
 *   patch:
 *     summary: Rate complaint
 *     tags: [Complaint]
 */
router.patch("/Complaint/Rate", controller.rate);

module.exports = router;