const User = require("../models/User");
const Website = require("../models/Website");

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || "");

// @desc    Get the logged-in user's profile
// @route   GET /api/users/profile
// @access  Private
const getProfile = async (req, res, next) => {
  try {
    res.json({
      success: true,
      data: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update the logged-in user's profile (name + email only)
// @route   PUT /api/users/profile
// @access  Private
const updateProfile = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    if (name !== undefined && !name.trim()) {
      return res.status(400).json({ success: false, message: "Name cannot be empty" });
    }
    if (email !== undefined && !isValidEmail(email)) {
      return res.status(400).json({ success: false, message: "A valid email is required" });
    }

    const user = await User.findById(req.user._id);

    if (name !== undefined) user.name = name;
    // A normal user can never change their own role through this endpoint.
    if (email !== undefined) user.email = email;

    const updated = await user.save();

    res.json({
      success: true,
      message: "Profile updated successfully",
      data: {
        id: updated._id,
        name: updated.name,
        email: updated.email,
        role: updated.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get websites belonging to the logged-in user
// @route   GET /api/users/my-websites
// @access  Private
const getMyWebsites = async (req, res, next) => {
  try {
    const websites = await Website.find({ seller: req.user._id }).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: websites.length,
      data: websites,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getProfile, updateProfile, getMyWebsites };
