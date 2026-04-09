const express = require("express");
const router = express.Router();
const controller = require("../controllers/userRequestTypeController");

/**
 * @swagger
 * tags:
 *   name: User Request Type
 */

/* ======================= GET ALL ======================= */
/**
 * @swagger
 * /UserRequestType/GetAllUserRequestType:
 *   get:
 *     summary: Get all user request types
 *     tags: [User Request Type]
 *     responses:
 *       200:
 *         description: User request type list
 */
router.get("/UserRequestType/GetAllUserRequestType", controller.getAll);

/* ======================= GET BY ID ======================= */
/**
 * @swagger
 * /UserRequestType/GetUserRequestTypeById/{id}:
 *   get:
 *     summary: Get user request type by ID
 *     tags: [User Request Type]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User request type details
 */
router.get("/UserRequestType/GetUserRequestTypeById/:id", controller.getById);

/* ======================= CREATE ======================= */
/**
 * @swagger
 * /UserRequestType/CreateUserRequestType:
 *   post:
 *     summary: Create user request type
 *     tags: [User Request Type]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               complaintType:
 *                 type: string
 *               createdBy:
 *                 type: integer
 *     responses:
 *       200:
 *         description: User request type created successfully
 */
router.post("/UserRequestType/CreateUserRequestType", controller.create);

/* ======================= UPDATE ======================= */
/**
 * @swagger
 * /UserRequestType/UpdateUserRequestType:
 *   put:
 *     summary: Update user request type
 *     tags: [User Request Type]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               complaintType:
 *                 type: string
 *               updatedBy:
 *                 type: integer
 *     responses:
 *       200:
 *         description: User request type updated successfully
 */
router.put("/UserRequestType/UpdateUserRequestType", controller.update);

/* ======================= DELETE ======================= */
/**
 * @swagger
 * /UserRequestType/DeleteUserRequestType/{id}:
 *   delete:
 *     summary: Delete user request type
 *     tags: [User Request Type]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User request type deleted successfully
 */
router.delete("/UserRequestType/DeleteUserRequestType/:id", controller.remove);

module.exports = router;
