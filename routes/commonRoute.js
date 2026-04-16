const express = require("express");
const router = express.Router();
const controller = require("../controllers/commonController");

/**
 * @swagger
 * tags:
 *   name: Common Master
 *   description: Common APIs for Country, State, District
 */


/* ======================= GET ALL COUNTRY ======================= */
/**
 * @swagger
 * /Common/GetAllCountry:
 *   get:
 *     summary: Get all countries
 *     tags: [Common Master]
 *     responses:
 *       200:
 *         description: Country list fetched successfully
 */
router.get("/Common/GetAllCountry", controller.getAllCountry);


/* ======================= GET ALL STATE ======================= */
/**
 * @swagger
 * /Common/GetAllState:
 *   get:
 *     summary: Get all states
 *     tags: [Common Master]
 *     responses:
 *       200:
 *         description: State list fetched successfully
 */
router.get("/Common/GetAllState", controller.getAllState);


/* ======================= GET ALL DISTRICT ======================= */
/**
 * @swagger
 * /Common/GetAllDistrict:
 *   get:
 *     summary: Get all districts
 *     tags: [Common Master]
 *     responses:
 *       200:
 *         description: District list fetched successfully
 */
router.get("/Common/GetAllDistrict", controller.getAllDistrict);

/* ======================= GET FLOOR DROPDOWN ======================= */
/**
 * @swagger
 * /Common/GetAllFloors:
 *   get:
 *     summary: Get All floors
 *     tags: [Common Master]
 *     responses:
 *       200:
 *         description: Floor dropdown fetched successfully
 */
router.get("/Common/GetAllFloors", controller.getAllFloors);


module.exports = router;