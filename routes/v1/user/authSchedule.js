const express = require("express");
const router = express.Router();
const {
  generatePdf,
  generatePresignedUrl,
  createAuthSchedule,
  getSignatureUrl
} = require("../../../controllers/user/authSchedule");
const { isAuthenticated } = require("../../../middleware/auth");

router.post("/generatePdf", isAuthenticated, generatePdf);
router.post("/generatePresignedUrl", isAuthenticated, generatePresignedUrl);
router.post("/", isAuthenticated, createAuthSchedule);
router.get('/get-signature-url/:id', getSignatureUrl);
module.exports = router;
