const express = require("express");
const router = express.Router();
const controller = require("../controllers/parkingtypeController");

/**
 * @swagger
 * tags:
 *   name: Parking Type Master
 */


/* ======================= GET ALL ======================= */
/**
 * @swagger
 * /ParkingTypeMaster/GetAllParkingType:
 *   get:
 *     summary: Get all parking types
 *     tags: [Parking Type Master]
 *     responses:
 *       200:
 *         description: Parking type list
 */
router.get("/ParkingTypeMaster/GetAllParkingType", controller.getAll);


/* ======================= GET BY ID ======================= */
/**
 * @swagger
 * /ParkingTypeMaster/GetParkingTypeById/{id}:
 *   get:
 *     summary: Get parking type by ID
 *     tags: [Parking Type Master]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Parking type details
 */
router.get("/ParkingTypeMaster/GetParkingTypeById/:id", controller.getById);


/* ======================= CREATE ======================= */
/**
 * @swagger
 * /ParkingTypeMaster/CreateParkingType:
 *   post:
 *     summary: Create parking type
 *     tags: [Parking Type Master]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ParkingType:
 *                 type: string
 *               CreatedBy:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Parking type created successfully
 */
router.post("/ParkingTypeMaster/CreateParkingType", controller.create);


/* ======================= UPDATE ======================= */
/**
 * @swagger
 * /ParkingTypeMaster/UpdateParkingType:
 *   put:
 *     summary: Update parking type
 *     tags: [Parking Type Master]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ParkingTypeId:
 *                 type: integer
 *               ParkingType:
 *                 type: string
 *               UpdatedBy:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Parking type updated successfully
 */
router.put("/ParkingTypeMaster/UpdateParkingType", controller.update);


/* ======================= STATUS CHANGE ======================= */
/**
 * @swagger
 * /ParkingTypeMaster/ChangeStatus/{ParkingTypeId}/{IsActive}/{UpdatedBy}:
 *   patch:
 *     summary: Change parking type status
 *     tags: [Parking Type Master]
 *     parameters:
 *       - in: path
 *         name: ParkingTypeId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: IsActive
 *         required: true
 *         schema:
 *           type: boolean
 *       - in: path
 *         name: UpdatedBy
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Status changed successfully
 */
router.patch("/ParkingTypeMaster/ChangeStatus/:ParkingTypeId/:IsActive/:UpdatedBy", controller.changeStatus);

module.exports = router;