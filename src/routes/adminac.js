const express = require("express");
const router= express.Router();
const mAdminAc = require("../controller/accountAdminController");

router.post("/register",mAdminAc.mRegister);

router.post("/login",mAdminAc.mLogin);

router.put("/refresh_password/:id",mAdminAc.mRefresh);

router.post("/reset_password",mAdminAc.mReset);

router.get("/new_password/:userID/:token",mAdminAc.mGetNewResetPassWord);

router.put("/link_reset/:userID/:token",mAdminAc.mNewResetPassWord);

module.exports = router ; 