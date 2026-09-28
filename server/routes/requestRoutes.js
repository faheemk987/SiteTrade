const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const approvalMiddleware = require("../middleware/approvalMiddleware");
const {
  createRequest,
  getSentRequests,
  getReceivedRequests,
  getRequestById,
  updateRequestStatus,
  cancelRequest,
} = require("../controllers/requestController");

const router = express.Router();
router.use(authMiddleware, approvalMiddleware);
router.post("/", createRequest);
router.get("/sent", getSentRequests);
router.get("/received", getReceivedRequests);
router.get("/:id", getRequestById);
router.put("/:id/status", updateRequestStatus);
router.delete("/:id", cancelRequest);

module.exports = router;
