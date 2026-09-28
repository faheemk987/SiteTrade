const express = require("express");
const router = express.Router();
const { getProfile, updateProfile, getMyWebsites } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const approvalMiddleware = require("../middleware/approvalMiddleware");

router.get("/profile", authMiddleware, approvalMiddleware, getProfile);
router.put("/profile", authMiddleware, approvalMiddleware, updateProfile);
router.get("/my-websites", authMiddleware, approvalMiddleware, getMyWebsites);

module.exports = router;
