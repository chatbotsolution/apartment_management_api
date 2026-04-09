const express = require("express");
const router = express.Router();
const controller = require("../controllers/stafftypeController");

/**
 * @swagger
 * tags:
 *   name: Staff Type Master
 */


/* ======================= GET ALL ======================= */
/**
 * @swagger
 * /StaffTypeMaster/GetAllStaffType:
 *   get:
 *     summary: Get all staff types
 *     tags: [Staff Type Master]
 *     responses:
 *       200:
 *         description: Staff type list
 */
router.get("/StaffTypeMaster/GetAllStaffType", controller.getAll);


/* ======================= GET BY ID ======================= */
/**
 * @swagger
 * /StaffTypeMaster/GetStaffTypeById/{id}:
 *   get:
 *     summary: Get staff type by ID
 *     tags: [Staff Type Master]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Staff type details
 */
router.get("/StaffTypeMaster/GetStaffTypeById/:id", controller.getById);


/* ======================= CREATE ======================= */
/**
 * @swagger
 * /StaffTypeMaster/CreateStaffType:
 *   post:
 *     summary: Create staff type
 *     tags: [Staff Type Master]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               StaffType:
 *                 type: string
 *               CreatedBy:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Staff type created successfully
 */
router.post("/StaffTypeMaster/CreateStaffType", controller.create);


/* ======================= UPDATE ======================= */
/**
 * @swagger
 * /StaffTypeMaster/UpdateStaffType:
 *   put:
 *     summary: Update staff type
 *     tags: [Staff Type Master]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               StaffTypeId:
 *                 type: integer
 *               StaffType:
 *                 type: string
 *               UpdatedBy:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Staff type updated successfully
 */
router.put("/StaffTypeMaster/UpdateStaffType", controller.update);


/* ======================= STATUS CHANGE ======================= */
/**
 * @swagger
 * /StaffTypeMaster/ChangeStatus/{StaffTypeId}/{IsActive}/{UpdatedBy}:
 *   patch:
 *     summary: Change staff type status
 *     tags: [Staff Type Master]
 *     parameters:
 *       - in: path
 *         name: StaffTypeId
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: path
 *         name: IsActive
 *         required: true
 *         schema:
 *           type: boolean
 *           example: true
 *       - in: path
 *         name: UpdatedBy
 *         required: true
 *         schema:
 *           type: integer
 *           example: 0
 *     responses:
 *       200:
 *         description: Status changed successfully
 */
router.patch("/StaffTypeMaster/ChangeStatus/:StaffTypeId/:IsActive/:UpdatedBy", controller.changeStatus);

module.exports = router;