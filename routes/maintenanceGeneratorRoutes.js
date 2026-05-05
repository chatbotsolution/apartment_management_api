const express = require("express");
const router = express.Router();
const controller = require("../controllers/maintenanceGeneratorController");


/**
 * @swagger
 * tags:
 *   name: Maintenance Generator
 *   description: Auto generate monthly maintenance bills
 */


/**
 * @swagger
 * /Maintenance/Generate:
 *   post:
 *     summary: Generate monthly maintenance for all flats
 *     tags: [Maintenance Generator]
 */
router.post("/Maintenance/Generate", controller.generate);


module.exports = router;