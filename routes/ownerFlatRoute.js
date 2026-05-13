const express = require("express");
const router = express.Router();
const controller = require("../controllers/ownerFlatController");

/**
 * @swagger
 * tags:
 *   name: Owner Flat
 *   description: Owner and Flat mapping management APIs
 */


/* ======================= ASSIGN ======================= */

/**
 * @swagger
 * /OwnerFlat/Assign:
 *   post:
 *     summary: Assign owner to flat
 *     tags: [Owner Flat]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ownerId
 *               - flatId
 *               - ownershipTypeId
 *             properties:
 *               ownerId:
 *                 type: integer
 *                 example: 1
 *               flatId:
 *                 type: integer
 *                 example: 2
 *               ownershipTypeId:
 *                 type: integer
 *                 example: 1
 *               ownershipFrom:
 *                 type: string
 *                 format: date
 *                 example: "2026-05-12"
 *               isResiding:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Owner assigned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Assigned successfully
 */
router.post("/OwnerFlat/Assign", controller.assign);


/* ======================= UPDATE ======================= */

/**
 * @swagger
 * /OwnerFlat/Update:
 *   put:
 *     summary: Update ownership details
 *     tags: [Owner Flat]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ownerFlatId
 *             properties:
 *               ownerFlatId:
 *                 type: integer
 *                 example: 1
 *               ownerId:
 *                 type: integer
 *                 example: 1
 *               flatId:
 *                 type: integer
 *                 example: 2
 *               ownershipTypeId:
 *                 type: integer
 *                 example: 1
 *               ownershipFrom:
 *                 type: string
 *                 format: date
 *                 example: "2025-01-01"
 *               ownershipTo:
 *                 type: string
 *                 format: date
 *                 nullable: true
 *                 example: null
 *               isResiding:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Ownership updated successfully
 */
router.put("/OwnerFlat/Update", controller.update);


/* ======================= TRANSFER ======================= */

/**
 * @swagger
 * /OwnerFlat/Transfer:
 *   post:
 *     summary: Transfer ownership to another owner
 *     tags: [Owner Flat]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ownerId
 *               - flatId
 *               - ownershipTypeId
 *             properties:
 *               ownerId:
 *                 type: integer
 *                 example: 2
 *               flatId:
 *                 type: integer
 *                 example: 1
 *               ownershipTypeId:
 *                 type: integer
 *                 example: 1
 *               isResiding:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Ownership transferred successfully
 */
router.post("/OwnerFlat/Transfer", controller.transfer);


/* ======================= GET CURRENT ======================= */

/**
 * @swagger
 * /OwnerFlat/GetCurrent:
 *   get:
 *     summary: Get current owner by flat
 *     tags: [Owner Flat]
 *     parameters:
 *       - in: query
 *         name: flat_id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Current owner fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       owner_flat_id:
 *                         type: integer
 *                       owner_id:
 *                         type: integer
 *                       flat_id:
 *                         type: integer
 *                       owner_name:
 *                         type: string
 *                         example: Malaya Rath
 *                       flat_number:
 *                         type: string
 *                         example: A-101
 *                       block_name:
 *                         type: string
 *                         example: Block A
 *                       ownership_type:
 *                         type: string
 *                         example: Self Owned
 */
router.get("/OwnerFlat/GetCurrent", controller.getCurrentByFlat);


/* ======================= HISTORY ======================= */

/**
 * @swagger
 * /OwnerFlat/GetHistory:
 *   get:
 *     summary: Get ownership history by flat
 *     tags: [Owner Flat]
 *     parameters:
 *       - in: query
 *         name: flat_id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Ownership history fetched successfully
 */
router.get("/OwnerFlat/GetHistory", controller.getHistoryByFlat);


/* ======================= BY OWNER ======================= */

/**
 * @swagger
 * /OwnerFlat/GetByOwner:
 *   get:
 *     summary: Get all active flats by owner
 *     tags: [Owner Flat]
 *     parameters:
 *       - in: query
 *         name: owner_id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Flats fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       owner_flat_id:
 *                         type: integer
 *                       flat_id:
 *                         type: integer
 *                       flat_number:
 *                         type: string
 *                         example: A-101
 *                       block_name:
 *                         type: string
 *                         example: Block A
 *                       ownership_type:
 *                         type: string
 *                         example: Self Owned
 */
router.get("/OwnerFlat/GetByOwner", controller.getByOwner);


module.exports = router;