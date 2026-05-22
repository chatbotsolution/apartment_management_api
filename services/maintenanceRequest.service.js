const db = require("../config/db");

/**
 * Executes the Maintenance Request Stored Procedure
 * Handles: INSERT, UPDATE, ASSIGN, COMPLETE, GET_BY_ID, GET_ALL
 */
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
    afterPhotoUrl = null,
    limit = null,
    offset = null,
    societyId = null,   // 👈 NEW
    orgId = null        // 👈 NEW
) => {
    try {
        const safeSocietyId = societyId ? String(societyId) : null;
        const safeOrgId = orgId ? Number(orgId) : null;

        const [rows] = await db.query(
            `CALL sp_maintenance_request(
                ?, ?, ?, ?, ?,
                ?, ?, ?, ?, ?,
                ?, ?, ?, ?, ?,
                ?, ?, ?, ?, ?,
                ?, ?, ?
            )`,
            [
                action,             // 1
                requestId,          // 2
                flatId,             // 3
                ownerId,            // 4
                tenantId,           // 5
                title,              // 6
                description,        // 7
                categoryId,         // 8
                priorityId,         // 9
                statusId,           // 10
                assignedStaffId,    // 11
                scheduledAt,        // 12
                completedAt,        // 13
                estimatedCost,      // 14
                actualCost,         // 15
                costBorneById,      // 16
                remarks,            // 17
                beforePhotoUrl,     // 18
                afterPhotoUrl,      // 19
                limit,              // 20
                offset,             // 21
                safeSocietyId,      // 22 👈 NEW
                safeOrgId           // 23 👈 NEW
            ]
        );

        return rows;
    } catch (error) {
        console.error("Database Service Error (sp_maintenance_request):", error);
        throw error;
    }
};

module.exports = {
    execute
};