import { Schema, model } from "mongoose";

const vendorSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  cover: { type: String },
  phoneNumber: { type: String, required: true },
  address: { type: String },
  description: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default model("Vendor", vendorSchema);
