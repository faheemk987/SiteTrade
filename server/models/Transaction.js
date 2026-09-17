const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  website: { type: mongoose.Schema.Types.ObjectId, ref: "Website", required: true },
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  request: { type: mongoose.Schema.Types.ObjectId, ref: "PurchaseRequest", required: true, unique: true },
  agreedPrice: { type: Number, required: true, min: 0 },
  platformCommission: { type: Number, required: true, min: 0 },
  sellerAmount: { type: Number, required: true, min: 0 },
  status: { type: String, enum: ["Completed"], default: "Completed" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Transaction", transactionSchema);
