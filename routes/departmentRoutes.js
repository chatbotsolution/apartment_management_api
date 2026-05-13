const express = require("express");
const router = express.Router();
const controller = require("../controllers/departmentController");

/**
 * @swagger
 * tags:
 *   name: Department Master
 *   description: Department management APIs
 */


/* ======================= INSERT ======================= */

/**
 * @swagger
 * /Department/Create:
 *   post:
 *     summary: Create Department
 *     tags: [Department Master]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - department_name
 *             properties:
 *               department_name:
 *                 type: string
 *                 example: HR
 *               description:
 *                 type: string
 *                 example: Human Resource Department
 *     responses:
 *       201:
 *         description: Department created successfully
 */
router.post("/Department/Create", controller.createDepartment);


/* ======================= UPDATE ======================= */

/**
 * @swagger
 * /Department/Update:
 *   put:
 *     summary: Update Department
 *     tags: [Department Master]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - department_id
 *               - department_name
 *             properties:
 *               department_id:
 *                 type: integer
 *                 example: 1
 *               department_name:
 *                 type: string
 *                 example: HR
 *               description:
 *                 type: string
 *                 example: Updated description
 *     responses:
 *       200:
 *         description: Department updated successfully
 */
router.put("/Department/Update", controller.updateDepartment);


/* ======================= DELETE ======================= */

/**
 * @swagger
 * /Department/Delete/{id}:
 *   delete:
 *     summary: Delete Department
 *     tags: [Department Master]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Department deleted successfully
 */
router.delete("/Department/Delete/:id", controller.deleteDepartment);


/* ======================= GET BY ID ======================= */

/**
 * @swagger
 * /Department/GetById/{id}:
 *   get:
 *     summary: Get Department By ID
 *     tags: [Department Master]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Department fetched successfully
 *       404:
 *         description: Data not found
 */
router.get("/Department/GetById/:id", controller.getDepartmentById);


/* ======================= GET ALL ======================= */

/**
 * @swagger
 * /Department/GetAll:
 *   get:
 *     summary: Get All Departments
 *     tags: [Department Master]
 *     responses:
 *       200:
 *         description: Department list fetched successfully
 */
router.get("/Department/GetAll", controller.getAllDepartments);

module.exports = router;