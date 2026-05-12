const service = require("../services/designation.service");

/* ======================= CREATE ======================= */
const createDesignation = async (req, res) => {
    try {

        const [result] = await service.createDesignation(req.body);

        return res.status(200).json({
            statusCode: 200,
            success: true,
            message: "Success",
            data: [
                {
                    designation_id: result[0][0].designation_id,
                    message: result[0][0].message
                }
            ],
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
const updateDesignation = async (req, res) => {
    try {

        await service.updateDesignation(req.body);

        return res.status(200).json({
            statusCode: 200,
            success: true,
            message: "Success",
            data: [
                {
                    designation_id: req.body.designation_id,
                    message: "Designation updated successfully"
                }
            ],
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


/* ======================= DELETE ======================= */
const deleteDesignation = async (req, res) => {
    try {

        const { id } = req.params;

        await service.deleteDesignation(id);

        return res.status(200).json({
            statusCode: 200,
            success: true,
            message: "Designation deleted successfully",
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
const getDesignationById = async (req, res) => {
    try {

        const { id } = req.params;

        const [result] = await service.getDesignationById(id);

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
            message: "Designation fetched successfully",
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


/* ======================= GET ALL ======================= */
const getAllDesignations = async (req, res) => {
    try {

        const [result] = await service.getAllDesignations();

        return res.status(200).json({
            statusCode: 200,
            success: true,
            message: "Designation list fetched successfully",
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

module.exports = {
    createDesignation,
    updateDesignation,
    deleteDesignation,
    getDesignationById,
    getAllDesignations
};