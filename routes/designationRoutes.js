const express = require("express");
const router = express.Router();
const controller = require("../controllers/designationController");

/**
 * @swagger
 * tags:
 *   name: Designation Master
 *   description: Designation management APIs
 */


/* ======================= INSERT ======================= */

/**
 * @swagger
 * /Designation/Create:
 *   post:
 *     summary: Create Designation
 *     tags: [Designation Master]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - department_id
 *               - designation_name
 *             properties:
 *               department_id:
 *                 type: integer
 *                 example: 1
 *               designation_name:
 *                 type: string
 *                 example: Manager
 *               description:
 *                 type: string
 *                 example: Department Manager
 *     responses:
 *       200:
 *         description: Designation created successfully
 */
router.post("/Designation/Create", controller.createDesignation);


/* ======================= UPDATE ======================= */

/**
 * @swagger
 * /Designation/Update:
 *   put:
 *     summary: Update Designation
 *     tags: [Designation Master]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - designation_id
 *               - department_id
 *               - designation_name
 *             properties:
 *               designation_id:
 *                 type: integer
 *                 example: 1
 *               department_id:
 *                 type: integer
 *                 example: 1
 *               designation_name:
 *                 type: string
 *                 example: Senior Manager
 *               description:
 *                 type: string
 *                 example: Updated designation description
 *     responses:
 *       200:
 *         description: Designation updated successfully
 */
router.put("/Designation/Update", controller.updateDesignation);


/* ======================= DELETE ======================= */

/**
 * @swagger
 * /Designation/Delete/{id}:
 *   delete:
 *     summary: Delete Designation
 *     tags: [Designation Master]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Designation deleted successfully
 */
router.delete("/Designation/Delete/:id", controller.deleteDesignation);


/* ======================= GET BY ID ======================= */

/**
 * @swagger
 * /Designation/GetById/{id}:
 *   get:
 *     summary: Get Designation By ID
 *     tags: [Designation Master]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Designation fetched successfully
 *       404:
 *         description: Data not found
 */
router.get("/Designation/GetById/:id", controller.getDesignationById);


/* ======================= GET ALL ======================= */

/**
 * @swagger
 * /Designation/GetAll:
 *   get:
 *     summary: Get All Designations
 *     tags: [Designation Master]
 *     responses:
 *       200:
 *         description: Designation list fetched successfully
 */
router.get("/Designation/GetAll", controller.getAllDesignations);

module.exports = router;