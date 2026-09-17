const User = require("../models/User");
const Website = require("../models/Website");
const PurchaseRequest = require("../models/PurchaseRequest");
const Transaction = require("../models/Transaction");

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });

    res.json({ success: true, count: users.length, data: users });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all website listings
// @route   GET /api/admin/websites
// @access  Private/Admin
const getAllWebsites = async (req, res, next) => {
  try {
    const websites = await Website.find().populate("seller", "name email").sort({ createdAt: -1 });

    res.json({ success: true, count: websites.length, data: websites });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a user (and their website listings)
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Remove the user's listings too, so no orphaned websites are left behind.
    await Website.deleteMany({ seller: user._id });
    await user.deleteOne();

    res.json({ success: true, message: "User and their listings deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete any website listing
// @route   DELETE /api/admin/websites/:id
// @access  Private/Admin
const deleteWebsite = async (req, res, next) => {
  try {
    const website = await Website.findById(req.params.id);

    if (!website) {
      return res.status(404).json({ success: false, message: "Website not found" });
    }

    await website.deleteOne();

    res.json({ success: true, message: "Website deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// @desc    Get platform-wide statistics
// @route   GET /api/admin/stats
// @access  Private/Admin
const getStats = async (req, res, next) => {
  try {
    const [totalUsers, totalWebsites, totalRequests, completedSales, commission] = await Promise.all([
      User.countDocuments(),
      Website.countDocuments(),
      PurchaseRequest.countDocuments(),
      PurchaseRequest.countDocuments({ status: "Completed" }),
      Transaction.aggregate([{ $match: { status: "Completed" } }, { $group: { _id: null, total: { $sum: "$platformCommission" } } }]),
    ]);

    res.json({
      success: true,
      data: {
        totalUsers,
        totalWebsites,
        // There is no separate "inactive" status in this simple schema,
        // so every listing currently counts as an active listing.
        activeListings: totalWebsites,
        totalRequests,
        completedSales,
        totalCommission: commission[0]?.total || 0,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getAllRequests = async (req, res, next) => {
  try {
    const requests = await PurchaseRequest.find()
      .populate("buyer", "name email")
      .populate("seller", "name email")
      .populate("website", "name price")
      .sort({ createdAt: -1 });
    res.json({ success: true, data: requests });
  } catch (error) { next(error); }
};

const getAllTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find()
      .populate("buyer", "name email")
      .populate("seller", "name email")
      .populate("website", "name")
      .sort({ createdAt: -1 });
    res.json({ success: true, data: transactions });
  } catch (error) { next(error); }
};

module.exports = { getAllUsers, getAllWebsites, deleteUser, deleteWebsite, getStats, getAllRequests, getAllTransactions };
