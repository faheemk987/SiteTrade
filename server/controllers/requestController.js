const mongoose = require("mongoose");
const PurchaseRequest = require("../models/PurchaseRequest");
const Website = require("../models/Website");
const Transaction = require("../models/Transaction");

const statuses = ["Pending", "Accepted", "Rejected", "In Discussion", "Payment Pending", "Completed", "Cancelled"];
const activeStatuses = ["Pending", "Accepted", "In Discussion", "Payment Pending"];
const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

const populateRequest = (query) => query
  .populate("buyer", "name email")
  .populate("seller", "name email")
  .populate("website", "name price screenshots image listingStatus");

const canAccess = (request, userId) =>
  request.buyer._id.toString() === userId.toString() || request.seller._id.toString() === userId.toString();

const createRequest = async (req, res, next) => {
  try {
    const { website: websiteId, message, proposedPrice } = req.body;
    if (!isValidId(websiteId)) return res.status(400).json({ success: false, message: "A valid website is required" });
    if (!message || !message.trim()) return res.status(400).json({ success: false, message: "Message is required" });
    if (proposedPrice !== undefined && proposedPrice !== null && proposedPrice !== "" && (!Number.isFinite(Number(proposedPrice)) || Number(proposedPrice) < 0)) {
      return res.status(400).json({ success: false, message: "Proposed price must be a non-negative number" });
    }

    const website = await Website.findById(websiteId);
    if (!website) return res.status(404).json({ success: false, message: "Website not found" });
    if (website.seller.toString() === req.user._id.toString()) return res.status(400).json({ success: false, message: "You cannot request to buy your own website" });
    if (website.listingStatus === "Sold" || website.listingStatus === "Removed") return res.status(400).json({ success: false, message: "This website is no longer available" });

    const duplicate = await PurchaseRequest.findOne({
      buyer: req.user._id,
      website: website._id,
      status: { $in: activeStatuses },
    });
    if (duplicate) return res.status(409).json({ success: false, message: "You already have an active request for this website" });

    const request = await PurchaseRequest.create({
      buyer: req.user._id,
      seller: website.seller,
      website: website._id,
      message: message.trim(),
      proposedPrice: proposedPrice === "" || proposedPrice === undefined || proposedPrice === null ? null : Number(proposedPrice),
    });

    await Website.findByIdAndUpdate(website._id, { listingStatus: "Under Discussion" });
    res.status(201).json({ success: true, message: "Your purchase request has been sent to the seller.", data: await populateRequest(PurchaseRequest.findById(request._id)) });
  } catch (error) {
    next(error);
  }
};

const getSentRequests = async (req, res, next) => {
  try {
    const requests = await populateRequest(PurchaseRequest.find({ buyer: req.user._id }).sort({ createdAt: -1 }));
    res.json({ success: true, data: requests });
  } catch (error) { next(error); }
};

const getReceivedRequests = async (req, res, next) => {
  try {
    const requests = await populateRequest(PurchaseRequest.find({ seller: req.user._id }).sort({ createdAt: -1 }));
    res.json({ success: true, data: requests });
  } catch (error) { next(error); }
};

const getRequestById = async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) return res.status(400).json({ success: false, message: "Invalid request id" });
    const request = await populateRequest(PurchaseRequest.findById(req.params.id));
    if (!request) return res.status(404).json({ success: false, message: "Purchase request not found" });
    if (!canAccess(request, req.user._id) && req.user.role !== "admin") return res.status(403).json({ success: false, message: "Forbidden" });
    res.json({ success: true, data: request });
  } catch (error) { next(error); }
};

const updateRequestStatus = async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) return res.status(400).json({ success: false, message: "Invalid request id" });
    const { status } = req.body;
    if (!statuses.includes(status)) return res.status(400).json({ success: false, message: "Invalid request status" });
    const request = await PurchaseRequest.findById(req.params.id).populate("website");
    if (!request) return res.status(404).json({ success: false, message: "Purchase request not found" });
    const isSeller = request.seller.toString() === req.user._id.toString();
    if (!isSeller && req.user.role !== "admin") return res.status(403).json({ success: false, message: "Only the seller can update this request" });
    if (request.status === "Completed" && status !== "Completed") return res.status(400).json({ success: false, message: "Completed requests cannot be changed" });
    if (status === "Cancelled") return res.status(400).json({ success: false, message: "Use the cancel request action" });

    request.status = status;
    await request.save();

    if (status === "Accepted" || status === "In Discussion" || status === "Payment Pending") {
      await Website.findByIdAndUpdate(request.website._id, { listingStatus: "Under Discussion" });
    }
    if (status === "Completed") {
      const agreedPrice = request.proposedPrice ?? request.website.price;
      const platformCommission = Math.round(agreedPrice * 0.1 * 100) / 100;
      const sellerAmount = Math.round((agreedPrice - platformCommission) * 100) / 100;
      await Transaction.findOneAndUpdate(
        { request: request._id },
        { website: request.website._id, buyer: request.buyer, seller: request.seller, request: request._id, agreedPrice, platformCommission, sellerAmount, status: "Completed" },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      await Website.findByIdAndUpdate(request.website._id, { listingStatus: "Sold" });
    }

    res.json({ success: true, message: "Request status updated", data: await populateRequest(PurchaseRequest.findById(request._id)) });
  } catch (error) { next(error); }
};

const cancelRequest = async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) return res.status(400).json({ success: false, message: "Invalid request id" });
    const request = await PurchaseRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ success: false, message: "Purchase request not found" });
    if (request.buyer.toString() !== req.user._id.toString()) return res.status(403).json({ success: false, message: "Only the buyer can cancel this request" });
    if (request.status !== "Pending") return res.status(400).json({ success: false, message: "Only pending requests can be cancelled" });
    request.status = "Cancelled";
    await request.save();
    res.json({ success: true, message: "Purchase request cancelled", data: request });
  } catch (error) { next(error); }
};

module.exports = { createRequest, getSentRequests, getReceivedRequests, getRequestById, updateRequestStatus, cancelRequest };
