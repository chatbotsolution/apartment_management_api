const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController");

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management APIs
 */


/* ======================= GET ALL ======================= */
/**
 * @swagger
 * /User/GetAllUser:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: User list retrieved successfully
 */
router.get("/User/GetAllUser", controller.getAll);


/* ======================= GET BY ID ======================= */
/**
 * @swagger
 * /User/GetUserById/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User details retrieved
 */
router.get("/User/GetUserById/:id", controller.getById);


/* ======================= CREATE ======================= */
/**
 * @swagger
 * /User/CreateUser:
 *   post:
 *     summary: Create user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Full_Name:
 *                 type: string
 *               Email:
 *                 type: string
 *               Mobile:
 *                 type: string
 *               Password_Hash:
 *                 type: string
 *               Role:
 *                 type: string
 *               Is_Active:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: User created successfully
 */
router.post("/User/CreateUser", controller.create);


/* ======================= UPDATE ======================= */
/**
 * @swagger
 * /User/UpdateUser:
 *   put:
 *     summary: Update user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               F_User_Id:
 *                 type: integer
 *               Full_Name:
 *                 type: string
 *               Email:
 *                 type: string
 *               Mobile:
 *                 type: string
 *               Password_Hash:
 *                 type: string
 *               Role:
 *                 type: string
 *               Is_Active:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: User updated successfully
 */
router.put("/User/UpdateUser", controller.update);


/* ======================= DELETE ======================= */
/**
 * @swagger
 * /User/DeleteUser/{id}:
 *   delete:
 *     summary: Delete user
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User deleted successfully
 */
router.delete("/User/DeleteUser/:id", controller.remove);


module.exports = router;