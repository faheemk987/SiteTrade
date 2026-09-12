const mongoose = require("mongoose");

const websiteSchema = new mongoose.Schema({
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: [true, "Website name is required"],
    trim: true,
  },
  url: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    required: [true, "Category is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  fullDescription: {
    type: String,
  },
  age: {
    type: String,
  },
  frontendTechnology: {
    type: String,
  },
  backendTechnology: {
    type: String,
  },
  database: {
    type: String,
  },
  technology: {
    type: [String],
    default: [],
  },
  hosting: {
    type: String,
  },
  screenshots: {
    type: [String],
    default: [],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [0, "Price must be greater than or equal to 0"],
  },
  sellerEmail: {
    type: String,
    required: [true, "Seller email is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Text index to support the `search` query parameter on GET /api/websites.
websiteSchema.index({ name: "text", description: "text", category: "text" });

module.exports = mongoose.model("Website", websiteSchema);
