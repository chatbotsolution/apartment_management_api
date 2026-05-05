const service = require("../services/maintenanceGenerator.service");
const APIResponse = require("../utils/response");
const asyncHandler = require("../middlewares/async.middleware");


/* ======================= GENERATE MONTHLY FEES ======================= */
const generate = asyncHandler(async (req, res) => {

    const { month, dueDate, createdBy } = req.body;

    if (!month || !dueDate) {
        return APIResponse.send(
            res,
            APIResponse.badRequestResponse("month and dueDate required")
        );
    }

    const result = await service.generate(month, dueDate, createdBy);

    return APIResponse.send(
        res,
        APIResponse.successResponse("Maintenance generated successfully", result)
    );
});

module.exports = {
    generate
};