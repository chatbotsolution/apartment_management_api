const express = require("express");
const router = express.Router();
const controller = require("../controllers/commonController");

/**
 * @swagger
 * tags:
 *   name: Dropdown Master
 *   description: Dropdown & Lookup APIs — all backed by sp_dropdown_master
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     DropdownItem:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: Male
 *         code:
 *           type: string
 *           nullable: true
 *           example: M
 *
 *     DropdownItemBasic:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 10
 *         name:
 *           type: string
 *           example: Engineering
 *
 *     DesignationItem:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 5
 *         name:
 *           type: string
 *           example: Senior Engineer
 *         department_id:
 *           type: integer
 *           example: 10
 *
 *     LookupGroupItem:
 *       type: object
 *       properties:
 *         group_name:
 *           type: string
 *           example: Gender
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: Male
 *         code:
 *           type: string
 *           nullable: true
 *           example: M
 *
 *     DropdownResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/DropdownItem'
 *
 *     DropdownResponseBasic:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/DropdownItemBasic'
 *
 *     DropdownResponseDesignation:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/DesignationItem'
 *
 *     AllLookupsResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/LookupGroupItem'
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: Internal Server Error
 */

/* ======================= LOOKUP BY GROUP ======================= */

/**
 * @swagger
 * /Dropdown/Gender:
 *   get:
 *     summary: Get Gender dropdown
 *     description: Returns lookup values for group `Gender` via sp_dropdown_master (LOOKUP_BY_GROUP).
 *     tags: [Dropdown Master]
 *     responses:
 *       200:
 *         description: List of gender options
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DropdownResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/Dropdown/Gender", controller.gender);

/**
 * @swagger
 * /Dropdown/VehicleType:
 *   get:
 *     summary: Get Vehicle Type dropdown
 *     description: Returns lookup values for group `VehicleType`.
 *     tags: [Dropdown Master]
 *     responses:
 *       200:
 *         description: List of vehicle types
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DropdownResponse'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/Dropdown/VehicleType", controller.vehicleType);

/**
 * @swagger
 * /Dropdown/Priority:
 *   get:
 *     summary: Get Priority dropdown
 *     description: Returns lookup values for group `Priority`.
 *     tags: [Dropdown Master]
 *     responses:
 *       200:
 *         description: List of priority levels
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DropdownResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/Dropdown/Priority", controller.priority);

/**
 * @swagger
 * /Dropdown/Role:
 *   get:
 *     summary: Get Role dropdown
 *     description: Returns lookup values for group `Role`.
 *     tags: [Dropdown Master]
 *     responses:
 *       200:
 *         description: List of roles
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DropdownResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/Dropdown/Role", controller.role);

/**
 * @swagger
 * /Dropdown/PaymentMode:
 *   get:
 *     summary: Get Payment Mode dropdown
 *     description: Returns lookup values for group `PaymentMode`.
 *     tags: [Dropdown Master]
 *     responses:
 *       200:
 *         description: List of payment modes
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DropdownResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/Dropdown/PaymentMode", controller.paymentMode);

/**
 * @swagger
 * /Dropdown/PaymentMode:
 *   get:
 *     summary: Get Payment Mode dropdown
 *     description: Returns lookup values for group `PaymentMode`.
 *     tags: [Dropdown Master]
 *     responses:
 *       200:
 *         description: List of payment modes
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DropdownResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/Dropdown/PaymentMode", controller.paymentMode);

/**
 * @swagger
 * /Dropdown/ShiftTiming:
 *   get:
 *     summary: Get Shift Timing dropdown
 *     description: Returns lookup values for group `ShiftTiming`.
 *     tags: [Dropdown Master]
 *     responses:
 *       200:
 *         description: List of shift timings
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DropdownResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/Dropdown/ShiftTiming", controller.shiftTiming);

/**
 * @swagger
 * /Dropdown/ParkingSlotType:
 *   get:
 *     summary: Get Parking Slot Type dropdown
 *     description: Returns lookup values for group `ParkingSlotType`.
 *     tags: [Dropdown Master]
 *     responses:
 *       200:
 *         description: List of parking slot types
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DropdownResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/Dropdown/ParkingSlotType", controller.parkingSlotType);

/**
 * @swagger
 * /Dropdown/ParkingSlotStatus:
 *   get:
 *     summary: Get Parking Slot Status dropdown
 *     description: Returns lookup values for group `ParkingSlotStatus`.
 *     tags: [Dropdown Master]
 *     responses:
 *       200:
 *         description: List of parking slot statuses
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DropdownResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/Dropdown/ParkingSlotStatus", controller.parkingSlotStatus);

/**
 * @swagger
 * /Dropdown/MaintenanceStatus:
 *   get:
 *     summary: Get Maintenance Status dropdown
 *     description: Returns lookup values for group `MaintenanceStatus`.
 *     tags: [Dropdown Master]
 *     responses:
 *       200:
 *         description: List of maintenance statuses
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DropdownResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/Dropdown/MaintenanceStatus", controller.maintenanceStatus);

/**
 * @swagger
 * /Dropdown/MaintenanceCategory:
 *   get:
 *     summary: Get Maintenance Category dropdown
 *     description: Returns lookup values for group `MaintenanceCategory`.
 *     tags: [Dropdown Master]
 *     responses:
 *       200:
 *         description: List of maintenance categories
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DropdownResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/Dropdown/MaintenanceCategory", controller.maintenanceCategory);

/**
 * @swagger
 * /Dropdown/ComplaintStatus:
 *   get:
 *     summary: Get Complaint Status dropdown
 *     description: Returns lookup values for group `ComplaintStatus`.
 *     tags: [Dropdown Master]
 *     responses:
 *       200:
 *         description: List of complaint statuses
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DropdownResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/Dropdown/ComplaintStatus", controller.complaintStatus);

/**
 * @swagger
 * /Dropdown/ComplaintCategory:
 *   get:
 *     summary: Get Complaint Category dropdown
 *     description: Returns lookup values for group `ComplaintCategory`.
 *     tags: [Dropdown Master]
 *     responses:
 *       200:
 *         description: List of complaint categories
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DropdownResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/Dropdown/ComplaintCategory", controller.complaintCategory);

/**
 * @swagger
 * /Dropdown/StaffStatus:
 *   get:
 *     summary: Get Staff Status dropdown
 *     description: Returns lookup values for group `StaffStatus`.
 *     tags: [Dropdown Master]
 *     responses:
 *       200:
 *         description: List of staff statuses
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DropdownResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/Dropdown/StaffStatus", controller.staffStatus);

/**
 * @swagger
 * /Dropdown/OwnershipType:
 *   get:
 *     summary: Get Ownership Type dropdown
 *     description: Returns lookup values for group `OwnershipType`.
 *     tags: [Dropdown Master]
 *     responses:
 *       200:
 *         description: List of ownership types
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DropdownResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/Dropdown/OwnershipType", controller.ownershipType);

/**
 * @swagger
 * /Dropdown/FlatType:
 *   get:
 *     summary: Get Flat Type dropdown
 *     description: Returns lookup values for group `FlatType`.
 *     tags: [Dropdown Master]
 *     responses:
 *       200:
 *         description: List of flat types
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DropdownResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/Dropdown/FlatType", controller.flatType);

/**
 * @swagger
 * /Dropdown/FlatStatus:
 *   get:
 *     summary: Get Flat Status dropdown
 *     description: Returns lookup values for group `FlatStatus`.
 *     tags: [Dropdown Master]
 *     responses:
 *       200:
 *         description: List of flat statuses
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DropdownResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/Dropdown/FlatStatus", controller.flatStatus);

/**
 * @swagger
 * /Dropdown/FlatFacing:
 *   get:
 *     summary: Get Flat Facing dropdown
 *     description: Returns lookup values for group `FlatFacing`.
 *     tags: [Dropdown Master]
 *     responses:
 *       200:
 *         description: List of flat facing directions
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DropdownResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/Dropdown/FlatFacing", controller.flatFacing);

/**
 * @swagger
 * /Dropdown/IdProofType:
 *   get:
 *     summary: Get ID Proof Type dropdown
 *     description: Returns lookup values for group `IdProofType`.
 *     tags: [Dropdown Master]
 *     responses:
 *       200:
 *         description: List of ID proof types
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DropdownResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/Dropdown/IdProofType", controller.idProofType);

/**
 * @swagger
 * /Dropdown/Occupation:
 *   get:
 *     summary: Get Occupation dropdown
 *     description: Returns lookup values for group `Occupation`.
 *     tags: [Dropdown Master]
 *     responses:
 *       200:
 *         description: List of occupations
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DropdownResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/Dropdown/Occupation", controller.occupation);

/**
 * @swagger
 * /Dropdown/CostBorneBy:
 *   get:
 *     summary: Get Cost Borne By dropdown
 *     description: Returns lookup values for group `CostBorneBy`.
 *     tags: [Dropdown Master]
 *     responses:
 *       200:
 *         description: List of cost borne by options
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DropdownResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/Dropdown/CostBorneBy", controller.costBorneBy);

/**
 * @swagger
 * /Dropdown/FeeStatus:
 *   get:
 *     summary: Get Fee Status dropdown
 *     description: Returns lookup values for group `FeeStatus`.
 *     tags: [Dropdown Master]
 *     responses:
 *       200:
 *         description: List of fee statuses
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DropdownResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/Dropdown/FeeStatus", controller.feeStatus);

/**
 * @swagger
 * /Dropdown/NoticeCategory:
 *   get:
 *     summary: Get Notice Category dropdown
 *     description: Returns lookup values for group `NoticeCategory`.
 *     tags: [Dropdown Master]
 *     responses:
 *       200:
 *         description: List of notice categories
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DropdownResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/Dropdown/NoticeCategory", controller.noticeCategory);

/**
 * @swagger
 * /Dropdown/NoticeTarget:
 *   get:
 *     summary: Get Notice Target dropdown
 *     description: Returns lookup values for group `NoticeTarget`.
 *     tags: [Dropdown Master]
 *     responses:
 *       200:
 *         description: List of notice targets
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DropdownResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/Dropdown/NoticeTarget", controller.noticeTarget);

/**
 * @swagger
 * /Dropdown/AmenityCategory:
 *   get:
 *     summary: Get Amenity Category dropdown
 *     description: Returns lookup values for group `AmenityCategory`.
 *     tags: [Dropdown Master]
 *     responses:
 *       200:
 *         description: List of amenity categories
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DropdownResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/Dropdown/AmenityCategory", controller.amenityCategory);

/**
 * @swagger
 * /Dropdown/AmenityBookingStatus:
 *   get:
 *     summary: Get Amenity Booking Status dropdown
 *     description: Returns lookup values for group `AmenityBookingStatus`.
 *     tags: [Dropdown Master]
 *     responses:
 *       200:
 *         description: List of amenity booking statuses
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DropdownResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/Dropdown/AmenityBookingStatus", controller.amenityBookingStatus);


/* ======================= ACTION BASED ======================= */

