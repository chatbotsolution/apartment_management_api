const express = require("express");
const router = express.Router();
const controller = require("../controllers/societyController");

/**
 * @swagger
 * tags:
 *   name: Society Master
 */


/* ======================= GET ALL ======================= */
/**
 * @swagger
 * /SocietyMaster/GetAllSociety:
 *   get:
 *     summary: Get all societies
 *     tags: [Society Master]
 *     responses:
 *       200:
 *         description: Society list
 */
router.get("/SocietyMaster/GetAllSociety", controller.getAll);


/* ======================= GET BY ID ======================= */
/**
 * @swagger
 * /SocietyMaster/GetSocietyById/{id}:
 *   get:
 *     summary: Get society by ID
 *     tags: [Society Master]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Society details
 */
router.get("/SocietyMaster/GetSocietyById/:id", controller.getById);


/* ======================= CREATE ======================= */
/**
 * @swagger
 * /SocietyMaster/CreateSociety:
 *   post:
 *     summary: Create society
 *     tags: [Society Master]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Society_Name:
 *                 type: string
 *               Address:
 *                 type: string
 *               City:
 *                 type: string
 *               State:
 *                 type: string
 *               Pincode:
 *                 type: string
 *               Created_By:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Society created successfully
 */
router.post("/SocietyMaster/CreateSociety", controller.create);


/* ======================= UPDATE ======================= */
/**
 * @swagger
 * /SocietyMaster/UpdateSociety:
 *   put:
 *     summary: Update society
 *     tags: [Society Master]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Society_Id:
 *                 type: integer
 *               Society_Name:
 *                 type: string
 *               Address:
 *                 type: string
 *               City:
 *                 type: string
 *               State:
 *                 type: string
 *               Pincode:
 *                 type: string
 *               Created_By:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Society updated successfully
 */
router.put("/SocietyMaster/UpdateSociety", controller.update);


/* ======================= DELETE ======================= */
/**
 * @swagger
 * /SocietyMaster/DeleteSociety/{id}:
 *   delete:
 *     summary: Delete society
 *     tags: [Society Master]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Society deleted successfully
 */
router.delete("/SocietyMaster/DeleteSociety/:id", controller.remove);

module.exports = router;
