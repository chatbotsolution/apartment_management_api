const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController");

//console.log("🔥 USER ROUTES FILE EXECUTED");


/* ======================= TAG ======================= */
/**
 * @swagger
 * tags:
 *   name: User Master
 *   description: Authentication & User Management APIs
 */

/* ======================= LOGIN ======================= */
/**
 * @swagger
 * /User/Login:
 *   post:
 *     summary: User login
 *     tags: [User Master]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: "admin"
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials
 */
router.post("/User/Login", controller.login);


/* ======================= REGISTER ======================= */
/**
 * @swagger
 * /User/Register:
 *   post:
 *     summary: Create new user
 *     tags: [User Master]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - passwordHash
 *               - roleId
 *             properties:
 *               ownerId:
 *                 type: integer
 *                 example: 1
 *               tenantId:
 *                 type: integer
 *                 example: null
 *               staffId:
 *                 type: integer
 *                 example: null
 *               username:
 *                 type: string
 *                 example: "admin"
 *               passwordHash:
 *                 type: string
 *                 example: "123456"
 *               roleId:
 *                 type: integer
 *                 example: 1
 *               isActive:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: User created successfully
 */
router.post("/User/Register", controller.insert);


/* ======================= GET BY ID ======================= */
/**
 * @swagger
 * /User/GetById/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [User Master]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: User data fetched
 *       404:
 *         description: User not found
 */
router.get("/User/GetById/:id", controller.getById);


/* ======================= GET ALL ======================= */
/**
 * @swagger
 * /User/GetAll:
 *   get:
 *     summary: Get all users
 *     tags: [User Master]
 *     responses:
 *       200:
 *         description: List of users
 */
router.get("/User/GetAll", controller.getAll);


/* ======================= STATUS ======================= */
/**
 * @swagger
 * /User/UpdateStatus:
 *   post:
 *     summary: Activate / Deactivate user
 *     tags: [User Master]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - isActive
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *               isActive:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Status updated successfully
 */
router.post("/User/UpdateStatus", controller.updateStatus);


module.exports = router;