/**
 * @swagger
 * /Dropdown/Department:
 *   get:
 *     summary: Get Department list
 *     description: Returns all active departments via sp_dropdown_master (DEPARTMENT).
 *     tags: [Dropdown Master]
 *     responses:
 *       200:
 *         description: List of departments
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DropdownResponseBasic'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/Dropdown/Department", controller.department);

/**
 * @swagger
 * /Dropdown/Designation:
 *   get:
 *     summary: Get Designation list
 *     description: Returns all active designations. Each item includes `department_id` for client-side filtering.
 *     tags: [Dropdown Master]
 *     responses:
 *       200:
 *         description: List of designations
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DropdownResponseDesignation'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/Dropdown/Designation", controller.designation);

/**
 * @swagger
 * /Dropdown/Society:
 *   get:
 *     summary: Get Society list by Organization
 *     description: Returns all societies for a given Organization ID via sp_dropdown_master (SOCIETY).
 *     tags: [Dropdown Master]
 *     parameters:
 *       - in: query
 *         name: org_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the Organization to filter societies by
 *     responses:
 *       200:
 *         description: List of societies fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DropdownResponseBasic'
 *       400:
 *         description: Bad Request - Missing org_id
 *       500:
 *         description: Internal server error
 */
router.get("/Dropdown/Society", controller.societyDropdown);
/**
 * @swagger
 * /Dropdown/Block:
 *   get:
 *     summary: Get Block list by society
 *     description: Returns blocks belonging to the specified society via sp_dropdown_master (BLOCK).
 *     tags: [Dropdown Master]
 *     parameters:
 *       - in: query
 *         name: society_id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 
 *         description: The ID of the society to fetch blocks for.
 *     responses:
 *       200:
 *         description: List of blocks for the given society
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DropdownResponseBasic'
 *       400:
 *         description: Missing or invalid society_id parameter
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: society_id is required and must be a valid integer.
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/Dropdown/Block", controller.blockDropdown);

/**
 * @swagger
 * /Dropdown/Floor:
 *   get:
 *     summary: Get Floor list
 *     description: Returns all floors via sp_dropdown_master (FLOOR).
 *     tags: [Dropdown Master]
 *     responses:
 *       200:
 *         description: List of floors
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DropdownResponseBasic'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/Dropdown/Floor", controller.floor);

/**
 * @swagger
 * /Dropdown/Flat:
 *   get:
 *     summary: Get Flat list
 *     description: Returns all flats with their block name appended (e.g. "101 - Block A") via sp_dropdown_master (FLAT).
 *     tags: [Dropdown Master]
 *     responses:
 *       200:
 *         description: List of flats
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DropdownResponseBasic'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/Dropdown/Flat", controller.flat);

/**
 * @swagger
 * /Dropdown/Owner:
 *   get:
 *     summary: Get Owner list
 *     description: Returns all active owners (full name) via sp_dropdown_master (OWNER).
 *     tags: [Dropdown Master]
 *     parameters:
 *       - in: query
 *         name: society_id
 *         required: false
 *         schema:
 *           type: string
 *         description: Single or comma-separated society IDs (e.g. "1" or "1,2")
 *     responses:
 *       200:
 *         description: List of owners
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DropdownResponseBasic'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/Dropdown/Owner", controller.owner);

/**
 * @swagger
 * /Dropdown/Tenant:
 *   get:
 *     summary: Get Tenant list
 *     description: Returns all active tenants (full name) via sp_dropdown_master (TENANT).
 *     tags: [Dropdown Master]
 *     responses:
 *       200:
 *         description: List of tenants
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DropdownResponseBasic'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/Dropdown/Tenant", controller.tenant);

/**
 * @swagger
 * /Dropdown/Staff:
 *   get:
 *     summary: Get Staff list
 *     description: Returns all staff members (full name) via sp_dropdown_master (STAFF).
 *     tags: [Dropdown Master]
 *     responses:
 *       200:
 *         description: List of staff members
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DropdownResponseBasic'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/Dropdown/Staff", controller.staff);

/**
 * @swagger
 * /Dropdown/ParkingSlot:
 *   get:
 *     summary: Get Available Parking Slots
 *     description: Returns only unoccupied parking slots via sp_dropdown_master (PARKING_SLOT).
 *     tags: [Dropdown Master]
 *     responses:
 *       200:
 *         description: List of available parking slots
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DropdownResponseBasic'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/Dropdown/ParkingSlot", controller.parkingSlot);

/**
 * @swagger
 * /Dropdown/Vehicle:
 *   get:
 *     summary: Get Vehicle list
 *     description: Returns all active vehicles via sp_dropdown_master (VEHICLE).
 *     tags: [Dropdown Master]
 *     responses:
 *       200:
 *         description: List of vehicles
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DropdownResponseBasic'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/Dropdown/Vehicle", controller.vehicle);

/**
 * @swagger
 * /Dropdown/Amenity:
 *   get:
 *     summary: Get Amenity list
 *     description: Returns all active amenities via sp_dropdown_master (AMENITY).
 *     tags: [Dropdown Master]
 *     responses:
 *       200:
 *         description: List of amenities
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DropdownResponseBasic'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/Dropdown/Amenity", controller.amenity);

/**
 * @swagger
 * /Dropdown/Visitor:
 *   get:
 *     summary: Get Visitor list
 *     description: Returns all visitors via sp_dropdown_master (VISITOR).
 *     tags: [Dropdown Master]
 *     responses:
 *       200:
 *         description: List of visitors
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DropdownResponseBasic'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/Dropdown/Visitor", controller.visitor);


/* ======================= ALL LOOKUPS ======================= */

