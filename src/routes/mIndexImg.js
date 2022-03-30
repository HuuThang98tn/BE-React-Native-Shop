const express = require("express");
const router = express.Router();
const mIndex = require("../controller/indexControllerProduct");
const mUpLoad = require("../middleware/upLoadIndex");

router.post("/creact_index", mUpLoad.single("imageProduct_"), mIndex.mCreactIndex);
// router.get("/list_index", mIndex.mListIndex);
// router.put("/edit_index", mIndex.mEditIndex);
// router.delete("/delete_index", mIndex.mDeleteIndex);

 router.get("/list-index/:id", mIndex.mIndexID);

module.exports = router;
