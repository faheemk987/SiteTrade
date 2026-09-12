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

router.route("/").get(getWebsites).post(authMiddleware, createWebsite);

router
  .route("/:id")
  .get(getWebsiteById)
  .put(authMiddleware, updateWebsite)
  .delete(authMiddleware, deleteWebsite);

module.exports = router;
