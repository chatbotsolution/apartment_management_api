const express = require("express");
const router = express.Router();
const controller = require("../controllers/authController");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication APIs
 */

/* ======================= LOGIN ======================= */
/**
 * @swagger
 * /Auth/Login:
 *   post:
 *     summary: User Login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Email:
 *                 type: string
 *               Password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post("/Auth/Login", controller.login);


/* ======================= CHANGE PASSWORD ======================= */
/**
 * @swagger
 * /Auth/ChangePassword:
 *   post:
 *     summary: Change user password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               F_User_Id:
 *                 type: integer
 *               Email:
 *                 type: string
 *               Old_Password:
 *                 type: string
 *               New_Password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       400:
 *         description: Invalid input or old password
 */
router.post("/Auth/ChangePassword", controller.changePassword);


/* ======================= LOGOUT ======================= */
/**
 * @swagger
 * /Auth/Logout:
 *   post:
 *     summary: User Logout
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               F_User_Id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Logged out successfully
 */
router.post("/Auth/Logout", controller.logout);


module.exports = router;
