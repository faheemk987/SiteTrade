const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { createMessage, getMessages } = require("../controllers/messageController");

const router = express.Router();
router.use(authMiddleware);
router.post("/", createMessage);
router.get("/:requestId", getMessages);

module.exports = router;
