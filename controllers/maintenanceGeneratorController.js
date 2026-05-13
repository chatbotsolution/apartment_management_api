const service = require("../services/maintenanceGenerator.service");
const APIResponse = require("../utils/response");
const asyncHandler = require("../middlewares/async.middleware");

/* ======================= GENERATE MONTHLY FEES ======================= */
const generate = asyncHandler(async (req, res) => {
    // month should be in 'YYYY-MM' format for correct DB sorting
    const { month, dueDate, createdBy } = req.body;

    // 1. Validation
    if (!month || !dueDate || !createdBy) {
        return APIResponse.send(
            res,
            APIResponse.badRequestResponse("month, dueDate, and createdBy (ID) are required")
        );
    }

    // 2. Execution
    // result typically contains: { affectedRows: X, info: '...' }
    const result = await service.generate(month, dueDate, createdBy);

    // 3. Response
    return APIResponse.send(
        res,
        APIResponse.successResponse("Maintenance generated successfully for all eligible flats", result)
    );
});

module.exports = {
    generate
};