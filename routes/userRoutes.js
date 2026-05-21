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
 *               - orgId    
 *             properties:
 *               ownerId:
 *                 type: integer
 *                 nullable: true
 *                 example: 1
 *               tenantId:
 *                 type: integer
 *                 nullable: true
 *                 example: null
 *               staffId:
 *                 type: integer
 *                 nullable: true
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
 *               orgId:                
 *                 type: integer
 *                 example: 1
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

/* ======================= CHANGE PASSWORD ======================= */
/**
 * @swagger
 * /User/ChangePassword:
 *   post:
 *     summary: Change user password
 *     tags: [User Master]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - oldPassword
 *               - newPassword
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *               username:
 *                 type: string
 *                 example: "admin"
 *               oldPassword:
 *                 type: string
 *                 example: "123456"
 *               newPassword:
 *                 type: string
 *                 example: "new123456"
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       400:
 *         description: Invalid input / wrong password
 */
router.post("/User/ChangePassword", controller.changePassword);

/* ======================= FORGOT PASSWORD ======================= */
/**
 * @swagger
 * /User/ForgotPassword:
 *   post:
 *     summary: Forgot password (send reset link via email)
 *     tags: [User Master]
 *     description: This API generates a secure reset token and sends a password reset link to the user's registered email address.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *             properties:
 *               username:
 *                 type: string
 *                 description: Registered email of the user
 *                 example: "user@gmail.com"
 *     responses:
 *       200:
 *         description: Reset link sent successfully to the user's email
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
 *                   example: Reset link sent to email
 *       400:
 *         description: Missing email or user not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Internal server error while sending email or generating token
 */
router.post("/User/ForgotPassword", controller.forgotPassword);



/* ======================= RESET PASSWORD ======================= */
/**
 * @swagger
 * /User/ResetPassword:
 *   post:
 *     summary: Reset password using token
 *     tags: [User Master]
 *     description: This API resets the user's password using a valid reset token received via email. The token must be valid and not expired.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - newPassword
 *             properties:
 *               token:
 *                 type: string
 *                 description: Reset token received via email
 *                 example: "a1b2c3d4e5f6g7h8i9j0"
 *               newPassword:
 *                 type: string
 *                 description: New password to set for the user account
 *                 example: "newStrongPassword123"
 *     responses:
 *       200:
 *         description: Password reset successfully
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
 *                   example: Password reset successful
 *       400:
 *         description: Invalid token, expired token, or missing input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Token expired or invalid
 *       500:
 *         description: Internal server error while resetting password
 */
router.post("/User/ResetPassword", controller.resetPassword);

module.exports = router;