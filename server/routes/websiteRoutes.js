const express = require("express");
const router = express.Router();
const {
  createWebsite,
  getWebsites,
  getWebsiteById,
  updateWebsite,
  deleteWebsite,
} = require("../controllers/websiteController");
const authMiddleware = require("../middleware/authMiddleware");
const approvalMiddleware = require("../middleware/approvalMiddleware");

router.route("/").get(getWebsites).post(authMiddleware, approvalMiddleware, createWebsite);

router
  .route("/:id")
  .get(getWebsiteById)
  .put(authMiddleware, approvalMiddleware, updateWebsite)
  .delete(authMiddleware, approvalMiddleware, deleteWebsite);

module.exports = router;
