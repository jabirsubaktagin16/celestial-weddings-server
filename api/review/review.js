import mongoose, { Schema, model } from "mongoose";

const reviewSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Vendor",
  },
  rating: { type: Number },
  reviewDescription: {
    type: String,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default model("Review", reviewSchema);
