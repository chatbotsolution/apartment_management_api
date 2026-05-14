const express = require("express");
const router = express.Router();
const controller = require("../controllers/amenitiesController");

/**
 * @swagger
 * tags:
 *   name: Amenities Master
 *   description: Amenity management endpoints
 */

/* ======================= GET ALL ======================= */
/**
 * @swagger
 * /AmenitiesMaster/GetAllAmenities:
 *   get:
 *     summary: Get all amenities by Society ID
 *     tags: [Amenities Master]
 *     parameters:
 *       - in: query
 *         name: society_id
 *         schema:
 *           type: integer
 *         description: The ID of the society
 *     responses:
 *       200:
 *         description: List of amenities retrieved successfully
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
 */
router.get("/AmenitiesMaster/GetAllAmenities", controller.getAll);

/* ======================= GET BY ID ======================= */
/**
 * @swagger
 * /AmenitiesMaster/GetAmenitiesById/{id}:
 *   get:
 *     summary: Get a specific amenity by ID
 *     tags: [Amenities Master]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the amenity
 *       - in: query
 *         name: society_id
 *         schema:
 *           type: integer
 *         description: The ID of the society
 *     responses:
 *       200:
 *         description: Amenity details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 */
router.get("/AmenitiesMaster/GetAmenitiesById/:id", controller.getById);

/* ======================= CREATE ======================= */
/**
 * @swagger
 * /AmenitiesMaster/CreateAmenities:
 *   post:
 *     summary: Create a new amenity
 *     tags: [Amenities Master]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - society_id
 *               - name
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
 *                 format: time
 *                 example: "09:00:00"
 *               close_time:
 *                 type: string
 *                 format: time
 *                 example: "18:00:00"
 *               is_bookable:
 *                 type: boolean
 *               booking_fee:
 *                 type: number
 *                 format: float
 *               advance_booking_days:
 *                 type: integer
 *               is_active:
 *                 type: boolean
 *                 default: true
 *               contact_person:
 *                 type: string
 *               contact_phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Amenity created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 */
router.post("/AmenitiesMaster/CreateAmenities", controller.create);

/* ======================= UPDATE ======================= */
/**
 * @swagger
 * /AmenitiesMaster/UpdateAmenities:
 *   put:
 *     summary: Update an existing amenity
 *     tags: [Amenities Master]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amenity_id
 *               - society_id
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
 *                 format: time
 *                 example: "09:00:00"
 *               close_time:
 *                 type: string
 *                 format: time
 *                 example: "18:00:00"
 *               is_bookable:
 *                 type: boolean
 *               booking_fee:
 *                 type: number
 *                 format: float
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
 *         description: Amenity updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: boolean
 */
router.put("/AmenitiesMaster/UpdateAmenities", controller.update);

/* ======================= STATUS CHANGE (DELETE) ======================= */
/**
 * @swagger
 * /AmenitiesMaster/DeleteAmenities/{amenity_id}/{society_id}:
 *   delete:
 *     summary: Soft delete an amenity
 *     tags: [Amenities Master]
 *     parameters:
 *       - in: path
 *         name: amenity_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the amenity to delete
 *       - in: path
 *         name: society_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the society
 *     responses:
 *       200:
 *         description: Amenity deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: boolean
 */
router.delete(
  "/AmenitiesMaster/DeleteAmenities/:amenity_id/:society_id",
  controller.deleteAmenity
);

module.exports = router;