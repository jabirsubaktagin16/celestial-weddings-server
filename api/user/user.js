import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: { type: String },
  role: {
    type: String,
    enum: ["admin", "planner", "user"],
    required: true,
    default: "user",
  },
  planningCompany: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
  },
  phoneNumber: { type: String },
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zipCode: { type: String },
  },
  preferences: {
    theme: { type: String },
    budget: { type: Number },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default model("User", userSchema);
