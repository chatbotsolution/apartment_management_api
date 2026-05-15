const express = require("express");
const router = express.Router();
const controller = require("../controllers/societyController");


/**
 * @swagger
 * tags:
 *   name: Society Master
 *   description: Society management APIs
 */


/* ======================= INSERT ======================= */
/**
 * @swagger
 * /Society/Insert:
 *   post:
 *     summary: Create new society
 *     tags: [Society Master]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               city:
 *                 type: integer
 *               state:
 *                 type: integer
 *               pincode:
 *                 type: string
 *               registrationNo:
 *                 type: string
 *               establishedDate:
 *                 type: string
 *                 format: date
 *               contactEmail:
 *                 type: string
 *               contactPhone:
 *                 type: string
 *               totalBlocks:
 *                 type: integer
 *               website:
 *                 type: string
 *               orgId:
 *                 type: integer
 *               societyTypeId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Society created successfully
 */
router.post("/Society/Insert", controller.insert);


/* ======================= UPDATE ======================= */
/**
 * @swagger
 * /Society/Update:
 *   put:
 *     summary: Update society details
 *     tags: [Society Master]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               societyId:
 *                 type: integer
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               city:
 *                 type: integer
 *               state:
 *                 type: integer
 *               pincode:
 *                 type: string
 *               registrationNo:
 *                 type: string
 *               establishedDate:
 *                 type: string
 *                 format: date
 *               contactEmail:
 *                 type: string
 *               contactPhone:
 *                 type: string
 *               totalBlocks:
 *                 type: integer
 *               website:
 *                 type: string
 *               orgId:
 *                 type: integer
 *               societyTypeId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Society updated successfully
 */
router.put("/Society/Update", controller.update);


/* ======================= DELETE ======================= */
/**
 * @swagger
 * /Society/Delete:
 *   post:
 *     summary: Soft delete society
 *     tags: [Society Master]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               societyId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Society deleted successfully
 */
router.post("/Society/Delete", controller.remove);


/* ======================= GET BY ID ======================= */
/**
 * @swagger
 * /Society/GetById/{id}:
 *   get:
 *     summary: Get society by ID
 *     tags: [Society Master]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Society details fetched successfully
 */
router.get("/Society/GetById/:id", controller.getById);


/* ======================= GET ALL ======================= */
/**
 * @swagger
 * /Society/GetAll:
 *   get:
 *     summary: Get all active societies
 *     tags: [Society Master]
 *     responses:
 *       200:
 *         description: Society list fetched successfully
 */
router.get("/Society/GetAll", controller.getAll);

/* ======================= COUNTRY LIST ======================= */
/**
 * @swagger
 * /Dropdown/Country:
 *   get:
 *     summary: Get Country list
 *     description: Returns all active countries from country_master via SP_Common (GET_COUNTRY).
 *     tags: [Dropdown Master]
 *     responses:
 *       200:
 *         description: Country list fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: India
 *                       code:
 *                         type: string
 *                         example: IN
 *                       Currency_Name:
 *                         type: string
 *                         example: Rupee
 *                       Currency_Code:
 *                         type: string
 *                         example: INR
 *                       ISD_Code:
 *                         type: string
 *                         example: +91
 *       500:
 *         description: Internal server error
 */
router.get("/Dropdown/Country", controller.getCountries);


/* ======================= STATE LIST BY COUNTRY ======================= */
/**
 * @swagger
 * /Dropdown/State:
 *   get:
 *     summary: Get State list by Country
 *     description: Returns all active states from state_master via SP_Common (GET_STATE_BY_COUNTRY).
 *     tags: [Dropdown Master]
 *     parameters:
 *       - in: query
 *         name: country_id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Country Id to fetch state list.
 *     responses:
 *       200:
 *         description: State list fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: Maharashtra
 *                       code:
 *                         type: string
 *                         example: MH
 *                       Country_Id:
 *                         type: integer
 *                         example: 1
 *       400:
 *         description: country_id is required
 *       500:
 *         description: Internal server error
 */
router.get("/Dropdown/State", controller.getStates);


/* ======================= DISTRICT LIST BY STATE ======================= */
/**
 * @swagger
 * /Dropdown/District:
 *   get:
 *     summary: Get District list by State
 *     description: Returns all active districts from district_master via SP_Common (GET_DISTRICT_BY_STATE).
 *     tags: [Dropdown Master]
 *     parameters:
 *       - in: query
 *         name: state_id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: State Id to fetch district list.
 *     responses:
 *       200:
 *         description: District list fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: Pune
 *                       code:
 *                         type: string
 *                         example: PUN
 *                       State_Id:
 *                         type: integer
 *                         example: 1
 *       400:
 *         description: state_id is required
 *       500:
 *         description: Internal server error
 */
router.get("/Dropdown/District", controller.getDistrictsByState);

module.exports = router;