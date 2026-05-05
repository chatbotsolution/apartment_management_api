const service = require("../services/maintenanceBill.service");
const APIResponse = require("../utils/response");
const asyncHandler = require("../middlewares/async.middleware");


/* ======================= GENERATE FEE ======================= */
const create = asyncHandler(async (req, res) => {
    const b = req.body;

    const result = await service.execute(
        "INSERT",
        null,
        b.flatId,
        b.ownerId,
        b.amount,
        b.penaltyAmount,
        b.monthYear,
        b.dueDate,
        null,
        b.statusId,
        null,
        null,
        null,
        b.notes,
        b.createdBy
    );

    return APIResponse.send(res,
        APIResponse.successResponse("Maintenance fee generated", result)
    );
});


/* ======================= UPDATE ======================= */
const update = asyncHandler(async (req, res) => {
    const b = req.body;

    const result = await service.execute(
        "UPDATE",
        b.feeId,
        null,
        null,
        b.amount,
        b.penaltyAmount,
        null,
        b.dueDate,
        null,
        b.statusId,
        null,
        null,
        null,
        b.notes,
        null,
        b.updatedBy
    );

    return APIResponse.send(res,
        APIResponse.successResponse("Maintenance fee updated", result)
    );
});


/* ======================= PAY ======================= */
const pay = asyncHandler(async (req, res) => {
    const b = req.body;

    const result = await service.execute(
        "PAY",
        b.feeId,
        null,
        null,
        null,
        null,
        null,
        null,
        b.paidDate,
        b.statusId,
        b.paymentModeId,
        b.transactionRef,
        b.receiptNumber,
        null,
        null,
        b.updatedBy
    );

    return APIResponse.send(res,
        APIResponse.successResponse("Payment successful", result)
    );
});


/* ======================= GET BY ID ======================= */
const getById = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);

    const data = await service.execute("GET_BY_ID", id);

    return APIResponse.send(res, APIResponse.emptyOr404(data?.[0]));
});


/* ======================= GET ALL ======================= */
const getAll = asyncHandler(async (req, res) => {
    const flatId = parseInt(req.query.flatId);

    if (!flatId) {
        return APIResponse.send(res,
            APIResponse.badRequestResponse("flatId required")
        );
    }

    const data = await service.execute("GET_ALL", null, flatId);

    return APIResponse.send(res,
        APIResponse.successResponse("Maintenance fees", data?.[0])
    );
});


module.exports = {
    create,
    update,
    pay,
    getById,
    getAll
};