const mongoose = require("mongoose");
const Message = require("../models/Message");
const PurchaseRequest = require("../models/PurchaseRequest");

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

const getRequestForUser = async (requestId, userId) => {
  if (!isValidId(requestId)) return null;
  const request = await PurchaseRequest.findById(requestId);
  if (!request) return null;
  const participant = request.buyer.toString() === userId.toString() || request.seller.toString() === userId.toString();
  return participant ? request : null;
};

const createMessage = async (req, res, next) => {
  try {
    const { request: requestId, message } = req.body;
    const request = await getRequestForUser(requestId, req.user._id);
    if (!request) return res.status(404).json({ success: false, message: "Purchase request not found" });
    if (!message || !message.trim()) return res.status(400).json({ success: false, message: "Message is required" });
    if (["Cancelled", "Completed", "Rejected"].includes(request.status)) return res.status(400).json({ success: false, message: "This request is no longer active" });

    const receiver = request.buyer.toString() === req.user._id.toString() ? request.seller : request.buyer;
    const created = await Message.create({ request: request._id, sender: req.user._id, receiver, message: message.trim() });
    if (request.status === "Pending" || request.status === "Accepted") {
      request.status = "In Discussion";
      await request.save();
    }
    const populated = await Message.findById(created._id).populate("sender", "name").populate("receiver", "name");
    res.status(201).json({ success: true, data: populated });
  } catch (error) { next(error); }
};

const getMessages = async (req, res, next) => {
  try {
    const request = await getRequestForUser(req.params.requestId, req.user._id);
    if (!request) return res.status(404).json({ success: false, message: "Purchase request not found" });
    const messages = await Message.find({ request: request._id }).populate("sender", "name").populate("receiver", "name").sort({ createdAt: 1 });
    res.json({ success: true, data: messages });
  } catch (error) { next(error); }
};

module.exports = { createMessage, getMessages };