/**
 * @swagger
 * /Dropdown/All:
 *   get:
 *     summary: Get all lookup values grouped by group_name
 *     description: >
 *       Returns every active lookup entry from master_lookup, each tagged with its
 *       `group_name`. Useful for front-end bootstrap — fetch once and cache.
 *       Backed by sp_dropdown_master (ALL_LOOKUPS).
 *     tags: [Dropdown Master]
 *     responses:
 *       200:
 *         description: Full grouped lookup list
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AllLookupsResponse'
 *             example:
 *               success: true
 *               data:
 *                 - group_name: Gender
 *                   id: 1
 *                   name: Male
 *                   code: M
 *                 - group_name: Gender
 *                   id: 2
 *                   name: Female
 *                   code: F
 *                 - group_name: Priority
 *                   id: 10
 *                   name: High
 *                   code: H
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/Dropdown/All", controller.getAllLookups);

/* ======================= SOCIETY TYPE DROPDOWNS ======================= */
/**
 * @swagger
 * /Dropdown/SocietyType:
 *   get:
 *     summary: Get Society Type dropdown
 *     description: Returns lookup values for group `society_type` (Apartment, Duplex).
 *     tags: [Dropdown Master]
 *     responses:
 *       200:
 *         description: List of society types
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DropdownResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/Dropdown/SocietyType", controller.societyType);


module.exports = router;