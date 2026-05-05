const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController");


/* ======================= TAG ======================= */
/**
 * @swagger
 * tags:
 *   name: User Master
 *   description: Authentication & user management APIs
 */


/* ======================= REGISTER ======================= */
/**
 * @swagger
 * /User/Register:
 *   post:
 *     summary: Create new user
 *     tags: [User Master]
 */
router.post("/User/Register", controller.insert);


/* ======================= LOGIN ======================= */
/**
 * @swagger
 * /User/Login:
 *   post:
 *     summary: User login
 *     tags: [User Master]
 */
router.post("/User/Login", controller.login);


/* ======================= GET BY ID ======================= */
/**
 * @swagger
 * /User/GetById/{id}:
 *   get:
 *     summary: Get user by id
 *     tags: [User Master]
 */
router.get("/User/GetById/:id", controller.getById);


/* ======================= GET ALL ======================= */
/**
 * @swagger
 * /User/GetAll:
 *   get:
 *     summary: Get all users
 *     tags: [User Master]
 */
router.get("/User/GetAll", controller.getAll);


/* ======================= STATUS ======================= */
/**
 * @swagger
 * /User/UpdateStatus:
 *   post:
 *     summary: Activate / Deactivate user
 *     tags: [User Master]
 */
router.post("/User/UpdateStatus", controller.updateStatus);


module.exports = router;