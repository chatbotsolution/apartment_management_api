const express = require("express");
const router = express.Router();
const controller = require("../controllers/amenityBookingController");


/**
 * @swagger
 * tags:
 *   name: Amenity Booking
 *   description: Amenity booking management APIs
 */


/* ======================= GET ALL ======================= */
/**
 * @swagger
 * /AmenityBooking/GetAll:
 *   get:
 *     summary: Get all amenity bookings
 *     tags: [Amenity Booking]
 *     responses:
 *       200:
 *         description: List of all bookings
 */
router.get("/AmenityBooking/GetAll", controller.getAll);


/* ======================= GET BY ID ======================= */
/**
 * @swagger
 * /AmenityBooking/GetById/{id}:
 *   get:
 *     summary: Get booking by ID
 *     tags: [Amenity Booking]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Booking ID
 *     responses:
 *       200:
 *         description: Booking details
 */
router.get("/AmenityBooking/GetById/:id", controller.getById);


/* ======================= CREATE BOOKING ======================= */
/**
 * @swagger
 * /AmenityBooking/Create:
 *   post:
 *     summary: Create new amenity booking
 *     tags: [Amenity Booking]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amenity_id:
 *                 type: integer
 *               flat_id:
 *                 type: integer
 *               owner_id:
 *                 type: integer
 *               tenant_id:
 *                 type: integer
 *               booking_date:
 *                 type: string
 *                 format: date
 *               start_time:
 *                 type: string
 *               end_time:
 *                 type: string
 *               purpose:
 *                 type: string
 *               expected_guests:
 *                 type: integer
 *               status_id:
 *                 type: integer
 *               amount_paid:
 *                 type: number
 *               payment_mode_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Booking created successfully
 */
router.post("/AmenityBooking/Create", controller.create);


/* ======================= UPDATE BOOKING ======================= */
/**
 * @swagger
 * /AmenityBooking/Update:
 *   put:
 *     summary: Update amenity booking
 *     tags: [Amenity Booking]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               booking_id:
 *                 type: integer
 *               booking_date:
 *                 type: string
 *                 format: date
 *               start_time:
 *                 type: string
 *               end_time:
 *                 type: string
 *               purpose:
 *                 type: string
 *               expected_guests:
 *                 type: integer
 *               status_id:
 *                 type: integer
 *               amount_paid:
 *                 type: number
 *               payment_mode_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Booking updated successfully
 */
router.put("/AmenityBooking/Update", controller.update);


/* ======================= CANCEL BOOKING ======================= */
/**
 * @swagger
 * /AmenityBooking/Cancel:
 *   patch:
 *     summary: Cancel amenity booking
 *     tags: [Amenity Booking]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               booking_id:
 *                 type: integer
 *               status_id:
 *                 type: integer
 *               cancellation_reason:
 *                 type: string
 *     responses:
 *       200:
 *         description: Booking cancelled successfully
 */
router.patch("/AmenityBooking/Cancel", controller.cancel);


module.exports = router;