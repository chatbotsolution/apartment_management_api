const express = require("express");
const router = express.Router();
const controller = require("../controllers/memberController");

/**
 * @swagger
 * tags:
 *   name: Member
 *   description: Member management APIs
 */


/* ======================= GET ALL ======================= */
/**
 * @swagger
 * /Member/GetAllMember:
 *   get:
 *     summary: Get all members
 *     tags: [Member]
 *     responses:
 *       200:
 *         description: Member list retrieved successfully
 */
router.get("/Member/GetAllMember", controller.getAll);


/* ======================= GET ACTIVE ======================= */
/**
 * @swagger
 * /Member/GetActiveMember:
 *   get:
 *     summary: Get active members
 *     tags: [Member]
 *     responses:
 *       200:
 *         description: Active member list retrieved
 */
router.get("/Member/GetActiveMember", controller.getActive);


/* ======================= GET BY ID ======================= */
/**
 * @swagger
 * /Member/GetMemberById/{id}:
 *   get:
 *     summary: Get member by ID
 *     tags: [Member]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Member details retrieved
 */
router.get("/Member/GetMemberById/:id", controller.getById);


/* ======================= GET BY FLAT ======================= */
/**
 * @swagger
 * /Member/GetMemberByFlat/{flatId}:
 *   get:
 *     summary: Get members by flat ID
 *     tags: [Member]
 *     parameters:
 *       - in: path
 *         name: flatId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Members list for given flat
 */
router.get("/Member/GetMemberByFlat/:flatId", controller.getByFlat);


/* ======================= CREATE ======================= */
/**
 * @swagger
 * /Member/CreateMember:
 *   post:
 *     summary: Create member
 *     tags: [Member]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               User_Id:
 *                 type: integer
 *               Flat_Id:
 *                 type: integer
 *               Member_Type:
 *                 type: string
 *               Move_In_Date:
 *                 type: string
 *                 format: date
 *               Move_Out_Date:
 *                 type: string
 *                 format: date
 *               maintainance_head_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Member created successfully
 */
router.post("/Member/CreateMember", controller.create);


/* ======================= UPDATE ======================= */
/**
 * @swagger
 * /Member/UpdateMember:
 *   put:
 *     summary: Update member
 *     tags: [Member]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Member_Id:
 *                 type: integer
 *               User_Id:
 *                 type: integer
 *               Flat_Id:
 *                 type: integer
 *               Member_Type:
 *                 type: string
 *               Move_In_Date:
 *                 type: string
 *                 format: date
 *               Move_Out_Date:
 *                 type: string
 *                 format: date
 *               Is_Active:
 *                 type: boolean
 *               maintainance_head_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Member updated successfully
 */
router.put("/Member/UpdateMember", controller.update);


/* ======================= DELETE ======================= */
/**
 * @swagger
 * /Member/DeleteMember/{id}:
 *   delete:
 *     summary: Delete member
 *     tags: [Member]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Member deleted successfully
 */
router.delete("/Member/DeleteMember/:id", controller.remove);


module.exports = router;