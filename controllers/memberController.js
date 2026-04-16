const memberService = require("../services/member.service");
const APIResponse = require("../utils/response");
const asyncHandler = require("../middlewares/async.middleware");

const fs = require("fs");
const path = require("path");

const saveFile = (file) => {
    if (!file) return null;

   const uploadDir = path.join(process.cwd(), "public/uploads");

    // ✅ Create folder if not exists
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    const fileName = Date.now() + "-" + file.originalname;
    const filePath = path.join(uploadDir, fileName);

    fs.writeFileSync(filePath, file.buffer);

    return "/uploads/" + fileName; // Return relative path for DB storage
};

const getAll = asyncHandler(async (req, res) => {
    const data = await memberService.getAll();
    return APIResponse.send(res, APIResponse.emptyOr404(data));
});

const getActive = asyncHandler(async (req, res) => {
    const data = await memberService.getActive();
    return APIResponse.send(res, APIResponse.emptyOr404(data));
});

const getById = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const data = await memberService.getById(id);
    return APIResponse.send(res, APIResponse.emptyOr404(data));
});

const getByFlat = asyncHandler(async (req, res) => {
    const flatId = parseInt(req.params.flatId);
    const data = await memberService.getByFlat(flatId);
    return APIResponse.send(res, APIResponse.emptyOr404(data));
});

const create = asyncHandler(async (req, res) => {
    const files = req.files;

    // 👇 Save files
    const Aadhaar_Document = saveFile(files?.Aadhaar_Document?.[0]);
    const PAN_Document = saveFile(files?.PAN_Document?.[0]);
    const Profile_Photo = saveFile(files?.Profile_Photo?.[0]);
    const Ownership_Deed_Doc = saveFile(files?.Ownership_Deed_Doc?.[0]);

    // 👇 Merge into body
    const data = {
        ...req.body,
        Aadhaar_Document,
        PAN_Document,
        Profile_Photo,
        Ownership_Deed_Doc
    };

    const result = await memberService.create(data);

    return APIResponse.send(res, APIResponse.successResponse(result));
});

const update = asyncHandler(async (req, res) => {
    const files = req.files;

    const Aadhaar_Document = saveFile(files?.Aadhaar_Document?.[0]);
    const PAN_Document = saveFile(files?.PAN_Document?.[0]);
    const Profile_Photo = saveFile(files?.Profile_Photo?.[0]);
    const Ownership_Deed_Doc = saveFile(files?.Ownership_Deed_Doc?.[0]);

    const data = {
        ...req.body,
        Aadhaar_Document,
        PAN_Document,
        Profile_Photo,
        Ownership_Deed_Doc
    };

    const result = await memberService.update(data);

    return APIResponse.send(res, APIResponse.successResponse(result));
});

const remove = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const result = await memberService.delete(id);
    return APIResponse.send(res, APIResponse.successResponse(result));
});

module.exports = { getAll, getActive, getById, getByFlat, create, update, remove };