const asyncHandler = require("../middlewares/async.middleware");
const APIResponse = require("../utils/response");
const service = require("../services/visitor.service");

/* ======================= CHECK-IN ======================= */
const checkInVisitor = async (req, res) => {
    try {
        await service.checkInVisitor(req.body);
        return res.status(200).json({
            statusCode: 200,
            success: true,
            message: "Visitor checked-in successfully",
            data: null,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            success: false,
            message: error.message,
            data: null,
            timestamp: new Date().toISOString()
        });
    }
};

/* ======================= CHECK-OUT ======================= */
const checkOutVisitor = async (req, res) => {
    try {
        await service.checkOutVisitor(req.body);
        return res.status(200).json({
            statusCode: 200,
            success: true,
            message: "Visitor checked-out successfully",
            data: null,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            success: false,
            message: error.message,
            data: null,
            timestamp: new Date().toISOString()
        });
    }
};

/* ======================= UPDATE ======================= */
const updateVisitor = async (req, res) => {
    try {
        await service.updateVisitor(req.body);
        return res.status(200).json({
            statusCode: 200,
            success: true,
            message: "Visitor updated successfully",
            data: null,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            success: false,
            message: error.message,
            data: null,
            timestamp: new Date().toISOString()
        });
    }
};

/* ======================= GET BY ID ======================= */
const getVisitorById = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await service.getVisitorById(id);

        if (!result[0] || result[0].length === 0) {
            return res.status(404).json({
                statusCode: 404,
                success: false,
                message: "Data not found",
                data: null,
                timestamp: new Date().toISOString()
            });
        }

        return res.status(200).json({
            statusCode: 200,
            success: true,
            message: "Visitor fetched successfully",
            data: result[0][0],
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            success: false,
            message: error.message,
            data: null,
            timestamp: new Date().toISOString()
        });
    }
};

/* ======================= GET TODAY ======================= */
const getTodayVisitors = async (req, res) => {
    try {
        const { society_id, org_id } = req.query;

        const [result] = await service.getTodayVisitors(
            society_id || null,
            org_id ? parseInt(org_id) : null
        );

        return res.status(200).json({
            statusCode: 200,
            success: true,
            message: "Today's visitors fetched successfully",
            data: result[0],
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            success: false,
            message: error.message,
            data: null,
            timestamp: new Date().toISOString()
        });
    }
};

/* ======================= GET ACTIVE ======================= */
const getActiveVisitors = async (req, res) => {
    try {
        const { society_id, org_id } = req.query;

        const [result] = await service.getActiveVisitors(
            society_id || null,
            org_id ? parseInt(org_id) : null
        );

        return res.status(200).json({
            statusCode: 200,
            success: true,
            message: "Active visitors fetched successfully",
            data: result[0],
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            success: false,
            message: error.message,
            data: null,
            timestamp: new Date().toISOString()
        });
    }
};

/* ======================= HISTORY BY FLAT ======================= */
const getVisitorHistoryByFlat = async (req, res) => {
    try {
        const { flat_id, society_id, org_id } = req.query;

        if (!flat_id) {
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: "flat_id query parameter is required.",
                data: null
            });
        }

        const [result] = await service.getVisitorHistoryByFlat(
            flat_id,
            society_id || null,
            org_id ? parseInt(org_id) : null
        );

        return res.status(200).json({
            statusCode: 200,
            success: true,
            message: "Visitor history fetched successfully",
            data: result[0],
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            success: false,
            message: error.message,
            data: null,
            timestamp: new Date().toISOString()
        });
    }
};

/* ======================= SEARCH ======================= */
const searchVisitors = async (req, res) => {
    try {
        const [result] = await service.searchVisitors(req.body);

        return res.status(200).json({
            statusCode: 200,
            success: true,
            message: "Search result fetched successfully",
            data: result[0],
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            success: false,
            message: error.message,
            data: null,
            timestamp: new Date().toISOString()
        });
    }
};

/* ======================= VISITOR ENTRY STATUS ======================= */
const visitorEntryStatus = asyncHandler(async (req, res) => {
    const data = await service.getVisitorEntryStatus();
    return APIResponse.send(res, {
        statusCode: 200,
        success: true,
        message: "Visitor entry status fetched successfully",
        data: data
    });
});

/* ======================= VISITOR TYPE ======================= */
const visitorType = asyncHandler(async (req, res) => {
    const data = await service.getVisitorType();
    return APIResponse.send(res, {
        statusCode: 200,
        success: true,
        message: "Visitor type fetched successfully",
        data: data
    });
});

module.exports = {
    checkInVisitor,
    checkOutVisitor,
    updateVisitor,
    getVisitorById,
    getTodayVisitors,
    getActiveVisitors,
    getVisitorHistoryByFlat,
    searchVisitors,
    visitorEntryStatus,
    visitorType
};