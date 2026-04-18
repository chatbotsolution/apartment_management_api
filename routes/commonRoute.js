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

/**
 * @swagger
 * /Common/GetAllNationality:
 *   get:
 *     summary: Get All Nationalities
 *     tags: [Common Master]
 *     responses:
 *       200:
 *         description: Nationality dropdown fetched successfully
 */
router.get("/Common/GetAllNationality", controller.getAllNationality);


/* ======================= GET OWNER DROPDOWN ======================= */
/**
 * @swagger
 * /Common/GetOwners:
 *   get:
 *     summary: Get all owners (dropdown)
 *     tags: [Common Master]
 *     responses:
 *       200:
 *         description: Owner list fetched successfully
 */
router.get("/Common/GetOwners", controller.getOwners);


/* ======================= GET BLOCK BY OWNER ======================= */
/**
 * @swagger
 * /Common/GetBlocksByOwner:
 *   get:
 *     summary: Get blocks by owner
 *     tags: [Common Master]
 *     parameters:
 *       - in: query
 *         name: ownerId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Block list fetched successfully
 */
router.get("/Common/GetBlocksByOwner", controller.getBlocksByOwner);


/* ======================= GET FLOOR BY OWNER + BLOCK ======================= */
/**
 * @swagger
 * /Common/GetFloorsByOwnerBlock:
 *   get:
 *     summary: Get floors by owner and block
 *     tags: [Common Master]
 *     parameters:
 *       - in: query
 *         name: ownerId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: blockId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Floor list fetched successfully
 */
router.get("/Common/GetFloorsByOwnerBlock", controller.getFloorsByOwnerBlock);


/* ======================= GET FLAT BY OWNER + BLOCK + FLOOR ======================= */
/**
 * @swagger
 * /Common/GetFlatsByOwnerBlockFloor:
 *   get:
 *     summary: Get flats by owner, block and floor
 *     tags: [Common Master]
 *     parameters:
 *       - in: query
 *         name: ownerId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: blockId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: floorId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Flat list fetched successfully
 */
router.get("/Common/GetFlatsByOwnerBlockFloor", controller.getFlatsByOwnerBlockFloor);


module.exports = router;