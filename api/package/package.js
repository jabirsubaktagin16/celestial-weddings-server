import mongoose, { Schema, model } from "mongoose";

const packageSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  servicesOffered: [
    {
      type: String,
    },
  ],
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Vendor",
  },
  discountStatus: { type: Boolean, default: false, required: true },
  discountPercentage: { type: Number },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default model("Package", packageSchema);
