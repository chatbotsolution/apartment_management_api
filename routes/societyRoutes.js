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
 *               totalUnits:
 *                 type: integer
 *               website:
 *                 type: string
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
 *               totalUnits:
 *                 type: integer
 *               website:
 *                 type: string
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

/**
 * @swagger
 * /Dropdown/State:
 *   get:
 *     summary: Get State list
 *     description: Returns all active states from state_master via SP_Common (GET_STATE).
 *     tags: [Dropdown Master]
 *     responses:
 *       200:
 *         description: List of states
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
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/Dropdown/State", controller.getStates);

/**
 * @swagger
 * /Dropdown/District:
 *   get:
 *     summary: Get District list by State
 *     description: Returns all active districts under a given state_id from district_master via SP_Common (GET_DISTRICT_BY_STATE).
 *     tags: [Dropdown Master]
 *     parameters:
 *       - in: query
 *         name: state_id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: The ID of the state to fetch districts for.
 *     responses:
 *       200:
 *         description: List of districts for the given state
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
 *                         example: 5
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
 *         description: Missing state_id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: state_id is required
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/Dropdown/District", controller.getDistrictsByState);

module.exports = router;