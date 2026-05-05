const db = require("../config/db");

/* ======================= EXECUTE SP ======================= */
const execute = async (
    action,
    requestId = null,
    flatId = null,
    ownerId = null,
    tenantId = null,
    title = null,
    description = null,
    categoryId = null,
    priorityId = null,
    statusId = null,
    assignedStaffId = null,
    scheduledAt = null,
    completedAt = null,
    estimatedCost = null,
    actualCost = null,
    costBorneById = null,
    remarks = null,
    beforePhotoUrl = null,
    afterPhotoUrl = null
) => {

    const [rows] = await db.query(
        "CALL sp_maintenance_request(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [
            action,
            requestId,
            flatId,
            ownerId,
            tenantId,
            title,
            description,
            categoryId,
            priorityId,
            statusId,
            assignedStaffId,
            scheduledAt,
            completedAt,
            estimatedCost,
            actualCost,
            costBorneById,
            remarks,
            beforePhotoUrl,
            afterPhotoUrl
        ]
    );

    return rows;
};

module.exports = {
    execute
};