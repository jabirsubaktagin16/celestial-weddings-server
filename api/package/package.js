import { Schema, model } from "mongoose";

const packageSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  cover: { type: String },
  description: {
    type: String,
    required: true,
  },
  servicesOffered: [
    {
      type: String,
    },
  ],
  tags: [
    {
      type: String,
    },
  ],
  discountStatus: { type: Boolean, default: false, required: true },
  discountPercentage: { type: Number },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default model("Package", packageSchema);
