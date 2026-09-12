const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getAllWebsites,
  deleteUser,
  deleteWebsite,
  getStats,
} = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// Every route in this file requires a logged-in admin.
router.use(authMiddleware, adminMiddleware);

router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);
router.get("/websites", getAllWebsites);
router.delete("/websites/:id", deleteWebsite);
router.get("/stats", getStats);

module.exports = router;
