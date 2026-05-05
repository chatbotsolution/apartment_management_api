const express = require("express");
const router = express.Router();
const controller = require("../controllers/tenantController");


/* ======================= TAG ======================= */
/**
 * @swagger
 * tags:
 *   name: Tenant Master
 *   description: Tenant management APIs
 */


/* ======================= INSERT ======================= */
/**
 * @swagger
 * /Tenant/Insert:
 *   post:
 *     summary: Create new tenant
 *     tags: [Tenant Master]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               flatId:
 *                 type: integer
 *               ownerId:
 *                 type: integer
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               alternatePhone:
 *                 type: string
 *               aadhaarNumber:
 *                 type: string
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *               genderId:
 *                 type: integer
 *               occupation:
 *                 type: integer
 *               employerName:
 *                 type: string
 *               totalOccupants:
 *                 type: integer
 *               leaseStart:
 *                 type: string
 *                 format: date
 *               leaseEnd:
 *                 type: string
 *                 format: date
 *               monthlyRent:
 *                 type: number
 *               securityDeposit:
 *                 type: number
 *               rentDueDay:
 *                 type: integer
 *               isActive:
 *                 type: boolean
 *               permanentAddress:
 *                 type: string
 *               emergencyContactName:
 *                 type: string
 *               emergencyContactPhone:
 *                 type: string
 *               profilePhotoUrl:
 *                 type: string
 *               agreementDocUrl:
 *                 type: string
 *               policeVerification:
 *                 type: boolean
 *               society:
 *                 type: integer
 */
router.post("/Tenant/Insert", controller.insert);


/* ======================= UPDATE ======================= */
/**
 * @swagger
 * /Tenant/Update:
 *   put:
 *     summary: Update tenant details
 *     tags: [Tenant Master]
 */
router.put("/Tenant/Update", controller.update);


/* ======================= DELETE ======================= */
/**
 * @swagger
 * /Tenant/Delete:
 *   post:
 *     summary: Soft delete tenant
 *     tags: [Tenant Master]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tenantId:
 *                 type: integer
 */
router.post("/Tenant/Delete", controller.remove);


/* ======================= GET BY ID ======================= */
/**
 * @swagger
 * /Tenant/GetById/{id}:
 *   get:
 *     summary: Get tenant by id
 *     tags: [Tenant Master]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router.get("/Tenant/GetById/:id", controller.getById);


/* ======================= GET ALL ======================= */
/**
 * @swagger
 * /Tenant/GetAll:
 *   get:
 *     summary: Get all tenants by society
 *     tags: [Tenant Master]
 *     parameters:
 *       - in: query
 *         name: society
 *         required: true
 *         schema:
 *           type: integer
 */
router.get("/Tenant/GetAll", controller.getAll);


/* ======================= SEARCH ======================= */
/**
 * @swagger
 * /Tenant/Search:
 *   get:
 *     summary: Search tenants
 *     tags: [Tenant Master]
 *     parameters:
 *       - in: query
 *         name: society
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 */
router.get("/Tenant/Search", controller.search);


module.exports = router;