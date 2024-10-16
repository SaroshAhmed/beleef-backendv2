const express = require("express");
const router = express.Router();

const {
    login,
    register,
    logout,
    logoutFromAllDevices,
    resetPasswordToken,
    resetPassword,
    refreshToken
  } = require("../../../controllers/admin/auth")
const { auth,isAdmin } = require("../../../middleware/auth");


router.post("/login", login)
router.get("/logout",isAdmin, logout)
router.get("/logoutfromalldevices",isAdmin,logoutFromAllDevices)
router.post("/register", register)
router.post("/reset-password-token", resetPasswordToken)
router.post("/reset-password", resetPassword)
router.post('/refresh-token',refreshToken);
router.get('/me',isAdmin,(req,res)=>{
    res.status(200).json({success:true,data:req.user})
})

module.exports = router;
