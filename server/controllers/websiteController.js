const Website = require("../models/Website");

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || "");

// @desc    Create a new website listing
// @route   POST /api/websites
// @access  Private
const createWebsite = async (req, res, next) => {
  try {
    const {
      name,
      url,
      category,
      description,
      fullDescription,
      age,
      frontendTechnology,
      backendTechnology,
      database,
      technology,
      hosting,
      screenshots,
      price,
      sellerEmail,
    } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: "Website name is required" });
    }
    if (!category) {
      return res.status(400).json({ success: false, message: "Category is required" });
    }
    if (!description) {
      return res.status(400).json({ success: false, message: "Description is required" });
    }
    if (price === undefined || price === null || Number(price) < 0) {
      return res.status(400).json({ success: false, message: "Price must be a number greater than or equal to 0" });
    }
    if (!isValidEmail(sellerEmail)) {
      return res.status(400).json({ success: false, message: "A valid seller email is required" });
    }

    // Seller is always taken from the logged-in user, never from the request body.
    const website = await Website.create({
      seller: req.user._id,
      name,
      url,
      category,
      description,
      fullDescription,
      age,
      frontendTechnology,
      backendTechnology,
      database,
      technology,
      hosting,
      screenshots,
      price,
      sellerEmail,
    });

    res.status(201).json({
      success: true,
      message: "Website listed successfully",
      data: website,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all website listings, with optional search/filters
// @route   GET /api/websites?search=&category=&technology=&minPrice=&maxPrice=
// @access  Public
const getWebsites = async (req, res, next) => {
  try {
    const { search, category, technology, minPrice, maxPrice } = req.query;
    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ];
    }

    if (category && category !== "All Categories") {
      query.category = category;
    }

    if (technology && technology !== "All Technologies") {
      query.technology = technology;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const websites = await Website.find(query)
      .populate("seller", "name email")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: websites.length,
      data: websites,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get a single website listing by id
// @route   GET /api/websites/:id
// @access  Public
const getWebsiteById = async (req, res, next) => {
  try {
    const website = await Website.findById(req.params.id).populate("seller", "name email");

    if (!website) {
      return res.status(404).json({ success: false, message: "Website not found" });
    }

    res.json({ success: true, data: website });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a website listing
// @route   PUT /api/websites/:id
// @access  Private (owner or admin)
const updateWebsite = async (req, res, next) => {
  try {
    const website = await Website.findById(req.params.id);

    if (!website) {
      return res.status(404).json({ success: false, message: "Website not found" });
    }

    const isOwner = website.seller.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ success: false, message: "Forbidden: you do not own this listing" });
    }

    const editableFields = [
      "name",
      "url",
      "category",
      "description",
      "fullDescription",
      "age",
      "frontendTechnology",
      "backendTechnology",
      "database",
      "technology",
      "hosting",
      "screenshots",
      "price",
      "sellerEmail",
    ];

    editableFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        website[field] = req.body[field];
      }
    });

    const updated = await website.save();

    res.json({
      success: true,
      message: "Website updated successfully",
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a website listing
// @route   DELETE /api/websites/:id
// @access  Private (owner or admin)
const deleteWebsite = async (req, res, next) => {
  try {
    const website = await Website.findById(req.params.id);

    if (!website) {
      return res.status(404).json({ success: false, message: "Website not found" });
    }

    const isOwner = website.seller.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ success: false, message: "Forbidden: you do not own this listing" });
    }

    await website.deleteOne();

    res.json({ success: true, message: "Website deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createWebsite,
  getWebsites,
  getWebsiteById,
  updateWebsite,
  deleteWebsite,
};
