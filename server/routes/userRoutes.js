const express = require("express");
const router = express.Router();
const { getProfile, updateProfile, getMyWebsites } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);
router.get("/my-websites", authMiddleware, getMyWebsites);

module.exports = router;
