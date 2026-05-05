const express = require("express");
const router = express.Router();
const controller = require("../controllers/ownerFlatController");


/* ======================= ASSIGN ======================= */
/**
 * @swagger
 * /OwnerFlat/Assign:
 *   post:
 *     summary: Assign owner to flat
 *     tags: [Owner Flat]
 */
router.post("/OwnerFlat/Assign", controller.assign);


/* ======================= UPDATE ======================= */
/**
 * @swagger
 * /OwnerFlat/Update:
 *   put:
 *     summary: Update ownership
 *     tags: [Owner Flat]
 */
router.put("/OwnerFlat/Update", controller.update);


/* ======================= TRANSFER ======================= */
/**
 * @swagger
 * /OwnerFlat/Transfer:
 *   post:
 *     summary: Transfer ownership
 *     tags: [Owner Flat]
 */
router.post("/OwnerFlat/Transfer", controller.transfer);


/* ======================= GET CURRENT ======================= */
/**
 * @swagger
 * /OwnerFlat/GetCurrent:
 *   get:
 *     summary: Get current owner by flat
 *     tags: [Owner Flat]
 */
router.get("/OwnerFlat/GetCurrent", controller.getCurrentByFlat);


/* ======================= HISTORY ======================= */
/**
 * @swagger
 * /OwnerFlat/GetHistory:
 *   get:
 *     summary: Get ownership history by flat
 *     tags: [Owner Flat]
 */
router.get("/OwnerFlat/GetHistory", controller.getHistoryByFlat);


/* ======================= BY OWNER ======================= */
/**
 * @swagger
 * /OwnerFlat/GetByOwner:
 *   get:
 *     summary: Get flats by owner
 *     tags: [Owner Flat]
 */
router.get("/OwnerFlat/GetByOwner", controller.getByOwner);


module.exports = router;