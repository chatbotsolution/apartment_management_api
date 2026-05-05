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
 *               society_id:
 *                 type: integer
 *               name:
 *                 type: string
 *               category:
 *                 type: integer
 *               description:
 *                 type: string
 *               location:
 *                 type: string
 *               capacity:
 *                 type: integer
 *               open_time:
 *                 type: string
 *                 example: "09:00:00"
 *               close_time:
 *                 type: string
 *                 example: "18:00:00"
 *               is_bookable:
 *                 type: boolean
 *               booking_fee:
 *                 type: number
 *               advance_booking_days:
 *                 type: integer
 *               contact_person:
 *                 type: string
 *               contact_phone:
 *                 type: string
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
 *               amenity_id:
 *                 type: integer
 *               society_id:
 *                 type: integer
 *               name:
 *                 type: string
 *               category:
 *                 type: integer
 *               description:
 *                 type: string
 *               location:
 *                 type: string
 *               capacity:
 *                 type: integer
 *               open_time:
 *                 type: string
 *               close_time:
 *                 type: string
 *               is_bookable:
 *                 type: boolean
 *               booking_fee:
 *                 type: number
 *               advance_booking_days:
 *                 type: integer
 *               is_active:
 *                 type: boolean
 *               contact_person:
 *                 type: string
 *               contact_phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated successfully
 */
router.put("/AmenitiesMaster/UpdateAmenities", controller.update);


/* ======================= STATUS CHANGE ======================= */
/**
 * @swagger
 * /AmenitiesMaster/DeleteAmenities/{id}:
 *   delete:
 *     summary: Soft delete amenities
 *     tags: [Amenities Master]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Deleted successfully
 */
router.delete("/AmenitiesMaster/DeleteAmenities/:id", controller.remove);

module.exports = router;