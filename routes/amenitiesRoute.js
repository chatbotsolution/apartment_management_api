const express = require("express");
const router = express.Router();
const controller = require("../controllers/amenitiesController");
const { changeStatus } = require("../services/amenities.service");

/**
 * @swagger
 * tags:
 *   name: Amenities Master
 */


/* ======================= GET ALL ======================= */
/**
 * @swagger
 * /AmenitiesMaster/GetAllAmenities:
 *   get:
 *     summary: Get all amenities
 *     tags: [Amenities Master]
 *     responses:
 *       200:
 *         description: Amenities list
 */
router.get("/AmenitiesMaster/GetAllAmenities", controller.getAll);


/* ======================= GET BY ID ======================= */
/**
 * @swagger
 * /AmenitiesMaster/GetAmenitiesById/{id}:
 *   get:
 *     summary: Get amenities by ID
 *     tags: [Amenities Master]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Amenities details
 */
router.get("/AmenitiesMaster/GetAmenitiesById/:id", controller.getById);


/* ======================= CREATE ======================= */
/**
 * @swagger
 * /AmenitiesMaster/CreateAmenities:
 *   post:
 *     summary: Create amenities
 *     tags: [Amenities Master]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Amenities_Name:
 *                 type: string
 *               Description:
 *                 type: string
 *               Amount:
 *                 type: number
 *               IsChargeable:
 *                 type: integer
 *               Society_Id:
 *                 type: integer
 *               CreatedBy:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Amenities created successfully
 */
router.post("/AmenitiesMaster/CreateAmenities", controller.create);


/* ======================= UPDATE ======================= */
/**
 * @swagger
 * /AmenitiesMaster/UpdateAmenities:
 *   put:
 *     summary: Update amenities
 *     tags: [Amenities Master]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               AmenitiesId:
 *                 type: integer
 *               Amenities_Name:
 *                 type: string
 *               Description:
 *                 type: string
 *               Amount:
 *                 type: number
 *               IsChargeable:
 *                 type: integer
 *               Society_Id:
 *                 type: integer
 *               Updated_By:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Amenities updated successfully
 */
router.put("/AmenitiesMaster/UpdateAmenities", controller.update);


/* ======================= STATUS CHANGE ======================= */
/**
 * @swagger
 * /AmenitiesMaster/ChangeStatus/{AmenitiesId}/{IsActive}/{Updated_By}:
 *   patch:
 *     summary: Change amenities status
 *     tags: [Amenities Master]
 *     parameters:
 *       - in: path
 *         name: AmenitiesId
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: path
 *         name: IsActive
 *         required: true
 *         schema:
 *           type: boolean
 *           example: true
 *       - in: path
 *         name: Updated_By
 *         required: true
 *         schema:
 *           type: integer
 *           example: 5
 *     responses:
 *       200:
 *         description: Status changed successfully
 */
router.patch("/AmenitiesMaster/ChangeStatus/:AmenitiesId/:IsActive/:Updated_By", controller.changeStatus);

module.exports = router;