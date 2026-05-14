const service = require("../services/common.service");
const APIResponse = require("../utils/response");
const asyncHandler = require("../middlewares/async.middleware");

/* ======================= GENERIC ACTION HANDLER ======================= */
const byAction = (action, requireSociety = false) =>
    asyncHandler(async (req, res) => {
        const societyId = req.query.society_id
            ? parseInt(req.query.society_id)
            : null;

        if (requireSociety && !societyId) {
            return APIResponse.send(
                res,
                APIResponse.badRequestResponse("society_id required")
            );
        }

        // ✅ FIXED: Calling the correct function from your service!
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

/* ================= GROUP APIs ================= */

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

/* ================= ACTION APIs ================= */

const department = byAction("DEPARTMENT");
const designation = byAction("DESIGNATION");
const society = byAction("SOCIETY");
const block = byAction("BLOCK", true); // requires society_id
const floor = byAction("FLOOR");
const flat = byAction("FLAT");
const owner = byAction("OWNER");
const tenant = byAction("TENANT");
const staff = byAction("STAFF");
const parkingSlot = byAction("PARKING_SLOT");
const vehicle = byAction("VEHICLE");
const amenity = byAction("AMENITY");
const visitor = byAction("VISITOR");

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

/* ======================= EXPORT ======================= */
module.exports = {
    // lookup group APIs
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

    // action APIs
    department,
    designation,
    society,
    block,
    floor,
    flat,
    owner,
    tenant,
    staff,
    parkingSlot,
    vehicle,
    amenity,
    visitor,

    // common
    getAllLookups
};