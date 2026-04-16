const tenantService = require("../services/tenant.service");
const APIResponse = require("../utils/response");
const asyncHandler = require("../middlewares/async.middleware");
const fs = require("fs");
const path = require("path");

/* ======================= GET ALL ======================= */
const getAll = asyncHandler(async (req, res) => {
    const data = await tenantService.getAll();
    return APIResponse.send(res, APIResponse.emptyOr404(data));
});

/* ======================= GET BY ID ======================= */
const getById = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const data = await tenantService.getById(id);
    return APIResponse.send(res, APIResponse.emptyOr404(data));
});

/* ======================= CREATE ======================= */
const create = asyncHandler(async (req, res) => {

    const files = req.files || {};

    const saveFile = (file) => {
        if (!file) return null;

        const fileName = Date.now() + "-" + file.originalname;
        const uploadPath = path.join(__dirname, "../uploads/tenant");

        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }

        const filePath = path.join(uploadPath, fileName);
        fs.writeFileSync(filePath, file.buffer);

        return fileName;
    };

    const payload = {
        ...req.body,

        Aadhaar_Document: saveFile(files.Aadhaar_Document?.[0]),
        PAN_Document: saveFile(files.PAN_Document?.[0]),
        Passport_Document: saveFile(files.Passport_Document?.[0]),
        Profile_Photo: saveFile(files.Profile_Photo?.[0]),
    };

    const result = await tenantService.create(payload);

    return APIResponse.send(res, APIResponse.successResponse(result));
});
/* ======================= UPDATE ======================= */
const update = asyncHandler(async (req, res) => {

    const files = req.files || {};

    const saveFile = (file, oldFile) => {
        if (!file) return oldFile; // keep old file

        const fileName = Date.now() + "-" + file.originalname;
        const uploadPath = path.join(__dirname, "../uploads/tenant");

        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }

        const filePath = path.join(uploadPath, fileName);

        fs.writeFileSync(filePath, file.buffer);

        return fileName;
    };

    const payload = {
        ...req.body,

        Aadhaar_Document: saveFile(files.Aadhaar_Document?.[0], req.body.Aadhaar_Document),
        PAN_Document: saveFile(files.PAN_Document?.[0], req.body.PAN_Document),
        Passport_Document: saveFile(files.Passport_Document?.[0], req.body.Passport_Document),
        Profile_Photo: saveFile(files.Profile_Photo?.[0], req.body.Profile_Photo),
    };

    const result = await tenantService.update(payload);

    return APIResponse.send(res, APIResponse.successResponse(result));
});

/* ======================= STATUS CHANGE ======================= */
const changeStatus = asyncHandler(async (req, res) => {

    const { Tenant_Id, Is_Active, Updated_By } = req.params;

    const result = await tenantService.changeStatus({
        Tenant_Id: parseInt(Tenant_Id),
        Is_Active: Is_Active === "true" || Is_Active === true,
        Updated_By: parseInt(Updated_By)
    });

    return APIResponse.send(res, APIResponse.successResponse(result));
});

/* ======================= DELETE ======================= */
const remove = asyncHandler(async (req, res) => {

    const { Tenant_Id, Updated_By } = req.params;

    const result = await tenantService.remove({
        Tenant_Id: parseInt(Tenant_Id),
        Updated_By: parseInt(Updated_By)
    });

    return APIResponse.send(res, APIResponse.successResponse(result));
});

module.exports = {
    getAll,
    getById,
    create,
    update,
    changeStatus,
    remove
};