const express = require("express");
const router = express.Router();
const controller = require("../controllers/staffController");

/**
 * @swagger
 * tags:
 *   name: Staff Master
 */

/* ======================= GET ALL ======================= */
/**
 * @swagger
 * /StaffMaster/GetAllStaff:
 *   get:
 *     summary: Get all staff
 *     tags: [Staff Master]
 *     responses:
 *       200:
 *         description: Staff list
 */
router.get("/StaffMaster/GetAllStaff", controller.getAll);

/* ======================= GET BY ID ======================= */
/**
 * @swagger
 * /StaffMaster/GetStaffById/{id}:
 *   get:
 *     summary: Get staff by ID
 *     tags: [Staff Master]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Staff details
 */
router.get("/StaffMaster/GetStaffById/:id", controller.getById);

/* ======================= CREATE ======================= */
/**
 * @swagger
 * /StaffMaster/CreateStaff:
 *   post:
 *     summary: Create staff
 *     tags: [Staff Master]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Name:
 *                 type: string
 *               staffTypeId:
 *                 type: integer
 *               Mobile:
 *                 type: string
 *               Shift:
 *                 type: integer
 *               Created_By:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Staff created successfully
 */
router.post("/StaffMaster/CreateStaff", controller.create);

/* ======================= UPDATE ======================= */
/**
 * @swagger
 * /StaffMaster/UpdateStaff:
 *   put:
 *     summary: Update staff
 *     tags: [Staff Master]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Staff_Id:
 *                 type: integer
 *               Name:
 *                 type: string
 *               staffTypeId:
 *                 type: integer
 *               Mobile:
 *                 type: string
 *               Shift:
 *                 type: integer
 *               Is_Active:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Staff updated successfully
 */
router.put("/StaffMaster/UpdateStaff", controller.update);

/* ======================= DELETE ======================= */
/**
 * @swagger
 * /StaffMaster/DeleteStaff/{id}:
 *   delete:
 *     summary: Delete staff
 *     tags: [Staff Master]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Staff deleted successfully
 */
router.delete("/StaffMaster/DeleteStaff/:id", controller.remove);

module.exports = router;
