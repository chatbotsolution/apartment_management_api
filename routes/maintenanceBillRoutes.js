const express = require("express");
const router = express.Router();
const controller = require("../controllers/maintenanceBillController");


/**
 * @swagger
 * tags:
 *   name: Maintenance Fee
 *   description: Society maintenance billing APIs
 */


/**
 * @swagger
 * /MaintenanceFee/Create:
 *   post:
 *     summary: Generate maintenance fee
 *     tags: [Maintenance Fee]
 */
router.post("/MaintenanceFee/Create", controller.create);


/**
 * @swagger
 * /MaintenanceFee/Update:
 *   put:
 *     summary: Update maintenance fee
 *     tags: [Maintenance Fee]
 */
router.put("/MaintenanceFee/Update", controller.update);


/**
 * @swagger
 * /MaintenanceFee/Pay:
 *   post:
 *     summary: Pay maintenance fee
 *     tags: [Maintenance Fee]
 */
router.post("/MaintenanceFee/Pay", controller.pay);


/**
 * @swagger
 * /MaintenanceFee/GetById/{id}:
 *   get:
 *     summary: Get fee by id
 *     tags: [Maintenance Fee]
 */
router.get("/MaintenanceFee/GetById/:id", controller.getById);


/**
 * @swagger
 * /MaintenanceFee/GetAll:
 *   get:
 *     summary: Get all fees by flat
 *     tags: [Maintenance Fee]
 */
router.get("/MaintenanceFee/GetAll", controller.getAll);


module.exports = router;