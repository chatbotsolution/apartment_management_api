const express = require("express");
const router = express.Router();
const controller = require("../controllers/ownerController");

/**
 * @swagger
 * tags:
 *   name: Owner Master
 */

/* ======================= GET ALL ======================= */
/**
 * @swagger
 * /OwnerMaster/GetAll:
 *   get:
 *     summary: Get all owners with pagination
 *     tags: [Owner Master]
 *     parameters:
 *       - in: query
 *         name: society_id
 *         required: true
 *       - in: query
 *         name: page
 *       - in: query
 *         name: pageSize
 */
router.get("/OwnerMaster/GetAll", controller.getAll);


/* ======================= SEARCH ======================= */
/**
 * @swagger
 * /OwnerMaster/Search:
 *   get:
 *     summary: Search owners
 *     tags: [Owner Master]
 */
router.get("/OwnerMaster/Search", controller.search);


/* ======================= GET BY ID ======================= */
/**
 * @swagger
 * /OwnerMaster/GetById/{id}:
 *   get:
 *     summary: Get owner by id
 *     tags: [Owner Master]
 */
router.get("/OwnerMaster/GetById/:id", controller.getById);

module.exports = router;