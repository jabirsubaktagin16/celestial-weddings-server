import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: { type: String },
  role: {
    type: String,
    enum: ["admin", "vendor", "user"],
    required: true,
    default: "user",
  },
  vendorCompany: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
  },
  phoneNumber: { type: String },
  address: { type: String },
  occupation: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default model("User", userSchema);
