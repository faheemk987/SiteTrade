const mongoose = require("mongoose");

const purchaseRequestSchema = new mongoose.Schema(
  {
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    website: { type: mongoose.Schema.Types.ObjectId, ref: "Website", required: true },
    message: { type: String, required: [true, "Message is required"], trim: true, maxlength: 2000 },
    proposedPrice: { type: Number, min: 0, default: null },
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected", "In Discussion", "Payment Pending", "Completed", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

purchaseRequestSchema.index({ buyer: 1, website: 1, status: 1 });

module.exports = mongoose.model("PurchaseRequest", purchaseRequestSchema);
