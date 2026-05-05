const express = require("express");
const router = express.Router();
const controller = require("../controllers/parkingslotController");


/* ======================= INSERT ======================= */
/**
 * @swagger
 * /ParkingSlot/Insert:
 *   post:
 *     summary: Create parking slot
 *     tags: [Parking Slot]
 */
router.post("/ParkingSlot/Insert", controller.insert);


/* ======================= UPDATE ======================= */
/**
 * @swagger
 * /ParkingSlot/Update:
 *   put:
 *     summary: Update parking slot
 *     tags: [Parking Slot]
 */
router.put("/ParkingSlot/Update", controller.update);


/* ======================= DELETE ======================= */
/**
 * @swagger
 * /ParkingSlot/Delete:
 *   post:
 *     summary: Soft delete / update status
 *     tags: [Parking Slot]
 */
router.post("/ParkingSlot/Delete", controller.remove);


/* ======================= GET BY ID ======================= */
/**
 * @swagger
 * /ParkingSlot/GetById/{id}:
 *   get:
 *     summary: Get slot by id
 *     tags: [Parking Slot]
 */
router.get("/ParkingSlot/GetById/:id", controller.getById);


/* ======================= GET ALL ======================= */
/**
 * @swagger
 * /ParkingSlot/GetAll:
 *   get:
 *     summary: Get all slots by society
 *     tags: [Parking Slot]
 */
router.get("/ParkingSlot/GetAll", controller.getAll);


/* ======================= GET AVAILABLE ======================= */
/**
 * @swagger
 * /ParkingSlot/GetAvailable:
 *   get:
 *     summary: Get available slots
 *     tags: [Parking Slot]
 */
router.get("/ParkingSlot/GetAvailable", controller.getAvailable);


module.exports = router;