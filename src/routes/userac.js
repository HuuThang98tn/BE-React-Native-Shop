const express = require("express");
const router= express.Router();
const mUserAc = require("../controller/accountUserController");

router.post("/register",mUserAc.mRegister);

router.post("/login",mUserAc.mLogin);

router.put("/refresh_password/:id",mUserAc.mRefresh);

router.post("/reset_password",mUserAc.mReset);

router.get("/new_password/:userID/:token",mUserAc.mGetNewResetPassWord);

router.put("/link_reset/:userID/:token",mUserAc.mNewResetPassWord);

module.exports = router ; 