const service = require("../services/common.service");
const APIResponse = require("../utils/response");
const asyncHandler = require("../middlewares/async.middleware");

/* ======================= GENERIC ACTION HANDLER ======================= */
const byAction = (action, requireSociety = false) =>
    asyncHandler(async (req, res) => {
        
        // 👉 NEW: Do not use parseInt! Allow string with commas for multiple IDs (e.g. "1,2")
        let societyId = req.query.society_id ? req.query.society_id.toString() : null;
        if (societyId) {
            societyId = societyId.replace(/[^0-9,]/g, ""); // Keep only numbers and commas
        }

        if (requireSociety && !societyId) {
            return APIResponse.send(
                res,
                APIResponse.badRequestResponse("society_id required")
            );
        }

        const data = await service.getDropdown(action, societyId);

        return APIResponse.send(res, {
            statusCode: 200,
            success: true,
            message: "Data fetched successfully",
            data: data
        });
    });

/* ================= COMMON HANDLER ================= */
const getLookupByGroup = (groupName) =>
    asyncHandler(async (req, res) => {
        console.log(groupName, "groupName");
        const data = await service.getLookupByGroup(groupName);
        return APIResponse.send(res, {
            statusCode: 200,
            success: true,
            message: "Data fetched successfully",
            data: data
        });
    });

/* ================= CUSTOM INDIVIDUAL APIs ================= */

const societyDropdown = asyncHandler(async (req, res) => {
    // Pull org_id from the authenticated user token context, fallback to query string if needed
    const orgId = req.user?.org_id || (req.query.org_id ? parseInt(req.query.org_id) : null);

    if (!orgId) {
        return APIResponse.send(
            res,
            APIResponse.badRequestResponse("org_id is required to fetch societies")
        );
    }

    const data = await service.getSocietyDropdown(orgId);

    return APIResponse.send(res, {
        statusCode: 200,
        success: true,
        message: "Societies fetched successfully",
        data: data
    });
});
const blockDropdown = asyncHandler(async (req, res) => {
    // Pull org_id from the authenticated user token context, fallback to query string if needed
    const societyId = req.user?.society_id || (req.query.society_id ? parseInt(req.query.society_id) : null);

    if (!societyId) {
        return APIResponse.send(
            res,
            APIResponse.badRequestResponse("society_id is required to fetch block")
        );
    }

    const data = await service.getBlockDropdown(societyId);

    return APIResponse.send(res, {
        statusCode: 200,
        success: true,
        message: "Societies fetched successfully",
        data: data
    });
});

const societyType = asyncHandler(async (req, res) => {
    const data = await service.getSocietyType();

    return APIResponse.send(res, {
        statusCode: 200,
        success: true,
        message: "Society Type fetched successfully",
        data: data
    });
});

/* ======================= ALL LOOKUPS ======================= */
const getAllLookups = asyncHandler(async (req, res) => {
    const data = await service.getAllLookups();
    return APIResponse.send(res, {
        statusCode: 200,
        success: true,
        message: "All lookups fetched",
        data: data
    });
});


/* ================= GROUP LOOKUP APIs ================= */

const gender = getLookupByGroup("gender");
const vehicleType = getLookupByGroup("vehicle_type");
const priority = getLookupByGroup("priority");
const role = getLookupByGroup("role");
const paymentMode = getLookupByGroup("payment_mode");
const shiftTiming = getLookupByGroup("shift_timing");
const parkingSlotType = getLookupByGroup("parking_slot_type");
const parkingSlotStatus = getLookupByGroup("parking_slot_status");
const maintenanceStatus = getLookupByGroup("maintenance_status");
const maintenanceCategory = getLookupByGroup("maintenance_category");
const complaintStatus = getLookupByGroup("complaint_status");
const complaintCategory = getLookupByGroup("complaint_category");
const staffStatus = getLookupByGroup("staff_status");
const ownershipType = getLookupByGroup("ownership_type");
const flatType = getLookupByGroup("flat_type");
const flatStatus = getLookupByGroup("flat_status");
const flatFacing = getLookupByGroup("flat_facing");
const idProofType = getLookupByGroup("id_proof_type");
const occupation = getLookupByGroup("occupation");
const costBorneBy = getLookupByGroup("cost_borne_by");
const feeStatus = getLookupByGroup("fee_status");
const noticeCategory = getLookupByGroup("notice_category");
const noticeTarget = getLookupByGroup("notice_target");
const amenityCategory = getLookupByGroup("amenity_category");
const amenityBookingStatus = getLookupByGroup("amenity_booking_status");

/* ================= ACTION DROP DOWN APIs ================= */

const department = byAction("DEPARTMENT");
const designation = byAction("DESIGNATION");
//const block = byAction("BLOCK", true); // requires society_id
const floor = byAction("FLOOR");
const flat = byAction("FLAT");
const owner = byAction("OWNER");
const tenant = byAction("TENANT");
const staff = byAction("STAFF");
const parkingSlot = byAction("PARKING_SLOT");
const vehicle = byAction("VEHICLE");
const amenity = byAction("AMENITY");
const visitor = byAction("VISITOR");


/* ======================= EXPORT ======================= */
module.exports = {
    // Custom & Common
    blockDropdown,
    societyDropdown, // 👈 Maps route request directly to our explicit custom function
    societyType,
    getAllLookups,

    // Group Lookup APIs
    gender,
    vehicleType,
    priority,
    role,
    paymentMode,
    shiftTiming,
    parkingSlotType,
    parkingSlotStatus,
    maintenanceStatus,
    maintenanceCategory,
    complaintStatus,
    complaintCategory,
    staffStatus,
    ownershipType,
    flatType,
    flatStatus,
    flatFacing,
    idProofType,
    occupation,
    costBorneBy,
    feeStatus,
    noticeCategory,
    noticeTarget,
    amenityCategory,
    amenityBookingStatus,

    // Action APIs
    department,
    designation,
    //block,
    floor,
    flat,
    owner,
    tenant,
    staff,
    parkingSlot,
    vehicle,
    amenity,
    visitor
};