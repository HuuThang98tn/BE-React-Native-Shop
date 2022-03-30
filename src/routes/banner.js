const express = require("express");
const router = express.Router();
const mBanner = require("../controller/bannerController.js");
const mUpLoad = require("../middleware/upLoadImageTypeProduct");

router.post("/creact_banner", mUpLoad.single("imageBn"), mBanner.mCreactBanner);
router.get("/list_banner", mBanner.mListBaner);
router.put("/edit_banner", mBanner.mEditBanner);
router.delete("/delete_banner", mBanner.mDeleteBanner);

module.exports = router;
