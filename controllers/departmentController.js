const service = require("../services/department.service");
/* ======================= CREATE ======================= */
const createDepartment = async (req, res) => {
    try {

        const [result] = await service.createDepartment(req.body);

        return res.status(200).json({
            statusCode: 200,
            success: true,
            message: "Success",
            data: [
                {
                    department_id: result[0][0].department_id,
                    message: "Department created successfully"
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
const updateDepartment = async (req, res) => {
    try {

        await service.updateDepartment(req.body);

        return res.status(200).json({
            statusCode: 200,
            success: true,
            message: "Success",
            data: [
                {
                    department_id: req.body.department_id,
                    message: "Department updated successfully"
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
const deleteDepartment = async (req, res) => {
    try {

        const { id } = req.params;

        await service.deleteDepartment(id);

        return res.status(200).json({
            statusCode: 200,
            success: true,
            message: "Department deleted successfully",
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
const getDepartmentById = async (req, res) => {
    try {

        const { id } = req.params;

        const [result] = await service.getDepartmentById(id);

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
            message: "Department fetched successfully",
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
const getAllDepartments = async (req, res) => {
    try {

        const [result] = await service.getAllDepartments();

        return res.status(200).json({
            statusCode: 200,
            success: true,
            message: "Department list fetched successfully",
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
    createDepartment,
    updateDepartment,
    deleteDepartment,
    getDepartmentById,
    getAllDepartments
};